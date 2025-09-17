"use client";

import { useState, useMemo, useEffect } from "react";
import { Star } from "lucide-react";
import { getMembers } from "@/actions/members.action";
import { Member } from "@/types/members";
import MemberCard from "@/components/MemberCard";
import MemberCardSkeleton from "@/components/MemberCardSkeleton";
import SearchFilters from "@/components/SearchFilters";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 20;

const MembersGrid = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const membersData = await getMembers();
        setMembers(membersData);
        console.log(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    if (loading) return [];

    const filtered = members.filter((member) => {
      const matchesSearch =
        member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.languages.some((lang) =>
          lang.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesDomain =
        selectedDomain === "" ||
        selectedDomain === "all" ||
        member.domain.includes(selectedDomain);
      const matchesRegion =
        selectedRegion === "" ||
        selectedRegion === "all" ||
        member.region === selectedRegion;

      return matchesSearch && matchesDomain && matchesRegion;
    });

    return filtered.sort((a, b) => {
      if (a.isLeader && !b.isLeader) return -1;
      if (!a.isLeader && b.isLeader) return 1;

      return a.fullName.localeCompare(b.fullName, "fr", {
        sensitivity: "base",
      });
    });
  }, [members, searchTerm, selectedDomain, selectedRegion, loading]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMembers, currentPage]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);

  const uniqueRegions = useMemo(() => {
    if (loading) return [];
    return [...new Set(members.map((member) => member.region))];
  }, [members, loading]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDomain("");
    setSelectedRegion("");
    setCurrentPage(1);
  };

  const hasActiveFilters = !!(searchTerm || selectedDomain || selectedRegion);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDomain, selectedRegion]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Les membres avec</span>
            <Star size={16} className="text-blue-600 fill-blue-600" />
            <span>sont des leaders de la communauté</span>
          </div>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          uniqueRegions={uniqueRegions}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={hasActiveFilters}
          clearAllFilters={clearAllFilters}
          loading={loading}
          filteredMembersCount={filteredMembers.length}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <MemberCardSkeleton key={index} />
              ))
            : paginatedMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
        </div>

        {!loading && filteredMembers.length === 0 && (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            clearAllFilters={clearAllFilters}
          />
        )}

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredMembers.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </div>
    </div>
  );
};

export default MembersGrid;
