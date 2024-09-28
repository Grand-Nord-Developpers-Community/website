import ourSponsors from "@/data/ourSponsors";

import OurSponsors from "@/intefaces/ourSponsors";

export const useSponsors: (options?: {
  offset?: number;
  limit?: number;
}) => OurSponsors[] | [] = (options) => {
  return ourSponsors.slice(options?.offset || 0, options?.limit);
};
