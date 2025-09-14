import TeamCard from "@/components/cards/TeamCard";
import { getLeaders } from "@/actions/members.action";
import { Suspense } from "react";
import { toTitleCase } from "@/utils/members";

const TeamCardSkeleton = () => {
  return (
    <div className="w-[90%] px-4 md:w-[45%] lg:w-[30%] xl:w-1/4">
      <div className="mx-auto mb-10 w-full max-w-[370px]">
        <div className="group relative overflow-hidden rounded-lg">
          <div className="h-[350px] bg-gray-300 dark:bg-gray-700 animate-pulse" />

          <div className="flex justify-center items-center gap-2 flex-col absolute top-3 left-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-9 h-9 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"
              />
            ))}
          </div>

          <div className="absolute bottom-5 left-0 w-full text-center">
            <div className="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-3 dark:bg-dark-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto animate-pulse" />

              <div>
                <span className="absolute bottom-0 left-0">
                  <svg
                    width={61}
                    height={30}
                    viewBox="0 0 61 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx={16}
                      cy={45}
                      r={45}
                      fill="#13C296"
                      fillOpacity="0.11"
                    />
                  </svg>
                </span>
                <span className="absolute right-0 top-0">
                  <svg
                    width={20}
                    height={25}
                    viewBox="0 0 20 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="0.706257"
                      cy="24.3533"
                      r="0.646687"
                      transform="rotate(-90 0.706257 24.3533)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="6.39669"
                      cy="24.3533"
                      r="0.646687"
                      transform="rotate(-90 6.39669 24.3533)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="12.0881"
                      cy="24.3533"
                      r="0.646687"
                      transform="rotate(-90 12.0881 24.3533)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="17.7785"
                      cy="24.3533"
                      r="0.646687"
                      transform="rotate(-90 17.7785 24.3533)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="0.706257"
                      cy="18.6624"
                      r="0.646687"
                      transform="rotate(-90 0.706257 18.6624)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="6.39669"
                      cy="18.6624"
                      r="0.646687"
                      transform="rotate(-90 6.39669 18.6624)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="12.0881"
                      cy="18.6624"
                      r="0.646687"
                      transform="rotate(-90 12.0881 18.6624)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="17.7785"
                      cy="18.6624"
                      r="0.646687"
                      transform="rotate(-90 17.7785 18.6624)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="0.706257"
                      cy="12.9717"
                      r="0.646687"
                      transform="rotate(-90 0.706257 12.9717)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="6.39669"
                      cy="12.9717"
                      r="0.646687"
                      transform="rotate(-90 6.39669 12.9717)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="12.0881"
                      cy="12.9717"
                      r="0.646687"
                      transform="rotate(-90 12.0881 12.9717)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="17.7785"
                      cy="12.9717"
                      r="0.646687"
                      transform="rotate(-90 17.7785 12.9717)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="0.706257"
                      cy="7.28077"
                      r="0.646687"
                      transform="rotate(-90 0.706257 7.28077)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="6.39669"
                      cy="7.28077"
                      r="0.646687"
                      transform="rotate(-90 6.39669 7.28077)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="12.0881"
                      cy="7.28077"
                      r="0.646687"
                      transform="rotate(-90 12.0881 7.28077)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="17.7785"
                      cy="7.28077"
                      r="0.646687"
                      transform="rotate(-90 17.7785 7.28077)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="0.706257"
                      cy="1.58989"
                      r="0.646687"
                      transform="rotate(-90 0.706257 1.58989)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="6.39669"
                      cy="1.58989"
                      r="0.646687"
                      transform="rotate(-90 6.39669 1.58989)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="12.0881"
                      cy="1.58989"
                      r="0.646687"
                      transform="rotate(-90 12.0881 1.58989)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="17.7785"
                      cy="1.58989"
                      r="0.646687"
                      transform="rotate(-90 17.7785 1.58989)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeadersContent = async () => {
  const communityLeaders = await getLeaders();
  console.log("Leaders:", communityLeaders);

  const transformedLeaders = communityLeaders.map((leader) => ({
    name: toTitleCase(leader.fullName),
    url: leader.photoUrl,
    role: leader.role || "",
    socials: {
      gmail: leader.email,
      facebook: leader.facebook || "",
      linkedln: leader.linkedin || "",
      github: leader.github || "",
    },
  }));

  return (
    <>
      {transformedLeaders.map((leader, index) => (
        <TeamCard key={index} {...leader} />
      ))}
    </>
  );
};

const LoadingTeam = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <TeamCardSkeleton key={index} />
      ))}
    </>
  );
};

const Team = () => {
  return (
    <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 w-full bg-gray-50">
      <div className="screen-wrapper">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2 className="mb-3 text-3xl text-primary font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Nos Leaders
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                GNDC est dirigée par une équipe de leaders passionnés et
                visionnaires, dévoués à l&apos;innovation technologique et à
                l&apos;enseignement dans le Grand Nord Cameroun.
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center">
          <Suspense fallback={<LoadingTeam />}>
            <LeadersContent />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Team;
