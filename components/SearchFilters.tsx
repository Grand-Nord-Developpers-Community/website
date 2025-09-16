import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, X } from "lucide-react";
import { AVAILABLE_DOMAINS } from "@/utils/members";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  uniqueRegions: string[];
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  loading: boolean;
  filteredMembersCount: number;
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedDomain,
  setSelectedDomain,
  selectedRegion,
  setSelectedRegion,
  uniqueRegions,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  clearAllFilters,
  loading,
  filteredMembersCount,
}: SearchFiltersProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Rechercher par nom, domaine ou langage de programmation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden h-12 border-gray-200"
          disabled={loading}
        >
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </Button>

        <div className="hidden lg:flex gap-4">
          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <div className="w-64 h-12 border-gray-200 focus:border-blue-500">
              <SelectTrigger>
                <SelectValue placeholder="Tous les domaines" />
              </SelectTrigger>
            </div>
            <SelectContent>
              <SelectItem value="all">Tous les domaines</SelectItem>
              {AVAILABLE_DOMAINS.map((domain) => (
                <SelectItem key={domain.key} value={domain.key}>
                  {domain.label}
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

        {hasActiveFilters && !loading && (
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
              {AVAILABLE_DOMAINS.map((domain) => (
                <SelectItem key={domain.key} value={domain.key}>
                  {domain.label}
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

      <div className="mt-4 pt-4 border-t border-gray-200">
        {loading ? (
          <Skeleton className="h-4 w-48" />
        ) : (
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-blue-600">
              {filteredMembersCount}
            </span>{" "}
            membre(s) trouvé(s)
            {hasActiveFilters && " avec les filtres appliqués"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;