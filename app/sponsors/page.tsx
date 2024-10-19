"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ourSponsors from "@/data/ourSponsors";
import HeadingPage from "@/sections/common/HeadingPage";
import { motion } from "framer-motion";

const SponsorShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleVisitWebsite = (website: string | URL | undefined) => {
    window.open(website, "_blank", "noopener,noreferrer");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white">
      <HeadingPage
        title="Nos Partenaires Innovants,"
        subtitle="Entreprises & Societés partenaires."
        description="Découvrez les entreprises visionnaires qui propulsent l'innovation technologique dans le Grand Nord Cameroun."
      >
        <Card className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white max-lg:w-[90%] lg:max-w-screen-lg">
          <CardContent className="flex gap-5 items-center justify-between py-4 max-sm:flex-col max-sm:gap-0 ">
            <p className="font-medium text-left text-lg">
              Vous souhaitez faire partir des{" "}
              <span className="text-primary font-bold">entreprises</span>, qui
              nous soutiennent?
            </p>

            <Link className="mt-4 block transition sm:mt-0" href={"/besponsor"}>
              <Button variant={"outline"} size={"lg"}>
                Rendez vous ici
              </Button>
            </Link>
          </CardContent>
        </Card>
      </HeadingPage>

      <div className="container mx-auto px-4 py-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {ourSponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="bg-[#F9F0E3] shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden h-full">
                <CardContent className="p-8 flex flex-col items-center h-full">
                  <motion.div
                    className="w-32 h-32 relative mb-6 rounded-full bg-white p-4 flex items-center justify-center"
                    animate={{ rotate: hoveredCard === index ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      loading="lazy"
                      src={sponsor.logo.url}
                      alt={`${sponsor.name} logo`}
                      width={sponsor.logo.width}
                      height={sponsor.logo.height}
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-center text-[#0a3d62]">
                    {sponsor.name}
                  </h3>
                  <motion.div
                    className="mt-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="border-[#0a3d62] text-[#0a3d62] hover:bg-[#0a3d62] hover:text-white transition-colors duration-300"
                      onClick={() => handleVisitWebsite(sponsor.url)}
                    >
                      Explorer
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link className="block transition" href="/besponsor">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant={"outline"} size={"lg"}>
                Devenez Partenaire
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorShowcase;
