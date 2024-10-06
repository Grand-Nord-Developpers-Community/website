import activitiesAndEvents from "@/data/activitiesAndEvents";

import ActivityAndEvents from "@/interfaces/activityAndEvent";

export const useActivitiesAndEvents: (options?: {
  offset?: number;
  limit?: number;
}) => ActivityAndEvents[] | [] = (options) => {
  return activitiesAndEvents.slice(options?.offset || 0, options?.limit);
};
