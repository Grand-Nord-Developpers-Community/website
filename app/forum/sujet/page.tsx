/* eslint-disable jsx-a11y/alt-text */
'use client'
import React, { useState, useRef } from 'react';
import { Pencil, Eye, HelpCircle, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-markdown';

const codingTopics = [
  "HTML basics", "CSS styling", "JavaScript fundamentals", "Python programming",
  "React components", "Vue.js essentials", "Angular framework", "Node.js backend",
  "Ruby on Rails", "PHP development", "SQL databases", "MongoDB NoSQL",
  "Git version control", "Docker containers", "Kubernetes orchestration",
  "AWS cloud services", "Machine learning with TensorFlow", "Data visualization with D3.js",
  "GraphQL API", "Rust systems programming"
];

export default function CreateTopicForm() {
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('write');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, channel, content });
  };

  const insertImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setContent(prevContent => prevContent + `\n![${file.name}](${imageUrl})\n`);
  };

  const renderPreview = () => {
    const highlighted = Prism.highlight(content, Prism.languages.markdown, 'markdown');
    return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  const helpContent = (
    <div>
      <h3 className="font-bold mb-2">Aide à la rédaction</h3>
      <p>Voici quelques commandes utiles :</p>
      <ul className="list-disc pl-5">
        <li>**texte** - Met le texte en gras</li>
        <li>*texte* - Met le texte en italique</li>
        <li>[texte](url) - Insère un lien</li>
        <li>![alt](url) - Insère une image</li>
        <li># Titre - Crée un titre de niveau 1</li>
        <li>## Sous-titre - Crée un titre de niveau 2</li>
        <li>- item - Crée une liste à puces</li>
        <li>1. item - Crée une liste numérotée</li>
        <li>```langage - Débute un bloc de code</li>
        <li>` code ` - Insère du code inline</li>
        <li> texte - Crée une citation</li>
        <li>--- - Insère une ligne horizontale</li>
        <li>| A | B | - Crée un tableau</li>
        <li>~~texte~~ - Barre le texte</li>
      </ul>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer un sujet</h1>
      <p className="mb-4">
        Assurez-vous d&apos;avoir lu nos <a href="/codeofconduct" className="text-primary hover:underline">règles de conduite</a> avant de continuer.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Titre</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={75}
            placeholder="Maximum de 75 caractères"
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="channel" className="block mb-2">Channel</label>
          <Select onValueChange={setChannel} value={channel}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              {codingTopics.map((topic, index) => (
                <SelectItem key={index} value={topic}>{topic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <div className="flex mb-2 items-center">
            <Button
              type="button"
              variant={activeTab === 'write' ? 'default' : 'outline'}
              onClick={() => setActiveTab('write')}
              className="mr-2"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Écrire
            </Button>
            <Button
              type="button"
              variant={activeTab === 'preview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('preview')}
              className="mr-2"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              type="button"
              variant={activeTab === 'help' ? 'default' : 'outline'}
              onClick={() => setActiveTab('help')}
              className="mr-2"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Aide
            </Button>
            <button
              type="button"
              onClick={insertImage}
              className="ml-auto"
            >
              <Image className="w-8 h-8 mr-3 text-primary" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          
          {activeTab === 'write' && (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type / for commands"
              className="w-full h-60"
            />
          )}
          
          {activeTab === 'preview' && (
            <div className="border p-4 h-60 overflow-auto prose prose-sm max-w-none">
              {renderPreview()}
            </div>
          )}
          
          {activeTab === 'help' && (
            <div className="border p-4 h-60 overflow-auto">
              {helpContent}
            </div>
          )}
        </div>
        
        <p className="mb-4 text-sm">
          Pour le formatage du code (couleur syntaxique, langage, etc.) nous utilisons <a href="#" className="text-primary hover:underline">TorchLight</a>
        </p>
        
        <Button type="submit" className="bg-primary text-white">Enregistrer</Button>
      </form>
      
      <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold">Attention</p>
        <p>Veuillez rechercher votre question avant de publier votre sujet en utilisant le champ de recherche dans la barre de navigation pour voir si elle n&apos;a pas déjà été traitée.</p>
      </div>
    </div>
  );
}