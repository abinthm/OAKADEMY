import React from 'react';

const WhatWeDo = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-50 border-b border-primary-500">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col">
          <h2 className="font-['Poppins'] font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 text-[#3B3D87]">
            Projected Global Impact
          </h2>
          
          <p className="text-gray-700 text-lg mb-12 max-w-3xl">
            If Oakademy scales its mission to 10+ countries, focusing on rural and underserved communities, here's the projected change, supported by global studies and programs:
          </p>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <ImpactCard
              title="10,000+ Rural Youth Trained"
              subtitle="Bridging AI education gaps worldwide"
              source="UNESCO Global Framework for Digital Literacy Skills"
              citation="UNESCO (2018). 'A Global Framework of Reference on Digital Literacy Skills'"
              url="https://uis.unesco.org/en/news/global-framework-reference-digital-literacy-skills"
            />

            <ImpactCard
              title="70%+ Community Project Initiation"
              subtitle="Empowering youth to solve local challenges through AI"
              source="Ashoka U & MIT Solve's Social Innovation Learning Models"
              citation="Ashoka U (2020), 'Measuring the Impact of Student-Led Community Projects'"
              urls={[
                { label: "ashokau.org", url: "https://ashokau.org" },
                { label: "solve.mit.edu", url: "https://solve.mit.edu" }
              ]}
            />

            <ImpactCard
              title="50%+ Increase in Digital Confidence"
              subtitle="Enhancing employability and technology adoption"
              source="World Bank Digital Skills Development Report (2023)"
              citation="World Bank (2023), 'Skills4Dev: Digital Skills for Development'"
              url="https://thedocs.worldbank.org/en/doc/bb8df6fa28c514bf846d1ddc2cbef2a1-0140022023/related/December-2023-Digital-Skills-Skills4Dev.pdf"
            />

            <ImpactCard
              title="100+ AI Innovations Developed"
              subtitle="Localized AI solutions improving rural livelihoods"
              source="FAO + ITU Report on AI for Agriculture and Local Innovations"
              citation="FAO & ITU (2022), 'AI and Big Data for Smart Farming'"
              urls={[
                { label: "fao.org", url: "https://www.fao.org" },
                { label: "itu.int", url: "https://www.itu.int" }
              ]}
            />

            <ImpactCard
              title="75% Awareness of Sustainable AI Use"
              subtitle="Promoting green and ethical AI practices"
              source="United Nations SDG 9 + UNESCO Digital Sustainability Initiatives"
              citation="UNESCO (2021), 'Steering AI and Advanced ICTs for Knowledge Societies'"
              url="https://unesdoc.unesco.org/ark:/48223/pf0000377072"
            />

            <ImpactCard
              title="20+ Villages Transformed Across Continents"
              subtitle="AI used in water, agriculture, education, and health improvements"
              source="Microsoft's AI for Good + UNICEF AI4D Pilot Programs"
              citation="UNICEF + ITU (2020), 'AI and Frontier Technologies for Children'"
              urls={[
                { label: "unicef.org", url: "https://www.unicef.org/innovation/AI" },
                { label: "ai4d.ai", url: "https://ai4d.ai" }
              ]}
            />

            <ImpactCard
              title="95% Positive Community Feedback"
              subtitle="Strong local trust and sustained engagement"
              source="UNDP Rural Education Pilots + World Bank Monitoring Reports"
              citation="UNDP (2022), 'Community-based Digital Inclusion in Rural Settings'"
              url="https://www.undp.org"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface UrlLink {
  label: string;
  url: string;
}

interface ImpactCardProps {
  title: string;
  subtitle: string;
  source: string;
  citation: string;
  url?: string;
  urls?: UrlLink[];
}

const ImpactCard = ({ title, subtitle, source, citation, url, urls }: ImpactCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <h3 className="font-['Poppins'] font-bold text-2xl text-[#3B3D87] mb-2">{title}</h3>
    <p className="font-['Poppins'] font-normal text-black mb-4">{subtitle}</p>
    <div className="text-sm text-gray-500">
      <p className="mb-1">{source}</p>
      <p className="mb-2">{citation}</p>
      <div className="flex flex-wrap gap-3">
        {url && (
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B3D87] hover:text-opacity-80 underline"
          >
            {new URL(url).hostname}
          </a>
        )}
        {urls && urls.map((link, index) => (
          <React.Fragment key={link.url}>
            <a 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B3D87] hover:text-opacity-80 underline"
            >
              {link.label}
            </a>
            {index < urls.length - 1 && <span className="text-gray-400">|</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default WhatWeDo;