"use client";
import React, { useState } from "react";
import { Search, MessageSquare, Eye, Clock, Filter, Menu } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Types
interface Category {
  name: string;
  subcategories?: string[];
  color?: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  authorUsername: string;
  categories: string[];
  replies: number;
  views: number;
  lastActive: string;
  content: string;
  status: "Résolu" | "Non résolu";
}

const categories: Category[] = [
  {
    name: "Toutes les discussions",
    subcategories: [],
    color: "#6366F1", // Indigo
  },
  {
    name: "Authentication",
    subcategories: ["Breeze", "Fortify", "Jetstream", "Passport", "Sanctum"],
    color: "#EC4899", // Pink
  },
  {
    name: "JavaScript",
    subcategories: ["React", "Vue.js", "Alpine.js"],
    color: "#F59E0B", // Yellow
  },
  {
    name: "Laravel",
    subcategories: ["Blade", "Eloquent", "Request", "Api", "Components"],
    color: "#EF4444", // Red
  },
  {
    name: "Jetpack Compose",
    subcategories: [],
    color: "#10B981",
  },
  {
    name: "Flutter",
    subcategories: [],
    color: "#10BBB3",
  },
  {
    name: "UI",
    subcategories: [],
    color: "#FFB981",
  },
];

const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: "problème avec filtre avec vue.js",
    author: "dani",
    authorUsername: "@dani03",
    categories: ["Vue.js"],
    replies: 6,
    views: 81,
    lastActive: "il y a 4 mois",
    content:
      "Bonjour à tous j'essaie de filtrer les éléments aux click selon une propriété sauf qu'il ne filtre p...",
    status: "Résolu",
  },
  {
    id: 2,
    title: "Comment automatiser une action avec Laravel ?",
    author: "Bleu Serge Alain",
    authorUsername: "@realsergeblain",
    categories: ["Framework", "Laravel"],
    replies: 2,
    views: 80,
    lastActive: "il y a 5 mois",
    content:
      "Je souhaite créer un système avec Laravel où, lors de l'inscription d'un utilisateur, un numéro/matr...",
    status: "Résolu",
  },
  {
    id: 3,
    title: "token n'expire pas avec passport sur mon API laravel 9",
    author: "dani",
    authorUsername: "@dani03",
    categories: ["Passport", "Laravel", "Api"],
    replies: 1,
    views: 127,
    lastActive: "il y a 2 ans",
    content:
      "Bonjour à tous je viens vers vous parce que je rencontre un problème avec mon token qui n'expire pas...",
    status: "Non résolu",
  },
  {
    id: 4,
    title: "Problème d'affichage avec Tailwind CSS et React",
    author: "marie",
    authorUsername: "@marie_code",
    categories: ["Tailwind CSS", "React", "Frontend"],
    replies: 5,
    views: 200,
    lastActive: "il y a 1 an",
    content:
      "Salut tout le monde, j'ai un souci avec l'intégration de Tailwind CSS dans mon projet React. Les styles ne s'appliquent pas correctement...",
    status: "Résolu",
  },
  {
    id: 5,
    title: "Erreur 500 avec l'envoi d'e-mail en Laravel 8",
    author: "maxime",
    authorUsername: "@maxime_dev",
    categories: ["Laravel", "Mail", "Backend"],
    replies: 8,
    views: 350,
    lastActive: "il y a 8 mois",
    content:
      "Bonjour à tous, je reçois une erreur 500 lorsque j'essaie d'envoyer un e-mail avec Laravel. J'ai configuré mon `.env` mais ça ne marche toujours pas...",
    status: "Résolu",
  },
  {
    id: 6,
    title: "Problème avec la validation des formulaires Vue.js",
    author: "sophie",
    authorUsername: "@sophie_coder",
    categories: ["Vue.js", "Frontend", "Form"],
    replies: 3,
    views: 180,
    lastActive: "il y a 6 mois",
    content:
      "Bonjour, j'utilise Vue.js pour gérer la validation de mes formulaires, mais les messages d'erreur ne s'affichent pas correctement. Quelqu'un a une idée ?",
    status: "Non résolu",
  },

  {
    id: 7,
    title: "Erreur CORS lors de la requête API en Angular",
    author: "jules",
    authorUsername: "@jules_ng",
    categories: ["Angular", "API", "CORS"],
    replies: 12,
    views: 520,
    lastActive: "il y a 3 mois",
    content:
      "Salut à tous, je rencontre un problème de CORS quand j'essaie de faire une requête API depuis mon application Angular. Une idée pour contourner cela ?",
    status: "Résolu",
  },
];

export function ForumPageForumPage() {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
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

        <div className="flex gap-6">
          {/* Sidebar - Categories */}
          <div
            className={`w-64 flex-shrink-0 transition-all duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed sm:relative left-0 top-0 h-full sm:translate-x-0 z-50 bg-white sm:bg-transparent`}
          >
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative">
                {/* Ligne verticale noire */}
                <div className="absolute left-[5px] top-3 bottom-3 w-[2px] bg-gray-200" />

                {categories.map((category, index) => (
                  <div key={category.name} className="mb-4 relative">
                    <button
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setCurrentPage(1);
                      }}
                      className={`text-left w-full font-medium mb-2 flex items-center gap-2 ${
                        selectedCategory === category.name
                          ? "text-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full z-10"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </button>
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <div className="ml-6 space-y-1">
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                setSelectedCategory(sub);
                                setCurrentPage(1);
                              }}
                              className={`text-sm block w-full text-left py-1 ${
                                selectedCategory === sub
                                  ? "text-primary"
                                  : "text-gray-600"
                              }`}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle Sidebar Button - Mobile Only */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed bottom-4 left-4 z-50 sm:hidden bg-primary text-white p-2 rounded-full shadow-lg"
          >
            <Menu size={24} />
          </button>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence>
              {paginatedTopics.map((topic) => (
                <Link href={`/forum/discussion/${topic.id}`} key={topic.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <span>{topic.author}</span>
                          <span className="text-gray-400">
                            {topic.authorUsername}
                          </span>
                          <span>•</span>
                          <span>{topic.lastActive}</span>
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {topic.content}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {topic.categories.map((category) => (
                            <span
                              key={category}
                              className="bg-gray-100 text-sm px-2 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                          <div className="flex items-center gap-4 ml-auto text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MessageSquare size={16} />
                              <span>{topic.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye size={16} />
                              <span>{topic.views}</span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                topic.status === "Résolu"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {topic.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Affichage de {(currentPage - 1) * ITEMS_PER_PAGE + 1} à{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredTopics.length)}{" "}
                sur {filteredTopics.length} résultats
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  &lt;
                </button>
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      page === currentPage
                        ? "bg-primary text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
