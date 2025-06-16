import React from 'react';
import ContactUs from '../components/ContactUs';
import usePageTitle from '../hooks/usePageTitle';

const ContactPage: React.FC = () => {
  usePageTitle('Contact Us');
  
  return (
    <div className="min-h-screen">
      <ContactUs />
    </div>
  );
};

export default ContactPage; 