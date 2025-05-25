const WhoWeAre = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="w-full">
            <div className="uppercase text-[#7b3737] text-sm font-medium tracking-wider mb-2">
              BACKGROUND
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#561f1f] mb-12">
              What We Do
            </h2>
            
            <div className="md:pr-8">
              <p className="text-[#5c3636] text-lg mb-8">
                Through storytelling, education, and activism, DAY continues to uplift young Asians. Here's what we do:
              </p>
              
              <ul className="space-y-6">
                <ListItem 
                  title="Advocacy & Community Building" 
                  description="A global platform driving real-world change through activism and leadership."
                />
                <ListItem 
                  title="Dear Asian Generation Podcast" 
                  description="(formerly Dear Asian Girl) – Sparks conversations by exploring identity, activism, and culture through the lens of Asian experiences."
                />
                <ListItem 
                  title="Publications & Creative Expression" 
                  description="400+ pieces, including essays, poetry, and zines, showcasing diversity and holistic Asian representation."
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ListItemProps {
  title: string;
  description: string;
}

const ListItem = ({ title, description }: ListItemProps) => (
  <li className="flex items-start">
    <span className="text-[#7b3737] font-bold mr-2 mt-1.5">•</span>
    <div>
      <h3 className="text-[#7b3737] font-medium text-xl mb-1">{title}</h3>
      <p className="text-[#5c3636]">{description}</p>
    </div>
  </li>
);

export default WhoWeAre;