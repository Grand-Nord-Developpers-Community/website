'use client';

import React, { useState } from 'react';
import Modal from '@/components/legal/modal';
import { FileText, ShieldAlert, UserCheck, Scale } from 'lucide-react';

const TermsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-sm hover:underline flex items-center">
        <FileText className="w-4 h-4 mr-1" />
        Conditions d&apos;utilisation
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Conditions d'utilisation">
        <div className="space-y-6">
          <section className="flex items-start">
            <UserCheck className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Acceptation des conditions</h3>
              <p className="text-gray-700">En accédant à ce site et en l&apos;utilisant, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables.</p>
            </div>
          </section>

          <section className="flex items-start">
            <ShieldAlert className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Modification des conditions</h3>
              <p className="text-gray-700">Nous nous réservons le droit de réviser ces conditions d&apos;utilisation à tout moment sans préavis. En utilisant ce site web, vous acceptez d&apos;être lié par la version alors actuelle de ces conditions d&apos;utilisation.</p>
            </div>
          </section>

          <section className="flex items-start">
            <Scale className="w-8 h-8 text-purple-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Loi applicable</h3>
              <p className="text-gray-700">Ces conditions sont régies et interprétées conformément aux lois du Cameroun, et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de cet État ou lieu.</p>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default TermsModal;