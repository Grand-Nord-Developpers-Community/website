import React from "react";
import ProfileSection from "../(common)/profil-section";
import ProfileHeader from "@/components/profile/profile-header";
import { getUserProfile } from "@/actions/user.actions";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  const { user } = await auth();
  if (!user) return null;
  const userprofile = await getUserProfile(user.id);
  return (
    <div className="bg-gray-50">
      <section className="relative block max-sm:h-[300px] h-[400px] w-full">
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')]">
          <span
            id="blackOverlay"
            className="w-full h-full absolute  opacity-50 bg-primary/80"
          ></span>
        </div>
      </section>
      <section className="relative py-16">
        <div className="container mx-auto px-4 max-sm:px-2">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border border-border  rounded-lg -mt-64">
            <div className="px-6 max-sm:px-4">
              <ProfileHeader user={userprofile} />
              <ProfileSection user={userprofile} />
            </div>
          </div>
        </div>
      </section>
    </div>
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
