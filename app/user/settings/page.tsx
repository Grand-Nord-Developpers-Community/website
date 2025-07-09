"use client";
import { Button } from "@/components/ui/button";
import { Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  //console.log('Profile data submitted:', profileData);
  // Here you would typically send the data to your backend
};
const ProfilePage = () => (
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-2">Profil</h2>
      <p className="text-gray-600 mb-4">
        Vous trouverez ci-dessous les informations de votre profil pour votre
        compte.
      </p>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="pseudo"
            className="block text-sm font-medium text-gray-700"
          >
            Pseudo
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              gndc.cm/user/
            </span>
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              //value={profileData.pseudo}
              //onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <div className="mt-1">
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Écrivez quelques phrases sur vous-même."
              //value={profileData.bio}
              //onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button
              type="button"
              //onClick={() => fileInputRef.current?.click()}
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Changer
            </button>
            <input
              type="file"
              //ref={fileInputRef}
              //onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Votre site web
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="website"
              id="website"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="https://example.com"
              //value={profileData.website}
              //onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">Informations personnelles</h2>
      <p className="text-gray-600 mb-4">
        Mettez à jour vos informations personnelles. Votre adresse ne sera
        jamais accessible au public.
      </p>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            //value={profileData.name}
            //onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Adresse E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            //value={profileData.email}
            //onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Localisation
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            //value={profileData.location}
            //onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Numéro de téléphone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            //value={profileData.phone}
            //onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">Réseaux sociaux</h2>
      <p className="text-gray-600 mb-4">
        Faites savoir à tout le monde où ils peuvent vous trouver.
      </p>
      <div className="space-y-4">
        <div className="flex items-center">
          <Twitter className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            name="twitter"
            id="twitter"
            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Votre pseudo Twitter"
            //value={profileData.twitter}
            //onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          <Github className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            name="github"
            id="github"
            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Votre pseudo GitHub"
            //value={profileData.github}
            //onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          <Linkedin className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Votre pseudo LinkedIn"
            //value={profileData.linkedin}
            //onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <Button className="w-2xl" asChild>
        <Link href="/profile">Enregistrer</Link>
      </Button>
    </div>
  </form>
);
export default ProfilePage;
