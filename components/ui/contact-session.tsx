import React from 'react';

const EmailIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} w-5 h-5`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  
  const PhoneIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} w-5 h-5`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
  

const ContactSection = () => {
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center space-x-2">
        <EmailIcon className="text-gray-600" />
        <p className="text-sm">contact@gndc.org</p>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <PhoneIcon className="text-gray-600" />
          <div>
            <p className="text-sm">+237 691805321</p>
            <p className="text-sm">+237 672277579</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;