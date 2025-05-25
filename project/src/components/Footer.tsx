const Footer = () => {
  return (
    <footer className="bg-[#f4d1d1] py-6 text-center text-[#7b3737] text-sm border-t-2 border-black">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Dear Asian Youth. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;