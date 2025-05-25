const Hero = () => {
  return (
    <section className="w-full bg-[#f4d1d1] border-y-2 border-black overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-[70vh]">
          {/* Text side */}
          <div className="w-full md:w-1/2 px-4 py-16 md:py-24 flex flex-col justify-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#7b3737] leading-tight mb-8">
              Who We Are
            </h1>
            <p className="text-[#5c3636] text-lg md:text-xl leading-relaxed mb-4">
              Dear Asian Youth (DAY) is an international non-profit organization that is
              dedicated to uplift and empower young Asians. Through digital media,
              grassroots initiatives and leadership programs, we advocate for equity,
              intersectional solidarity, and social change.
            </p>
            <p className="text-[#5c3636] text-lg md:text-xl leading-relaxed">
              At its core, our mission is to amplify underrepresented voices. We recognize
              that Asian identity isn't one-size-fits-all—it's complex, diverse, and deeply
              intersectional. That's why we're here: to share our stories, challenge global
              narratives, and create space for every experience.
            </p>
          </div>
          
          {/* Image side */}
          <div className="w-full md:w-1/2 bg-cover bg-center relative overflow-hidden border-l-2 border-black">
            <div 
              className="w-full h-full absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: "url('https://images.pexels.com/photos/8108359/pexels-photo-8108359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                opacity: 0.9
              }}
            ></div>
            <div className="absolute inset-0 bg-[#7b3737] bg-opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;