import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    
    setFormErrors(newErrors);
    
    if (!Object.values(newErrors).some(Boolean)) {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="border-t-2 border-black">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Organization info */}
        <div className="w-full md:w-5/12 bg-[#f4d1d1] p-8 md:p-12 lg:p-16 flex flex-col justify-between border-r-2 border-black">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#7b3737] mb-6">
              Dear Asian Youth
            </h2>
          </div>
          
          <div className="flex space-x-4 mt-8">
            <SocialIcon icon="instagram" href="#" />
            <SocialIcon icon="facebook" href="#" />
            <SocialIcon icon="twitter" href="#" />
            <SocialIcon icon="linkedin" href="#" />
            <SocialIcon icon="tiktok" href="#" />
          </div>
        </div>
        
        {/* Right side - Contact form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#7b3737] mb-8">
            Contact Us
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-[#5c3636] uppercase text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className={`w-full border-2 ${formErrors.name ? 'border-red-500' : 'border-black'} p-3 focus:outline-none focus:ring-2 focus:ring-[#7b3737]`}
              />
              {formErrors.name && (
                <p className="mt-1 text-red-500 text-sm">Please enter your name</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-[#5c3636] uppercase text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={`w-full border-2 ${formErrors.email ? 'border-red-500' : 'border-black'} p-3 focus:outline-none focus:ring-2 focus:ring-[#7b3737]`}
              />
              {formErrors.email && (
                <p className="mt-1 text-red-500 text-sm">Please enter a valid email address</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-[#5c3636] uppercase text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here"
                rows={6}
                className={`w-full border-2 ${formErrors.message ? 'border-red-500' : 'border-black'} p-3 focus:outline-none focus:ring-2 focus:ring-[#7b3737]`}
              ></textarea>
              {formErrors.message && (
                <p className="mt-1 text-red-500 text-sm">Please enter your message</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#7b3737] text-white py-4 uppercase font-medium hover:bg-[#561f1f] transition-colors border-2 border-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

interface SocialIconProps {
  icon: string;
  href: string;
}

const SocialIcon = ({ icon, href }: SocialIconProps) => {
  return (
    <a 
      href={href}
      className="w-10 h-10 rounded-full bg-white bg-opacity-60 flex items-center justify-center
      hover:bg-opacity-100 transition-all transform hover:scale-110 border-2 border-black"
      aria-label={icon}
    >
      <span className="text-[#7b3737]">
        {icon.charAt(0).toUpperCase()}
      </span>
    </a>
  );
};

export default ContactUs;