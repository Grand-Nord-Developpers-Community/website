// Suggested code may be subject to a license. Learn more: ~LicenseLog:2804837360.
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import touzaImage from "@/assets/images/leaders/touza.jpg";
import ArticleImage from "@/app/opengraph-image.jpg";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("articles");

  const articles = [
    {
      image: ArticleImage,
      tags: ["Laravel", "Open Source", "PHP"],
      title: "Laravel 11.24 nouvelle release",
      content:
        "La team Laravel a publié la version 11.26 cette semaine, avec la possibilité d'arrêter un pool de processus, l'utilisation d'Enums...",
      date: "4 Octobre 2024",
      readTime: "2 min de lecture",
    },
    {
      image: ArticleImage,
      tags: ["Astuces"],
      title: "Configurer un fichier .gitignore global",
      content:
        "Quand on développe en équipe et que nous avons plusieurs développeurs qui utilisent divers éditeurs de code (IDE), ça nous arrive...",
      date: "19 Juillet 2023",
      readTime: "2 min de lecture",
    },
    {
      image: ArticleImage,
      tags: ["React", "JavaScript"],
      title: "Introduction à React Hooks",
      content:
        "React Hooks sont une fonctionnalité introduite dans React 16.8 qui permet d'utiliser l'état et d'autres fonctionnalités de React sans écrire de classe...",
      date: "15 Septembre 2024",
      readTime: "5 min de lecture",
    },
  ];

  const discussions = [
    {
      title: "Quelle est votre stack technique préférée ?",
      content:
        "Je suis curieux de connaître les stacks techniques que vous utilisez dans vos projets. Personnellement, j'utilise beaucoup Laravel et Vue.js...",
      responses: 12,
      views: 89,
      date: "Il y a 2 jours",
    },
    {
      title: "Comment gérez-vous la sécurité dans vos applications web ?",
      content:
        "La sécurité est un aspect crucial du développement web. Quelles sont vos meilleures pratiques pour sécuriser vos applications ?",
      responses: 8,
      views: 56,
      date: "Il y a 5 jours",
    },
  ];

  const questions = [
    {
      title: "Comment implémenter l'authentification JWT avec Laravel ?",
      content:
        "Je travaille sur une API RESTful avec Laravel et j'aimerais utiliser JWT pour l'authentification. Quelqu'un peut-il me guider sur la meilleure façon de l'implémenter ?",
      responses: 3,
      views: 45,
      date: "Il y a 1 jour",
    },
    {
      title: "Quelle est la différence entre useMemo et useCallback en React ?",
      content:
        "Je suis nouveau dans React et je ne comprends pas bien la différence entre useMemo et useCallback. Pouvez-vous m'expliquer quand utiliser l'un plutôt que l'autre ?",
      responses: 5,
      views: 67,
      date: "Il y a 3 jours",
    },
  ];

  return (
    <>
      <section className="relative block max-sm:h-[300px] h-[400px] w-full">
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')]">
          <span
            id="blackOverlay"
            className="w-full h-full absolute  opacity-50 bg-primary/80"
          ></span>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-between">
                <div className="w-full lg:w-[40%] px-4 flex justify-center">
                  <div className="relative w-full -m-16 -ml-20 lg:-ml-16 ">
                    <div className="flex gap-5  align-middle absolute w-full">
                      <img
                        alt="..."
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full w-[150px] grow-0 h-[150px] object-cover  border-none "
                      />
                      <div className="mt-20">
                        <h1 className="text-2xl font-bold text-primary truncate max-sm:max-w-[200px]">
                          mohamed el bachir bouba nga
                        </h1>
                        <p className="text-sm text-gray-400">@chirbael</p>
                        <div className="flex gap-2 mt-2">
                          <Badge>Moderateur</Badge>
                          <Badge variant={"secondary"}>0 xp</Badge>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Inscrit il y a 4 ans
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div> */}
                <div className="w-full lg:w-4/12 px-4 max-lg:mt-[100px]">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Comments
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500">
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
//<div className="w-full">
//      <div className="bg-primary">
//       <div className="screen-wrapper py-6 mb-6">
//         <div className="flex items-center mb-4">
//         <Image
//             src={touzaImage}
//             alt="Isaac Touza"
//             width={120}
//             height={120}
//             className="border border-primary mr-4"
//             />

