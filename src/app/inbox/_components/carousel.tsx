"use client";

import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface CarouselProps {
  title: string;
  items: {
    id: number;
    title: string;
    description: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 font-leaguespartan">{title}</h2>
      <div className="relative">
        {/* Flechas para navegar */}
        <button
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-2 rounded-full z-10"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-2 rounded-full z-10"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
        {/* Carrusel */}
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-hidden p-2"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-BlackCalido rounded-lg p-4 flex-shrink-0 w-[200px] h-[300px] flex flex-col justify-between"
            >
              <div className="w-full h-[150px] bg-GrayCalido rounded-lg m-0"></div>
              <h3 className="text-sm font-bold break-words whitespace-normal m-0">{item.title}</h3>
              <p className="text-xs text-GrayCalido truncate m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
