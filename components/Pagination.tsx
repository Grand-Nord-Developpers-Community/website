import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Affichage de{" "}
          {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{" "}
          à{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)}{" "}
          sur{" "}
          <span className="font-semibold">{totalItems}</span>{" "}
          résultats
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
              } else if (page === currentPage - 2 || page === currentPage + 2) {
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
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-gray-200 hover:bg-gray-50"
          >
            Suivant
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;