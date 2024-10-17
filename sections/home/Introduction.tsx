import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import VideoPreview from "@/assets/images/youtubePreview.png";
const Introduction = () => {
  return (
    <div className="screen-wrapper my-20">
      <div className="mx-auto sm:text-center lg:max-w-2xl">
        <div className="w-full">
          <div>
            <p className="px-3 w-fit py-px mb-4 mx-auto text-center text-xs font-semibold tracking-wider bg-secondary uppercase rounded-full bg-teal-accent-400 text-white">
              Introduction GNDC
            </p>
          </div>
          <h2 className="text-primary mb-6 text-3xl font-bold leading-none tracking-tight  sm:text-4xl mx-auto text-center max-sm:text-left">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="gray"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative"></span>
            </span>{" "}
            À propos de la communauté
          </h2>
          <p className="text-base text-gray-700 md:text-lg w-full">
            La GNDC est une communautée axée sur l&apos;innovation, la
            collaboration et à la promotion du développement technologique dans
            le Grand nord du Cameroun.
          </p>
        </div>
        <div className="relative my-5">
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/o0N8xSjgMz8?si=YrH4qI1rYvVnkiJH"
            thumbnailSrc={VideoPreview}
            thumbnailAlt="Presentation de la Grand Nord Developpers Community"
          />
        </div>
        <p className="max-w-xl mb-4 text-base text-gray-700 sm:mx-auto">
          Nous avons en notre sein de développeurs, ingénieurs et passionnés de
          technologie qui partagent une vision commune de l&apos;avénir
          technologique de leurs régions respectives.
        </p>
        <a
          href="/about"
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          Apprendre plus
          <svg
            className="inline-block w-3 ml-2 fill-primary"
            viewBox="0 0 12 12"
          >
            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Introduction;
