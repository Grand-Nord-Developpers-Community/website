'use client'
import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, Palette, Bell, CreditCard, Menu, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, Moon } from 'lucide-react';
import lightImage from "/assets/images/theme-light.png";
import darkImage from "/assets/images/theme-dark.png";
import Image from 'next/image';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [profileData, setProfileData] = useState({
    pseudo: '2zalab',
    bio: 'PhD student in computer science | Computer science instructor| Software developer | Data Scientist.',
    photo: '',
    website: 'https://2zalab.com',
    name: 'Touza Isaac',
    email: 'isaac_touza@outlook.fr',
    location: 'Maroua',
    phone: '691805321',
    twitter: 'isaactouza',
    github: '2zalab',
    linkedin: 'touzaisaac'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data submitted:', profileData);
    // Here you would typically send the data to your backend
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'password':
        return renderPasswordTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'subscription':
        return renderSubscriptionTab();
      default:
        return null;
    }
  };

  const renderProfileTab = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Profil</h2>
        <p className="text-gray-600 mb-4">Vous trouverez ci-dessous les informations de votre profil pour votre compte.</p>
        <div className="space-y-4">
          <div>
            <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700">Pseudo</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                gndc.cm/user/
              </span>
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={profileData.pseudo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <div className="mt-1">
              <textarea
                id="bio"
                name="bio"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Écrivez quelques phrases sur vous-même."
                value={profileData.bio}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="h-full w-full object-cover" />
                ) : (
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Changer
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Votre site web</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="website"
                id="website"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="https://example.com"
                value={profileData.website}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Informations personnelles</h2>
        <p className="text-gray-600 mb-4">Mettez à jour vos informations personnelles. Votre adresse ne sera jamais accessible au public.</p>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={profileData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={profileData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localisation</label>
            <input
              type="text"
              name="location"
              id="location"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={profileData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={profileData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Réseaux sociaux</h2>
        <p className="text-gray-600 mb-4">Faites savoir à tout le monde où ils peuvent vous trouver.</p>
        <div className="space-y-4">
          <div className="flex items-center">
            <Twitter className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              name="twitter"
              id="twitter"
              className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Votre pseudo Twitter"
              value={profileData.twitter}
              onChange={handleInputChange}
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
              value={profileData.github}
              onChange={handleInputChange}
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
              value={profileData.linkedin}
              onChange={handleInputChange}
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

  const renderPasswordTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Mot de passe</h2>
      <p className="text-gray-600 mb-4">Vous devez renseigner votre mot de passe actuel pour changer de mot de passe.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
          <input type="password" id="current-password" name="current-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
          <input type="password" id="new-password" name="new-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p className="mt-1 text-sm text-gray-500">Votre nouveau mot de passe doit comporter plus de 8 caractères.</p>
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmer nouveau mot de passe</label>
          <input type="password" id="confirm-password" name="confirm-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Enregistrer</Button>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Apparence</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Personnalisez l&apos;apparence de votre interface.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`border p-4 rounded-md ${theme === 'light' ? 'bg-white border-[#C38D3D]' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold dark:text-white">Thème Light</h3>
            <Sun className="text-yellow-500" size={20} />
          </div>
          <div className="mb-2 overflow-hidden rounded-md">
            <Image 
                src={lightImage} 
                alt="Theme Light" 
                className="w-full h-auto" 
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ce thème sera actif par défaut lorsque votre système sera réglé sur « Mode light »</p>
          <Button 
            variant={theme === 'light' ? "default" : "outline"} 
            className="w-full"
            onClick={() => setTheme('light')}
          >
            {theme === 'light' ? 'Actif' : 'Activer'}
          </Button>
        </div>
        <div className={`border p-4 rounded-md ${theme === 'dark' ? 'bg-gray-800 border-blue-500' : 'bg-white border-gray-300'}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold dark:text-white">Thème Dark</h3>
            <Moon className="text-blue-500" size={20} />
          </div>
          <div className="mb-2 overflow-hidden rounded-md">
            <Image 
                src={darkImage} 
                alt="Theme Dark" 
                className="w-full h-auto" 
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ce thème sera actif par défaut lorsque votre système sera réglé sur « Mode dark »</p>
          <Button 
            variant={theme === 'dark' ? "default" : "outline"} 
            className="w-full"
            onClick={() => setTheme('dark')}
          >
            {theme === 'dark' ? 'Actif' : 'Activer'}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Gérez vos notifications</h2>
      <p className="text-gray-600 mb-4">Cette page répertorie tous les abonnements à des e-mails pour votre compte. Par exemple, vous avez peut-être demandé à être informé par e-mail de la mise à jour d&apos;un thread ou d&apos;un fil de discussion particulier.</p>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Astuce: Visitez n&apos;importe quel fil de discussion du forum et cliquez sur le bouton S&apos;abonner dans la barre latérale. Une fois cliqué, vous recevrez un e-mail chaque fois qu&apos;une réponse sera publiée. Il en va de même pour n&apos;importe quel type de contenu qui offre cette possibilité.
            </p>
          </div>
        </div>
      </div>
      {/* Add notification settings here */}
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Abonnement</h2>
      <p className="text-gray-600 mb-4">Gérez votre abonnement et vos options de paiement.</p>
      {/* Add subscription management content here */}
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      <div className="flex flex-col md:flex-row">
        {/* Desktop navigation */}
        <div className="md:w-1/4 md:pr-6 mb-4 md:mb-0 hidden md:block">
          <nav className="space-y-2">
            <button
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'profile' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              <span>Mon profil</span>
            </button>
            <button
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'password' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('password')}
            >
              <Lock size={20} />
              <span>Mot de passe</span>
            </button>
            <button
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'appearance' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('appearance')}
            >
              <Palette size={20} />
              <span>Apparence</span>
            </button>
            <button
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'notifications' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={20} />
              <span>Notifications</span>
            </button>
            <button
              className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'subscription' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('subscription')}
            >
              <CreditCard size={20} />
              <span>Abonnement</span>
            </button>
          </nav>
        </div>
        <div className="md:w-3/4">
          {renderTabContent()}
        </div>
      </div>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed bottom-4 left-4 bg-[#C38D3D] text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu size={24} />
      </button>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-40">
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
            <nav className="p-4 space-y-2">
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'profile' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
              >
                <User size={20} />
                <span>Mon profil</span>
              </button>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'password' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => { setActiveTab('password'); setIsMobileMenuOpen(false); }}
              >
                <Lock size={20} />
                <span>Mot de passe</span>
              </button>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'appearance' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => { setActiveTab('appearance'); setIsMobileMenuOpen(false); }}
              >
                <Palette size={20} />
                <span>Apparence</span>
              </button>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'notifications' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => { setActiveTab('notifications'); setIsMobileMenuOpen(false); }}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'subscription' ? 'bg-[#F6EAD7] text-[#C38D3D]' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => { setActiveTab('subscription'); setIsMobileMenuOpen(false); }}
              >
                <CreditCard size={20} />
                <span>Abonnement</span>
              </button>
            </nav>
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;