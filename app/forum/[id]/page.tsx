"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Eye,
  Clock,
  User,
  Send,
  Smile,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EMOJI_LIST = {
  "👍": "thumbsup",
  "❤️": "heart",
  "😄": "smile",
  "🎉": "party",
  "🤔": "thinking",
  "👏": "clap",
};

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

interface Reaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

interface Discussion {
  id: number;
  author: string;
  content: string;
  reactions: { [key: string]: Reaction };
  timestamp: string;
  avatar: string;
}

export default function TopicDiscussionPage() {
  const { id } = useParams();
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newReply, setNewReply] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // À connecter avec votre système d'auth
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Simuler la récupération des données du topic
    const fetchedTopicData: TopicData = {
      id: Number(id),
      title: "Débuter avec React",
      category: "React",
      description:
        "Discussion sur les meilleures façons de commencer avec React pour les débutants.",
      totalReplies: 23,
      totalLikes: 45,
      totalViews: 1200,
      lastActive: "Il y a 2h",
    };

    // Initialiser avec des données de test
    const initialDiscussions: Discussion[] = [
      {
        id: 1,
        author: "Alice",
        content:
          "Je recommande de commencer par la documentation officielle de React. C'est vraiment bien expliqué !",
        reactions: {
          "👍": { emoji: "👍", count: 12, userReacted: false },
          "❤️": { emoji: "❤️", count: 5, userReacted: false },
        },
        timestamp: "Il y a 2h",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice",
      },
      {
        id: 2,
        author: "Marc",
        content:
          "Les hooks personnalisés ont vraiment changé ma façon de coder ! Je conseille de bien comprendre useEffect et useState avant de se lancer dans les customs hooks. Voici un exemple simple que j'utilise souvent pour gérer les formulaires...",
        reactions: {
          "👍": { emoji: "👍", count: 18, userReacted: false },
          "🎉": { emoji: "🎉", count: 7, userReacted: false },
          "🤔": { emoji: "🤔", count: 3, userReacted: false },
        },
        timestamp: "Il y a 45min",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Marc",
      },
      {
        id: 3,
        author: "Sophie",
        content:
          "Pour les débutants, je recommande vraiment Create React App pour commencer. C'est plus simple que de configurer Webpack et Babel manuellement. Une fois que vous maîtrisez les bases, vous pourrez passer à Next.js ou Vite pour des projets plus complexes.",
        reactions: {
          "👍": { emoji: "👍", count: 25, userReacted: false },
          "❤️": { emoji: "❤️", count: 12, userReacted: false },
          "👏": { emoji: "👏", count: 8, userReacted: false },
        },
        timestamp: "Il y a 1h",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sophie",
      },
      {
        id: 4,
        author: "Lucas",
        content:
          "Je viens de terminer un projet avec React et TypeScript. Au début c'était un peu intimidant, mais maintenant je ne peux plus m'en passer ! Les interfaces et les types rendent le code tellement plus sûr et maintenable. Si vous débutez, commencez avec JavaScript pur, puis passez à TypeScript progressivement.",
        reactions: {
          "👍": { emoji: "👍", count: 15, userReacted: false },
          "🤔": { emoji: "🤔", count: 6, userReacted: false },
          "❤️": { emoji: "❤️", count: 4, userReacted: false },
        },
        timestamp: "Il y a 3h",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Lucas",
      },
      {
        id: 5,
        author: "Emma",
        content:
          "N'oubliez pas l'importance des tests ! Jest et React Testing Library sont essentiels dans un projet professionnel. Je recommande de commencer à écrire des tests dès le début du projet, même si ce sont juste des tests basiques. C'est plus difficile d'ajouter des tests après coup.",
        reactions: {
          "👍": { emoji: "👍", count: 22, userReacted: false },
          "👏": { emoji: "👏", count: 9, userReacted: false },
          "🎉": { emoji: "🎉", count: 5, userReacted: false },
        },
        timestamp: "Il y a 4h",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Emma",
      },
      {
        id: 6,
        author: "Thomas",
        content:
          "Pro tip : Utilisez les React Developer Tools dans Chrome/Firefox ! C'est un game changer pour débugger vos composants et comprendre le cycle de vie des états. Vous pouvez voir en temps réel les props, le state, et même les performances de rendu.",
        reactions: {
          "🎉": { emoji: "🎉", count: 30, userReacted: false },
          "👍": { emoji: "👍", count: 28, userReacted: false },
          "❤️": { emoji: "❤️", count: 15, userReacted: false },
          "👏": { emoji: "👏", count: 12, userReacted: false },
        },
        timestamp: "Il y a 5h",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Thomas",
      },
      // ... autres discussions initialisées de la même façon
    ];

    setTopicData(fetchedTopicData);
    setDiscussions(initialDiscussions);
  }, [id]);

  const handleReaction = (discussionId: number, emoji: string) => {
    setDiscussions((prevDiscussions) =>
      prevDiscussions.map((discussion) => {
        if (discussion.id === discussionId) {
          const updatedReactions = { ...discussion.reactions };
          if (!updatedReactions[emoji]) {
            updatedReactions[emoji] = { emoji, count: 0, userReacted: false };
          }
          updatedReactions[emoji] = {
            ...updatedReactions[emoji],
            count: updatedReactions[emoji].userReacted
              ? updatedReactions[emoji].count - 1
              : updatedReactions[emoji].count + 1,
            userReacted: !updatedReactions[emoji].userReacted,
          };
          return { ...discussion, reactions: updatedReactions };
        }
        return discussion;
      })
    );
    setShowEmojiPicker(null);
  };

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (newReply.trim() === "") return;

    const newDiscussion: Discussion = {
      id: discussions.length + 1,
      author: "Vous",
      content: newReply,
      reactions: {},
      timestamp: "À l'instant",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=You",
    };

    setDiscussions([...discussions, newDiscussion]);
    setNewReply("");
  };

  if (!topicData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="w-full mx-auto px-4 py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Section retour et en-tête */}
        <Link href="/forum" className="flex items-center text-[#1a4d7c] mb-4">
          <ArrowLeft className="mr-2" /> Retour au forum
        </Link>

        {/* Card d'information du topic */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 text-[#1a4d7c]">
            {topicData.title}
          </h1>
          <p className="text-gray-600 mb-4">{topicData.description}</p>
          <div className="flex justify-between items-center text-sm text-[#1a4d7c]">
            <span className="bg-[#1a4d7c] text-white rounded-full px-3 py-1 text-sm font-semibold">
              {topicData.category}
            </span>
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

        {/* Section des discussions */}
        <div className="space-y-8">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="relative group">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    loading="lazy"
                    src={discussion.avatar}
                    alt={discussion.author}
                    className="w-12 h-12 rounded-full ring-4 text-primary"
                  />
                  <div className="absolute -right-1 -bottom-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1">
                  <div className="p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#1a4d7c]">
                          {discussion.author}
                        </span>
                        <span className="text-sm text-gray-500">
                          {discussion.timestamp}
                        </span>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowEmojiPicker(
                              showEmojiPicker === discussion.id
                                ? null
                                : discussion.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Smile className="w-5 h-5 text-[#1a4d7c]" />
                        </button>

                        {showEmojiPicker === discussion.id && (
                          <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-10">
                            <div className="flex gap-2">
                              {Object.keys(EMOJI_LIST).map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() =>
                                    handleReaction(discussion.id, emoji)
                                  }
                                  className="hover:scale-125 transition-transform p-2"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {discussion.content}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {Object.values(discussion.reactions).map((reaction) => (
                        <button
                          key={reaction.emoji}
                          onClick={() =>
                            handleReaction(discussion.id, reaction.emoji)
                          }
                          className={`
                            inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm
                            transition-all duration-200 hover:scale-105
                            ${
                              reaction.userReacted
                                ? "bg-[#1a4d7c] text-white"
                                : "bg-gray-100 text-[#1a4d7c] hover:bg-gray-200"
                            }
                          `}
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Ligne de séparation */}
              <div className="border-b border-blue my-4"></div>
            </div>
          ))}
        </div>

        {/* Formulaire de réponse */}
        <form onSubmit={handleReplySubmit} className="mt-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1a4d7c] bg-opacity-10 flex items-center justify-center">
              <User className="w-6 h-6 text-[#1a4d7c]" />
            </div>
            <div className="flex-1">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Partagez votre point de vue..."
                className="w-full p-4 rounded-2xl border border-[#1a4d7c] bg-white focus:ring-2 focus:ring-[#cd7f32] transition-all duration-200 resize-none"
                rows={4}
              />
              <div className="mt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Smile className="w-5 h-5 text-[#1a4d7c]" />
                </button>

                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary-dark"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Répondre
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* le modal d'authentification */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connexion requise</DialogTitle>
            <DialogDescription>
              Pour participer à la discussion, vous devez être connecté.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Link
              href="/login"
              className="w-full bg-[#1a4d7c] text-white py-2 px-4 rounded-lg text-center hover:bg-[#143d64] transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="w-full border border-[#1a4d7c] text-[#1a4d7c] py-2 px-4 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              Créer un compte
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
