'use client';

import React, { useState } from 'react';
import Modal from '@/components/legal/modal';
import { Lock, Database, Shield, Eye } from 'lucide-react';

const PrivacyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-sm hover:underline flex items-center">
        <Lock className="w-4 h-4 mr-1" />
        Confidentialité
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Politique de confidentialité">
        <div className="space-y-6">
          <section className="flex items-start">
            <Database className="w-8 h-8 text-indigo-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Collecte d&apos;informations</h3>
              <p className="text-gray-700">Nous recueillons des informations personnelles que vous nous fournissez directement, telles que votre nom, adresse e-mail, et informations de profil. Nous collectons également automatiquement certaines informations sur votre utilisation de notre service.</p>
            </div>
          </section>

          <section className="flex items-start">
            <Shield className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Utilisation des données</h3>
              <p className="text-gray-700">Nous utilisons les informations que nous collectons pour fournir, maintenir et améliorer notre service, pour communiquer avec vous, et pour détecter, prévenir et résoudre les problèmes techniques et de sécurité.</p>
            </div>
          </section>

          <section className="flex items-start">
            <Eye className="w-8 h-8 text-red-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Protection des données</h3>
              <p className="text-gray-700">Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l&apos;accès non autorisé, la modification, la divulgation ou la destruction.</p>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default PrivacyModal;