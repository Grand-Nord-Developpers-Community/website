'use client'
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MessageSquare, ThumbsUp, Eye, Clock } from 'lucide-react';

// Données simulées pour les sujets du forum
const forumTopics = [
  { id: 1, title: "Débuter avec React", category: "React", replies: 23, likes: 45, views: 1200, lastActive: "Il y a 2h" },
  { id: 2, title: "Meilleures pratiques pour la conception d'API", category: "Backend", replies: 17, likes: 32, views: 800, lastActive: "Il y a 5h" },
  { id: 3, title: "CSS Grid vs Flexbox", category: "CSS", replies: 41, likes: 76, views: 2300, lastActive: "Il y a 1j" },
  { id: 4, title: "Introduction à TypeScript", category: "TypeScript", replies: 28, likes: 53, views: 1500, lastActive: "Il y a 3h" },
  { id: 5, title: "Gestion d'état avec Redux", category: "React", replies: 36, likes: 64, views: 1800, lastActive: "Il y a 4h" },
];

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['Tout', 'React', 'Backend', 'CSS', 'TypeScript'];

  const handleCardClick = useCallback((topicId: any) => {
    // Ici, vous pouvez ajouter la logique pour naviguer vers la page du sujet
    console.log(`Clic sur le sujet avec l'ID : ${topicId}`);
    // Par exemple : router.push(`/topic/${topicId}`);
  }, []);

  const filteredTopics = forumTopics
    .filter(topic => (selectedCategory === 'Tout' || topic.category === selectedCategory))
    .filter(topic => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#1a4d7c]">Forum Communautaire</h1>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="relative mb-4 sm:mb-0 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Rechercher des sujets..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-[#1a4d7c] rounded-full focus:outline-none focus:ring-2 focus:ring-[#cd7f32]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1a4d7c]" />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-[#1a4d7c]" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-[#1a4d7c] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#cd7f32]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence>
        {filteredTopics.map((topic) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(topic.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#cd7f32] hover:text-[#b26e2a] transition-colors duration-300">{topic.title}</h2>
                <span className="inline-block bg-[#1a4d7c] text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">{topic.category}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-[#1a4d7c]">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>{topic.replies}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{topic.likes}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{topic.views}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center text-sm text-[#1a4d7c]">
              <span>Démarré par JohnDoe</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{topic.lastActive}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredTopics.length === 0 && (
        <p className="text-center text-[#1a4d7c]">Aucun sujet trouvé.</p>
      )}

      {filteredTopics.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-[#cd7f32] hover:bg-[#b26e2a] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Charger plus de sujets
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumPage;