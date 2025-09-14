import leaders from "@/data/ourLeaders";

import TeamCard from "@/components/cards/TeamCard";

const Team = () => {
  return (
    <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 w-full  bg-gray-50">
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
          {leaders.map((leader, index) => (
            <TeamCard key={index} {...leader} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
