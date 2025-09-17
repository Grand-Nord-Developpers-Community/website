import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, updateBlogVisibility } from "../blog.actions";
import { blogKeys } from "../queries/blogs";
import { PaginatedBlog } from "@/types";
import { toast } from "sonner";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return deleteBlog(id);
    },
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches for all blog queries
      await queryClient.cancelQueries({
        queryKey: ["blogs"], // This will cancel all queries starting with "blogs"
      });

      // Get all blog query data in the cache and update each one
      const queryCache = queryClient.getQueryCache();
      const blogQueries = queryCache.findAll({
        queryKey: ["blogs"],
      });

      // Store previous data for rollback
      const previousData: Array<{ queryKey: any; data: any }> = [];

      // Update each blog query in the cache
      blogQueries.forEach((query) => {
        const oldData = query.state.data;

        if (oldData) {
          // Store the previous data for potential rollback
          previousData.push({
            queryKey: query.queryKey,
            data: oldData,
          });

          // Data is a direct array (PaginatedBlog)
          let newData = [];
          if (Array.isArray(oldData)) {
            newData = oldData.filter((blog) => blog.id !== id);
            queryClient.setQueryData(query.queryKey, newData);
          } else {
            console.warn(
              "Expected blog data to be an array, got:",
              typeof oldData
            );
          }

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

      console.error("Delete blog error:", err);
      toast.error(
        `Échec de la suppression du blog: ${err instanceof Error ? err.message : "Erreur inconnue"}`
      );
    },
    onSuccess: (data, id) => {
      toast.success("Blog supprimé avec succès");
    },
    onSettled: (data, error, id) => {
      // Invalidate all blog queries to refetch fresh data
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};

export const useToogleBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, draft }: { id: string; draft: boolean }) => {
      return updateBlogVisibility({ id, isDraft: draft });
    },
    onMutate: async ({ id, draft }: { id: string; draft: boolean }) => {
      // Cancel any outgoing refetches for all blog queries
      await queryClient.cancelQueries({
        queryKey: ["blogs"], // This will cancel all queries starting with "blogs"
      });

      // Get all blog query data in the cache and update each one
      const queryCache = queryClient.getQueryCache();
      const blogQueries = queryCache.findAll({
        queryKey: ["blogs"],
      });

      // Store previous data for rollback
      const previousData: Array<{ queryKey: any; data: any }> = [];

      // Update each blog query in the cache
      blogQueries.forEach((query) => {
        const oldData = query.state.data as PaginatedBlog | undefined;

        if (oldData && Array.isArray(oldData)) {
          // Store the previous data for potential rollback
          previousData.push({
            queryKey: query.queryKey,
            data: oldData,
          });

          // Optimistically update the blog's draft status
          const newData = oldData.map((blog) =>
            blog.id === id ? { ...blog, isDraft: draft } : blog
          );
          queryClient.setQueryData(query.queryKey, newData);
        }
      });

      return { previousData };
    },
    onError: (err, { id, draft }, context) => {
      // Roll back all the optimistic updates
      if (context?.previousData) {
        context.previousData.forEach(({ queryKey, data }) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      console.error("Toggle blog error:", err);
      toast.error(
        `Échec de la modification du blog ${id}: ${err instanceof Error ? err.message : "Erreur inconnue"}`
      );
    },
    onSuccess: (data, { id, draft }) => {
      const status = draft ? "mis en brouillon" : "publié";
      toast.success(`Blog ${status} avec succès`);
    },
    onSettled: () => {
      // Invalidate all blog queries to refetch fresh data
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};
