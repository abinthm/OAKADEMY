import { useState } from 'react';
import WorldMap from './WorldMap';
import pinIcon from '../assets/pin.svg';

interface RegionData {
  id: string;
  name: string;
  description: string;
  coordinates: { x: number; y: number };
  source: string;
}

const regions: RegionData[] = [
  {
    id: 'india',
    name: 'India',
    description: 'Over 70% of India\'s rural youth lack access to digital literacy programs.',
    coordinates: { x: 71, y: 51 },
    source: 'NSSO, Ministry of Rural Development, Govt. of India'
  },
  {
    id: 'australia',
    name: 'Australia',
    description: 'Only 5% of Indigenous Australians are employed in STEM-related jobs.',
    coordinates: { x: 85, y: 82 },
    source: 'Australian Academy of Science'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    description: 'Less than 40% of public rural schools in Brazil have internet access.',
    coordinates: { x: 32, y: 72 },
    source: 'UNESCO/IBGE'
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    description: '80% of rural students have no structured digital skills training.',
    coordinates: { x: 72, y: 58 },
    source: 'ICTA Sri Lanka, 2022'
  },
  {
    id: 'united-states',
    name: 'United States',
    description: 'Rural U.S. schools are 20% less likely to offer AP Computer Science courses.',
    coordinates: { x: 20, y: 38 },
    source: 'College Board & NCES'
  },
  {
    id: 'uae',
    name: 'UAE',
    description: '43% of low-income migrant students face tech access gaps.',
    coordinates: { x: 63, y: 48 },
    source: 'KHDA Reports, UAE'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    description: 'Rural Thai schools report a 60% shortage in digital learning infrastructure.',
    coordinates: { x: 78, y: 55 },
    source: 'Thai Ministry of Education'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    description: 'Only 22% of youth in rural Kenya have used a computer before secondary school.',
    coordinates: { x: 58, y: 63 },
    source: 'World Bank, Kenya Digital Economy Report'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    description: 'More than 50% of rural learners lack consistent access to digital learning tools.',
    coordinates: { x: 53, y: 81 },
    source: 'Stats SA & UNESCO'
  },
  {
    id: 'philippines',
    name: 'Philippines',
    description: 'Rural schools in the Philippines have a 3:100 computer-to-student ratio.',
    coordinates: { x: 86, y: 57 },
    source: 'Department of Education, Philippines'
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    description: 'Rural digital literacy levels are 35% lower than urban counterparts.',
    coordinates: { x: 83, y: 63 },
    source: 'Kominfo Indonesia, 2022'
  }
];

const WhereWeWork = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(regions[0]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-['Poppins'] font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 text-[#3B3D87] text-center">
          Global Digital Divide
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Exploring the technology access gap across different regions and its impact on rural communities.
        </p>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Map Container */}
          <div className="w-full lg:w-2/3 relative">
            <div className="aspect-[16/9] bg-primary-50 rounded-lg overflow-hidden">
              <div className="relative w-full h-full">
                <WorldMap />
                {regions.map((region) => (
                  <button
                    key={region.id}
                    className="absolute transform -translate-x-1/2 -translate-y-full
                      transition-all duration-300 ease-in-out w-3 h-3"
                    style={{
                      left: `${region.coordinates.x}%`,
                      top: `${region.coordinates.y}%`,
                    }}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    aria-label={`Select ${region.name}`}
                  >
                    <img 
                      src={pinIcon} 
                      alt="" 
                      className={`w-full h-full transition-all duration-300
                        ${hoveredRegion === region.id || selectedRegion?.id === region.id ? 'scale-150' : 'scale-100'}`}
                    />
                    <span className="sr-only">Select {region.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Region Information */}
          <div className="w-full lg:w-1/3">
            {selectedRegion && (
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="font-['Poppins'] font-bold text-2xl text-[#3B3D87] mb-4">
                  {selectedRegion.name}
                </h3>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  {selectedRegion.description}
                </p>
                <p className="text-sm text-gray-500 italic">
                  Source: {selectedRegion.source}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereWeWork; 