'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, ThumbsUp, Eye, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from "next/image";

// Types
interface TopicData {
  id: number;
  title: string;
  category: string;
  description: string;
  totalReplies: number;
  totalLikes: number;
  totalViews: number;
  lastActive: string;
}

interface Discussion {
  id: number;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
  avatar: string;
}

// Données simulées avec des avatars
const initialDiscussions: Discussion[] = [
  { id: 1, author: "Alice", content: "Je recommande de commencer par la documentation officielle de React. C'est vraiment bien expliqué !", likes: 12, timestamp: "Il y a 2h", avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice" },
  { id: 2, author: "Bob", content: "J'ai trouvé que les tutoriels vidéo sur YouTube étaient très utiles pour comprendre les concepts de base.", likes: 8, timestamp: "Il y a 1h", avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Bob" },
  { id: 3, author: "Charlie", content: "N'oubliez pas d'apprendre les hooks dès le début, c'est vraiment important dans le React moderne.", likes: 15, timestamp: "Il y a 30min", avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Charlie" },
];

export default function TopicDiscussionPage() {
  const { id } = useParams();
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    // Simuler la récupération des données
    const fetchedTopicData: TopicData = {
      id: Number(id),
      title: "Débuter avec React",
      category: "React",
      description: "Discussion sur les meilleures façons de commencer avec React pour les débutants.",
      totalReplies: 23,
      totalLikes: 45,
      totalViews: 1200,
      lastActive: "Il y a 2h"
    };

    setTopicData(fetchedTopicData);
    setDiscussions(initialDiscussions);
  }, [id]);

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReply.trim() === '') return;
    
    const newDiscussion: Discussion = {
      id: discussions.length + 1,
      author: "Vous",
      content: newReply,
      likes: 0,
      timestamp: new Date().toISOString(), 
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=You"
    };

    setDiscussions([...discussions, newDiscussion]);
    setNewReply('');
  };

  const handleLike = (id: number) => {
    setDiscussions(discussions.map(disc => 
      disc.id === id ? { ...disc, likes: disc.likes + 1 } : disc
    ));
  };

  if (!topicData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="w-full mx-auto px-4 py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <Link href="/forum" className="flex items-center text-[#1a4d7c] mb-4">
          <ArrowLeft className="mr-2" /> Retour au forum
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 text-[#1a4d7c]">{topicData.title}</h1>
          <p className="text-gray-600 mb-4">{topicData.description}</p>
          <div className="flex justify-between items-center text-sm text-[#1a4d7c]">
            <span className="bg-[#1a4d7c] text-white rounded-full px-3 py-1 text-sm font-semibold">{topicData.category}</span>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{topicData.totalReplies} réponses</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>{topicData.totalLikes} likes</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{topicData.totalViews} vues</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Actif {topicData.lastActive}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <img 
                src={discussion.avatar} 
                alt={discussion.author} 
                className="w-12 h-12 rounded-full" 
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-[#1a4d7c]">{discussion.author}</span>
                    <span className="text-sm text-gray-500">{discussion.timestamp}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{discussion.content}</p>
                  <button 
                    onClick={() => handleLike(discussion.id)}
                    className="flex items-center text-sm text-[#1a4d7c] hover:text-[#cd7f32] transition-colors duration-300"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{discussion.likes} likes</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleReplySubmit} className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start space-x-4">
            <User className="w-12 h-12 text-[#1a4d7c]" />
            <div className="flex-grow">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Écrivez votre réponse..."
                className="w-full p-2 border border-[#1a4d7c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#cd7f32]"
                rows={4}
              ></textarea>
              <button 
                type="submit"
                className="mt-2 bg-[#cd7f32] hover:bg-[#b26e2a] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
              >
                Répondre
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}