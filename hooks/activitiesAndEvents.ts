import activities from "@/data/publication";

import ActivityAndEvents from "@/interfaces/activityAndEvent";

export const useActivitiesAndEvents: (options?: {
  offset?: number;
  limit?: number;
}) => ActivityAndEvents[] | [] = (options) => {
  return activities.slice(options?.offset || 0, options?.limit);
};
