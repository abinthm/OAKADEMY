const WhatWeDo = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f9f5f5] border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="w-full">
            <div className="uppercase text-[#7b3737] text-sm font-medium tracking-wider mb-2">
              NUMBERS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#561f1f] mb-12">
              Our Impact
            </h2>
            
            <div className="md:pr-8">
              <p className="text-[#5c3636] text-lg mb-8">
                Since our founding in 2020 by Stephanie Hu, DAY has grown into a global network. Now led by
                Executive Director Saoud Moon and Vice President Parveen Mundi, we are making an impact
                through:
              </p>
              
              <ul className="space-y-6">
                <ListItem text="200+ team members across 10+ countries" />
                <ListItem text="100+ chapters leading local grassroots initiatives" />
                <ListItem text="90,000+ followers sharing impactful stories with us on our social media platforms" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ListItemProps {
  text: string;
}

const ListItem = ({ text }: ListItemProps) => (
  <li className="flex items-start">
    <span className="text-[#7b3737] font-bold mr-2 mt-1.5">•</span>
    <p className="text-[#5c3636] text-lg">{text}</p>
  </li>
);

export default WhatWeDo;