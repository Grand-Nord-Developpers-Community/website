"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { membersData } from "@/data/members";
import {
  Mail,
  Phone,
  Code,
  MapPin,
  Briefcase,
  ExternalLink,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import defaultImage from "@/assets/images/members/default.png";
import bgImage from "@/assets/images/brand/bg-login.jpg";

const ITEMS_PER_PAGE = 20;

const MembersGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = useMemo(() => {
    return membersData.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.domaine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.language &&
          member.language.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDomain =
        selectedDomain === "" || member.domaine.includes(selectedDomain);
      const matchesRegion =
        selectedRegion === "" || member.region === selectedRegion;

      return matchesSearch && matchesDomain && matchesRegion;
    });
  }, [searchTerm, selectedDomain, selectedRegion]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMembers, currentPage]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);

  const uniqueDomains = [
    ...new Set(membersData.flatMap((member) => member.domaine.split(", "))),
  ];
  const uniqueRegions = [
    ...new Set(membersData.map((member) => member.region)),
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Nos membres</h1>
      <p className="text-xs italic flex items-center mb-8">
        Les membres avec{" "}
        <span>
          <Star
            size={16}
            color="hsl(205 83% 23%)"
            fill="hsl(205 83% 23%)"
            className="ml-2"
          />
        </span>{" "}
        sont les leaders.
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Rechercher un membre, un langage"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
          <SelectTrigger>
            <SelectValue placeholder="Selectionner un domaine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tout les domaines</SelectItem>
            {uniqueDomains.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Selectionner la région d'origine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les régions</SelectItem>
            {uniqueRegions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMembers.map((member, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <CardHeader className="relative p-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-foreground z-10" />
              <Image
                src={bgImage}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                alt="Background"
              />
              <div className="absolute bottom-4 left-4 z-20 flex items-end space-x-4">
                <Image
                  src={member.avatar || defaultImage}
                  width={80}
                  height={80}
                  className="rounded-full size-20 border-4 border-secondary shadow-lg"
                  alt={member.name}
                />
                <div>
                  <h3 className="text-xl font-semibold text-primary capitalize mb-1 flex items-center">
                    {member.name}
                    {member.isLeader && (
                      <span>
                        <Star
                          size={16}
                          color="hsl(205 83% 23%)"
                          fill="hsl(205 83% 23%)"
                          className="ml-2"
                        />
                      </span>
                    )}
                  </h3>
                  <Badge variant="secondary" className="capitalize">
                    {member.domaine}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="uppercase">{member.region}</span>
                </div>
                {member.language && (
                  <div className="flex items-center text-muted-foreground">
                    <Code className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{member.language}</span>
                  </div>
                )}
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{member.tel}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">
            No members found matching your criteria.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
};

export default MembersGrid;
