'use client'
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface DashboardItemProps {
  title: string;
  value: number;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

interface CategoryProps {
  title: string;
  value: number;
  isSelected: boolean;
  onClick: () => void;
}

const Category: React.FC<CategoryProps> = ({ title, value, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-2 px-4 rounded flex justify-between items-center ${
      isSelected ? 'bg-[#F6EAD7] text-[#C38D3D] font-semibold' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span>{title}</span>
    <span className="font-semibold">{value}</span>
  </button>
);

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Articles');

  const dashboardItems: DashboardItemProps[] = [
    { title: "Total Articles/Discussions", value: 0 },
    { title: "Total Réponses", value: 0 },
    { title: "Sujets Résolus", value: 0 },
    { title: "Total Experience", value: 0 },
  ];

  const categories = [
    { title: "Articles", value: 0 },
    { title: "Discussions", value: 0 },
    { title: "Sujets", value: 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardItems.map((item, index) => (
          <DashboardItem key={index} title={item.title} value={item.value} />
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 hidden md:block">
          {categories.map((category) => (
            <Category
              key={category.title}
              title={category.title}
              value={category.value}
              isSelected={selectedCategory === category.title}
              onClick={() => setSelectedCategory(category.title)}
            />
          ))}
        </div>
        
        <div className="w-full md:w-2/3 bg-white">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Vos articles</h2>
            <button className="bg-[#C38D3D] hover:bg-primary text-white font-bold py-2 px-4 rounded flex items-center">
              <PlusCircle className="mr-2" size={20} />
              Nouvel article
            </button>
          </div>
          
          <div className="p-4">
            <p className="text-gray-600">Vous n&apos;avez pas encore créé d&apos;articles.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;