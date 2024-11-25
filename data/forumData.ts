import { Category, ForumTopic } from "@/interfaces/forumTypes";


export const categories: Category[] = [
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

export const forumTopics: ForumTopic[] = [
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