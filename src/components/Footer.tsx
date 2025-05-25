const Footer = () => {
  return (
    <footer className="bg-primary-50 py-6 text-center text-primary-700 text-sm border-t border-primary-500">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Dear Asian Youth. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;