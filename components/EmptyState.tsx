import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface EmptyStateProps {
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
}

const EmptyState = ({ hasActiveFilters, clearAllFilters }: EmptyStateProps) => {
  return (
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
  );
};

export default EmptyState;
