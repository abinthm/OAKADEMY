import { useState } from 'react';
import frame1 from '../assets/Frame 1.svg';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false
  });

  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    
    setFormErrors(newErrors);
    
    if (!Object.values(newErrors).some(Boolean)) {
      setSubmitStatus('Sending...');
      
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('message', formData.message);
      form.append('access_key', 'e4bb3840-5eb6-4a56-9667-ce51ad5e17d9');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: form
        });

        const data = await response.json();

        if (data.success) {
          setSubmitStatus('Message sent successfully!');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
          setTimeout(() => setSubmitStatus(''), 5000);
        } else {
          setSubmitStatus('Error sending message. Please try again.');
          console.error('Submission error:', data);
        }
      } catch (error) {
        setSubmitStatus('Error sending message. Please try again.');
        console.error('Submission error:', error);
      }
    }
  };

  return (
    <section id="contact" className="h-[calc(100vh-4rem)] flex">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side - Organization info */}
        <div className="w-full md:w-5/12 bg-[#3B3D87] flex flex-col justify-center items-center">
          <div className="flex-grow flex items-center justify-center">
            <img 
              src={frame1} 
              alt="Oakademy Logo" 
              className="w-48 md:w-64 lg:w-72"
            />
          </div>
          
          <div className="flex space-x-6 mb-8">
            <SocialIcon icon={<FaInstagram />} href="https://www.instagram.com/oakademy.in/" />
            <SocialIcon icon={<FaFacebookF />} href="#" />
            <SocialIcon icon={<FaTwitter />} href="#" />
            <SocialIcon icon={<FaLinkedinIn />} href="https://www.linkedin.com/company/oakademylearning" />
            <SocialIcon icon={<FaTiktok />} href="#" />
          </div>
        </div>
        
        {/* Right side - Contact form */}
        <div className="w-full md:w-7/12 flex flex-col">
          <div className="p-6 md:p-8 lg:p-12 flex flex-col h-full">
            <h2 className="font-['Poppins'] font-extrabold text-2xl md:text-3xl lg:text-4xl text-[#3B3D87] mb-6">
              Contact Us
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
              <div className="space-y-4 flex-grow">
                <div>
                  <label htmlFor="name" className="block text-[#3B3D87] uppercase text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-[#3B3D87]'} p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3B3D87]`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-red-500 text-xs">Please enter your name</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#3B3D87] uppercase text-sm font-medium mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-[#3B3D87]'} p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3B3D87]`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-red-500 text-xs">Please enter a valid email address</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#3B3D87] uppercase text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here"
                    rows={4}
                    className={`w-full border ${formErrors.message ? 'border-red-500' : 'border-[#3B3D87]'} p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3B3D87]`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-red-500 text-xs">Please enter your message</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                {submitStatus && (
                  <p className={`text-sm mb-2 ${
                    submitStatus.includes('Error') ? 'text-red-500' : 'text-green-600'
                  }`}>
                    {submitStatus}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#3B3D87] text-white py-3 uppercase font-medium hover:bg-opacity-90 transition-colors border border-[#3B3D87] disabled:opacity-50"
                  disabled={submitStatus === 'Sending...'}
                >
                  {submitStatus === 'Sending...' ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

const SocialIcon = ({ icon, href }: SocialIconProps) => {
  return (
    <a 
      href={href}
      className="w-12 h-12 rounded-full bg-white flex items-center justify-center
      hover:bg-opacity-90 transition-all transform hover:scale-110"
      aria-label="Social media link"
    >
      <span className="text-[#3B3D87] text-xl">
        {icon}
      </span>
    </a>
  );
};

export default ContactUs;