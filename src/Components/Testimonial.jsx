import React, { useEffect, useRef } from 'react';

const testimonials = [
  { id: 1, name: "Rohit Patel", location: "Ahmedabad", text: "They handled everything from start to finish with incredible care and precision. I didn’t have to worry about a single document, and my visa arrived in just two weeks!", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
  { id: 2, name: "Pooja Verma", location: "New Delhi", text: "Clear guidance and honest advice from Amratpal A Vision helped me get my Canada spouse open work permit approved without stress.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: 3, name: "Kunal Shah", location: "Pune", text: "I received proper documentation support and embassy guidance from Amratpal A Vision, and my Germany work visa was approved successfully.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { id: 4, name: "Mohammed Irfan", location: "Bengaluru", text: "Applied for a UK visitor visa through Amratpal A Vision and received approval smoothly with full transparency.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" }
];

const Testimonial = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;
        
        // If we are at the end, jump back to the start, otherwise slide to next
        const isAtEnd = scrollLeft + offsetWidth >= scrollWidth - 10;
        const nextScrollPosition = isAtEnd ? 0 : scrollLeft + offsetWidth;

        scrollRef.current.scrollTo({
          left: nextScrollPosition,
          behavior: 'smooth',
        });
      }
    }, 7000); // 7 Seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent py-2 ">
      <div className="max-w-6xl mx-auto">
        
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {testimonials.map((item) => (
            <div 
              key={item.id} 
             className="min-w-full md:min-w-[28rem] lg:min-w-[24rem] xl:min-w-[22rem] snap-center"
            >
              <div className="relative bg-white rounded-[2rem] p-5 xl:p-6 2xl:p-7 shadow-lg h-full flex flex-col justify-between overflow-hidden border border-gray-400">
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4 text-yellow-400 text-xl">
                    ★★★★★
                  </div>
                  <p className="text-gray-800 font-manrope text-md xl:text-xl 2xl:text-2xl font-medium leading-relaxed mb-4">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-14 h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 rounded-full border-2 font-manrope border-gray-100 object-cover" 
                  />
                  <div>
                    <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold font-manrope text-gray-900 leading-tight">{item.name}</h3>
                    <p className="text-gray-500 font-manrope text-sm xl:text-base 2xl:text-lg">{item.location}</p>
                  </div>
                </div>

                {/* Decorative background shape */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-100 rounded-full -z-0" />
              </div>
            </div>
          ))}
        </div>

        {/* CSS to hide scrollbar */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </div>
    </div>
  );
};

export default Testimonial;