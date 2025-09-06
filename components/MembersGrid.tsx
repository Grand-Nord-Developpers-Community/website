"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  Code,
  MapPin,
  Star,
  Search,
  Filter,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import defaultImage from "@/assets/images/members/default.png";
import bgImage from "@/assets/images/brand/bg-login.jpg";
import Link from "next/link";

const ITEMS_PER_PAGE = 20;

const MembersGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filteredMembers = useMemo(() => {
    const filtered = membersData.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.domaine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.language &&
          member.language.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDomain =
        selectedDomain === "" ||
        selectedDomain === "all" ||
        member.domaine.includes(selectedDomain);
      const matchesRegion =
        selectedRegion === "" ||
        selectedRegion === "all" ||
        member.region === selectedRegion;

      return matchesSearch && matchesDomain && matchesRegion;
    });

    // Trier pour afficher d'abord les leaders (isLeader: true), puis par ordre alphabétique
    return filtered.sort((a, b) => {
      // D'abord trier par statut de leader
      if (a.isLeader && !b.isLeader) return -1;
      if (!a.isLeader && b.isLeader) return 1;

      // Ensuite trier par ordre alphabétique du nom
      return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
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

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDomain("");
    setSelectedRegion("");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedDomain || selectedRegion;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Les membres avec</span>
            <Star size={16} className="text-blue-600 fill-blue-600" />
            <span>sont des leaders de la communauté</span>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher par nom, domaine ou langage de programmation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden h-12 border-gray-200"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <div className="w-64 h-12 border-gray-200 focus:border-blue-500">
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les domaines" />
                  </SelectTrigger>
                </div>

                <SelectContent>
                  <SelectItem value="all">Tous les domaines</SelectItem>
                  {uniqueDomains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <div className="w-64 h-12 border-gray-200 focus:border-blue-500">
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les régions" />
                  </SelectTrigger>
                </div>

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

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                className="h-12 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5 mr-2" />
                Effacer
              </Button>
            )}
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-4">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <div className="h-12 border-gray-200">
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les domaines" />
                  </SelectTrigger>
                </div>

                <SelectContent>
                  <SelectItem value="all">Tous les domaines</SelectItem>
                  {uniqueDomains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <div className="h-12 border-gray-200">
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les régions" />
                  </SelectTrigger>
                </div>

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
          )}

          {/* Results Counter */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">
                {filteredMembers.length}
              </span>{" "}
              membre(s) trouvé(s)
              {hasActiveFilters && " avec les filtres appliqués"}
            </p>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {paginatedMembers.map((member, index) => (
            <Card
              key={index}
              className="group bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md rounded-2xl overflow-hidden"
            >
              <CardHeader className="relative p-0">
                <div className="relative">
                  <Image
                    src={bgImage}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover"
                    alt="Background"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute -bottom-10 left-6 z-10">
                  <div className="relative">
                    <Image
                      src={member.avatar || defaultImage}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                      alt={member.name}
                    />
                    {member.isLeader && (
                      <div className="absolute -top-1 -right-1 bg-blue-600 rounded-full p-1">
                        <Star size={14} className="text-white fill-white" />
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-12 pb-6 px-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                  >
                    {member.domaine}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="uppercase font-medium">
                      {member.region}
                    </span>
                  </div>

                  {member.language && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Code className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{member.language}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <Link
                      href={`mailto:${member.email}`}
                      target="_blank"
                      className="truncate hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {member.email}
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Aucun membre trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez d&apos;ajuster vos critères de recherche ou filtres
              </p>
              {hasActiveFilters && (
                <Button
                  onClick={clearAllFilters}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Effacer tous les filtres
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Affichage de{" "}
                {Math.min(
                  (currentPage - 1) * ITEMS_PER_PAGE + 1,
                  filteredMembers.length
                )}{" "}
                à{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredMembers.length)}{" "}
                sur{" "}
                <span className="font-semibold">{filteredMembers.length}</span>{" "}
                résultats
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Précédent
                </Button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 ${
                            currentPage === page
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersGrid;
