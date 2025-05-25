import worldMap from '../assets/world map.png';

const WorldMap = () => {
  return (
    <div className="w-full h-full">
      <img 
        src={worldMap} 
        alt="World Map" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default WorldMap; 