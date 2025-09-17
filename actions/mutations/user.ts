import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserRole } from "../user.actions";
import type { User } from "@/types";
import { IRole } from "@/lib/db/schema";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: IRole["name"];
    }) => {
      return updateUserRole(userId, role);
    },
    onMutate: async ({ userId, role }) => {
      // Cancel any outgoing refetches for user queries
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      // Store previous data for rollback
      const queryCache = queryClient.getQueryCache();
      const userQueries = queryCache.findAll({
        queryKey: ["users"],
      });

      const previousData: Array<{ queryKey: any; data: any }> = [];

      // Update each user query in the cache
      userQueries.forEach((query) => {
        const oldData = query.state.data;

        if (oldData) {
          // Store previous data
          previousData.push({
            queryKey: query.queryKey,
            data: oldData,
          });

          // Handle infinite queries
          if (query.queryKey.includes("infinite")) {
            const infiniteData = oldData as any;
            if (infiniteData?.pages) {
              // Remove user from infinite query pages
              const newPages = infiniteData.pages
                .map((page: User) => {
                  if (Array.isArray(page)) {
                    return page.filter(
                      (user: User[number]) => user.id !== userId
                    );
                  }
                  return page;
                })
                .filter((page: User) => Array.isArray(page) && page.length > 0);

              queryClient.setQueryData(query.queryKey, {
                ...infiniteData,
                pages: newPages,
              });
            }
          }
          // Handle regular paginated queries
          else if (Array.isArray(oldData)) {
            const newData = oldData.map((user: User[number]) =>
              user.id === userId ? { ...user, role: { name: role } } : user
            );
            queryClient.setQueryData(query.queryKey, newData);
          }
        }
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      // Roll back all optimistic updates
      if (context?.previousData) {
        context.previousData.forEach(({ queryKey, data }) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      console.error("Update user role error:", err);
      toast.error(
        `Échec de la mise à jour du rôle: ${err instanceof Error ? err.message : "Erreur inconnue"}`
      );
    },
    onSuccess: (data, { userId, role }) => {
      toast.success(`Rôle mis à jour vers "${role}" avec succès`);
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
