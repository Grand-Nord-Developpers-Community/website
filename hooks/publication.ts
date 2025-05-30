import publications from "@/data/publication";

import Publication from "@/interfaces/publication";

export const usePublication: (options?: {
  offset?: number;
  limit?: number;
}) => Publication[] | [] = (options) => {
  return publications.slice(options?.offset || 0, options?.limit);
};
