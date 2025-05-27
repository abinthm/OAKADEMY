const WhoWeAre = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-primary-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="w-full">

            <h2 className="font-['Poppins'] font-extrabold text-5xl md:text-6xl lg:text-7xl mb-8 text-white lg:text-[#3B3D87]">
              What We Do
            </h2>
            
            <div className="md:pr-8">

              
              <ul className="space-y-6">
                <ListItem 
                  title="Promote Inclusive AI Literacy:" 
                  description="
Deliver AI education that is accessible to students regardless of their prior exposure or location, using culturally relevant content and affordable, low-resource methods."
                />
                <ListItem 
                  title="Advance Sustainable AI Awareness: " 
                  description="Educate young learners about the environmental impact of AI technologies and encourage responsible, energy-efficient practices."
                />
                <ListItem 
                  title="Foster Community-Driven Innovation:" 
                  description="Support students in applying AI knowledge to develop practical solutions that address local issues and improve community well-being."
                />
                <ListItem 
                  title="Strengthen AI Systems Through Real-World Contexts: " 
                  description="By enabling underrepresented rural youth to interact with and contribute to AI tools and databases, Oakademy ensures that future AI systems are grounded in diverse, authentic datasets. This helps reduce hallucinations and blind information retrieval, leading to more reliable outputs and minimizing unnecessary computational waste and carbon emissions."
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
    <span className="text-primary-700 font-bold mr-2 mt-1.5">•</span>
    <div>
      <h3 className="font-bold text-xl text-[#3B3D87] mb-1">{title}</h3>
      <p className="font-normal text-[#3B3D87]">{description}</p>
    </div>
  </li>
);

export default WhoWeAre;