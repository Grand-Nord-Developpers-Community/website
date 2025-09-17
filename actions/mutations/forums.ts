import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedForum } from "@/types";
import { toast } from "sonner";

import { deleteForum } from "../forum.actions";

export const useDeleteForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteForum(id);
    },
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches for all forum queries
      await queryClient.cancelQueries({
        queryKey: ["forums"], // This will cancel all queries starting with "forums"
      });

      // Get all forum query data in the cache and update each one
      const queryCache = queryClient.getQueryCache();
      const forumQueries = queryCache.findAll({
        queryKey: ["forums"],
      });

      // Store previous data for rollback
      const previousData: Array<{ queryKey: any; data: any }> = [];

      // Update each forum query in the cache
      forumQueries.forEach((query) => {
        const oldData = query.state.data as PaginatedForum | undefined;

        if (oldData && Array.isArray(oldData)) {
          // Store the previous data for potential rollback
          previousData.push({
            queryKey: query.queryKey,
            data: oldData,
          });

          // Optimistically update by removing the deleted forum
          const newData = oldData.filter((forum) => forum.id !== id);
          queryClient.setQueryData(query.queryKey, newData);
        }
      });

      return { previousData };
    },
    onError: (err, id, context) => {
      // Roll back all the optimistic updates
      if (context?.previousData) {
        context.previousData.forEach(({ queryKey, data }) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      console.error("Delete forum error:", err);
      toast.error(
        `Échec de la suppression du forum: ${err instanceof Error ? err.message : "Erreur inconnue"}`
      );
    },
    onSuccess: (data, id) => {
      toast.success("Forum supprimé avec succès");
    },
    onSettled: (data, error, id) => {
      // Invalidate all forum queries to refetch fresh data
      queryClient.invalidateQueries({
        queryKey: ["forums"],
      });
    },
  });
};
