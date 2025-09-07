"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Star, Award } from "lucide-react";
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

  const floatingElements = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-amber-100 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-emerald-100 rounded-full opacity-15 blur-xl"></div>

      <HeadingPage
        title="Nos Partenaires Innovants,"
        subtitle="Entreprises & Societés partenaires."
        description="Découvrez les entreprises visionnaires qui propulsent l'innovation technologique dans le Grand Nord Cameroun."
      >
        <Card className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white shadow-2xl border-0 max-lg:w-[90%] lg:max-w-screen-lg backdrop-blur-sm">
          <CardContent className="flex gap-5 items-center justify-between py-6 px-8 max-sm:flex-col max-sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <p className="font-medium text-left text-lg text-slate-700">
                Vous souhaitez faire partir des{" "}
                <span className="text-blue-600 font-bold">entreprises</span>,
                qui nous soutiennent?
              </p>
            </div>

            <Link className="mt-4 block transition sm:mt-0" href={"/besponsor"}>
              <Button
                variant={"outline"}
                size={"lg"}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg cursor-pointer"
              >
                <Zap className="mr-2 h-4 w-4" />
                Rendez vous ici
              </Button>
            </Link>
          </CardContent>
        </Card>
      </HeadingPage>

      <div className="container mx-auto px-4 py-32 relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {ourSponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group"
            >
              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden h-full border-0 relative group-hover:ring-2 group-hover:ring-blue-200">
                {/* Premium badge */}
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    className="bg-amber-100 p-2 rounded-full shadow-md"
                    animate={floatingElements.animate}
                  >
                    <Award className="h-4 w-4 text-amber-600" />
                  </motion.div>
                </div>

                <CardContent className="p-8 flex flex-col items-center h-full relative">
                  {/* Logo container with styling */}
                  <motion.div
                    className="w-36 h-36 relative mb-8 rounded-2xl bg-slate-50 p-6 flex items-center justify-center shadow-inner border-2 border-slate-100"
                    animate={{
                      rotate: hoveredCard === index ? [0, 5, -5, 0] : 0,
                      scale: hoveredCard === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Image
                      loading="lazy"
                      src={sponsor.logo.url}
                      alt={`${sponsor.name} logo`}
                      width={sponsor.logo.width}
                      height={sponsor.logo.height}
                      objectFit="contain"
                      className="rounded-xl filter transition-all duration-300 group-hover:brightness-110"
                    />
                  </motion.div>

                  {/* Company name with  typography */}
                  <h3 className="text-2xl font-bold mb-6 text-center text-slate-800 tracking-tight leading-tight">
                    {sponsor.name}
                  </h3>

                  {/* Partnership status indicator */}
                  <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-50 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-700">
                      Partenaire Actif
                    </span>
                  </div>

                  {/* Explore button */}
                  <motion.div
                    className="mt-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:!text-white transition-all duration-300 font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg group-hover:border-blue-600 group-hover:text-blue-600 group-hover:hover:bg-blue-600"
                      onClick={() => handleVisitWebsite(sponsor.url)}
                    >
                      Explorer
                      <motion.div
                        animate={{ x: hoveredCard === index ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border-0">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Rejoignez Notre Réseau
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Devenez un partenaire stratégique et participez à
              l&apos;innovation technologique
            </p>
            <Link className="block transition" href="/besponsor">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Devenez Partenaire
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex justify-center items-center gap-8 mt-16 text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Partenariats Vérifiés</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">Innovation Continue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium">Excellence Reconnue</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorShowcase;