//           <div>
//             <h1 className="text-2xl font-bold text-white">Isaac Touza</h1>
//             <p className="text-sm text-gray-400">Inscrit il y a 4 ans</p>
//             <div className="flex items-center mt-2">
//               <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">2033 XP</span>
//               <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Modérateur</span>
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h2 className="text-lg font-semibold mb-2 text-secondary">Biographie</h2>
//             <p className=" text-gray-200">Fullstack Developer - Laravel, Kotlin & React Developer. GNDC Organizer @gndc | @2zalab</p>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-2 text-secondary">Localisation</h2>
//             <p className="text-gray-400">Maroua, Cameroun</p>
//             <h2 className="text-lg font-semibold mt-4 mb-2 text-secondary">Site internet</h2>
//             <Link href="https://2zalab.com" className="text-blue-600 hover:underline flex items-center">
//               https://2zalab.com
//               <ExternalLink size={16} className="ml-1" />
//             </Link>
//           </div>
//         </div>
//         <div className="flex mt-4 text-gray-300">
//           <Link href="#" className="mr-4">
//             <Github />
//           </Link>
//           <Link href="#" className="mr-4">
//             <Twitter />
//           </Link>
//           <Link href="#">
//             <Linkedin />
//           </Link>
//         </div>
//       </div>
//  </div>
//       <div className="screen-wrapper mb-6">
//         <nav className="flex">
//           <button
//             className={`px-4 py-2 font-medium text-sm ${activeTab === 'articles' ? 'border-b-2 border-[#C38D3D] bg-[#F6EAD7]' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('articles')}
//           >
//             Articles
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${activeTab === 'discussions' ? 'border-b-2 border-[#C38D3D] bg-[#F6EAD7]'  : 'text-gray-500'}`}
//             onClick={() => setActiveTab('discussions')}
//           >
//             Discussions
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${activeTab === 'questions' ? 'border-b-2 border-[#C38D3D] bg-[#F6EAD7]'  : 'text-gray-500'}`}
//             onClick={() => setActiveTab('questions')}
//           >
//             Questions
//           </button>
//         </nav>
//       </div>

//       <div className="space-y-4 divider-y-1 divider-gray-100 screen-wrapper mb-10">
//         {activeTab === 'articles' && articles.map((article, index) => (
//           <div key={index} className="flex items-start">
//             <div className="flex-shrink-0 mr-4 max-sm:hidden">
//               <Image
//                 src={article.image}
//                 alt={article.title}
//                 width={100}
//                 height={100}
//                 className="rounded" />
//             </div>
//             <div>
//               {/*<div className="flex flex-wrap gap-2 mb-2">
//                 {article.tags.map((tag, tagIndex) => (
//                   <span key={tagIndex} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">{tag}</span>
//                 ))}
//               </div>*/}
//               <h2 className="text-xl font-bold mb-2">{article.title}</h2>
//               <p className="text-gray-600 mb-2">{article.content}</p>
//               <div className="flex items-center">
//                 <Image src={touzaImage} alt="Isaac Touza" width={24} height={24} className="rounded-full size-6 mr-2" />
//                 <span className="text-sm text-gray-600">Isaac Touza</span>
//                 <span className="text-sm text-gray-400 mx-2">•</span>
//                 <span className="text-sm text-gray-600">{article.date} • {article.readTime}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// 	{activeTab === 'discussions' && discussions.map((discussion, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg border border-border shadow-sm">
//             <h2 className="text-xl font-bold mb-2 line-clamp-2">{discussion.title}</h2>
//             <p className="text-gray-600 mb-2 line-clamp-3">{discussion.content}</p>
//             <div className="flex items-center text-sm text-gray-500">
//               <span>{discussion.responses} réponses</span>
//               <span className="mx-2">•</span>
//               <span>{discussion.views} vues</span>
//               <span className="mx-2">•</span>
//               <span>{discussion.date}</span>
//             </div>
//           </div>
//         ))}
// 	</div>

//         {activeTab === 'questions' && questions.map((question, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg border border-border shadow-sm">
//             <h2 className="text-xl font-bold mb-2">{question.title}</h2>
//             <p className="text-gray-600 mb-2">{question.content}</p>
//             <div className="flex items-center text-sm text-gray-500">
//               <span>{question.responses} réponses</span>
//               <span className="mx-2">•</span>
//               <span>{question.views} vues</span>
//               <span className="mx-2">•</span>
//               <span>{question.date}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
