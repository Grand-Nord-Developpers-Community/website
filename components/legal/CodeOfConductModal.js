'use client';

import React, { useState } from 'react';
import Modal from '@/components/legal/modal';
import { Users, Handshake, MessageSquare, AlertTriangle } from 'lucide-react';

const CodeOfConductModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-sm hover:underline flex items-center">
        <Users className="w-4 h-4 mr-1" />
        Code de conduite
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Code de conduite">
        <div className="space-y-6">
          <section className="flex items-start">
            <Handshake className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Respect mutuel</h3>
              <p className="text-gray-700">Traitez tous les membres de la communauté avec respect et courtoisie. N&apos;utilisez pas de langage ou d&apos;images inappropriés, et soyez attentif aux différences culturelles.</p>
            </div>
          </section>

          <section className="flex items-start">
            <MessageSquare className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Communication constructive</h3>
              <p className="text-gray-700">Exprimez vos idées clairement et écoutez les autres. Acceptez les critiques constructives et offrez des retours de manière bienveillante. Cherchez à comprendre avant de vous faire comprendre.</p>
            </div>
          </section>

          <section className="flex items-start">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Signalement des problèmes</h3>
              <p className="text-gray-700">Si vous êtes témoin d&apos;un comportement inapproprié ou d&apos;une violation de ce code de conduite, signalez-le immédiatement aux modérateurs de la communauté. Toutes les plaintes seront examinées et traitées de manière confidentielle.</p>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default CodeOfConductModal;