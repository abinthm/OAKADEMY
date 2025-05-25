const OurImpact = () => {
  return (
    <section id="involved" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="uppercase text-[#7b3737] text-sm font-medium tracking-wider mb-2">
          ORGANIZATION
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-[#561f1f] mb-12">
          Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamCard 
            title="Diversity & Inclusion Task Force" 
            imageUrl="https://images.pexels.com/photos/7175450/pexels-photo-7175450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <TeamCard 
            title="Finance & Fundraising" 
            imageUrl="https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <TeamCard 
            title="Literature" 
            imageUrl="https://images.pexels.com/photos/7176305/pexels-photo-7176305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <TeamCard 
            title="Marketing" 
            imageUrl="https://images.pexels.com/photos/7176302/pexels-photo-7176302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <TeamCard 
            title="Podcast" 
            imageUrl="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <TeamCard 
            title="Policy" 
            imageUrl="https://images.pexels.com/photos/7174396/pexels-photo-7174396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-[#4a4a4a] text-white px-6 py-3 rounded hover:bg-[#333333] transition-colors">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};

interface TeamCardProps {
  title: string;
  imageUrl: string;
}

const TeamCard = ({ title, imageUrl }: TeamCardProps) => (
  <div className="group">
    <div className="rounded-lg overflow-hidden mb-4 relative">
      <div 
        className="aspect-square bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-[#7b3737] opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-serif text-2xl md:text-3xl text-[#561f1f] text-center px-4 py-2 bg-white bg-opacity-80 rounded">
          {title}
        </h3>
      </div>
    </div>
    <a 
      href="#" 
      className="inline-flex items-center text-[#7b3737] font-medium hover:text-[#561f1f] transition-colors"
    >
      {title.toUpperCase()} <span className="ml-2">→</span>
    </a>
  </div>
);

export default OurImpact;