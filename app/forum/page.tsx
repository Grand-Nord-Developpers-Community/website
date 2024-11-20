"use client";
import { forumTopics, categories } from "@/data/forumData";
import { Filter, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
function ForumPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Toutes les discussions"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Tout");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Filtrage des sujets
  const filteredTopics = forumTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Toutes les discussions" ||
      topic.categories.includes(selectedCategory);
    const matchesStatus =
      selectedFilter === "Tout" || topic.status === selectedFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTopics.length / ITEMS_PER_PAGE);
  const paginatedTopics = filteredTopics.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Génération des numéros de page
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="relative w-full">
      <div className="w-full absolute bg-primary py-6">
        <div className="screen-wrapper">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link href="/forum/sujet/" passHref>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
                Nouveau Sujet
                <span className="text-lg">+</span>
              </button>
            </Link>

            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <span className="text-gray-600 self-center font-bold">
                {filteredTopics.length} Sujets
              </span>

              <div className="flex-1 flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>

                <div className="relative">
                  <select
                    value={selectedFilter}
                    onChange={(e) => {
                      setSelectedFilter(e.target.value);
                      setCurrentPage(1); // Reset to first page when filter changes
                    }}
                    className="h-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white pr-8"
                  >
                    <option value="Tout">Tout</option>
                    <option value="Résolu">Résolu</option>
                    <option value="Non résolu">Non résolu</option>
                  </select>
                  <Filter
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-screen container mx-auto gap-4 ">
        <div className="w-1/5 pt-5"></div>
        <div className="grow">
          <div className={"w-full h-full overflow-y-auto scroll-hidden"}></div>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;
