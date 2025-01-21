"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";

const TemplateCard = ({ src, index }: { src: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative transition-transform duration-300 ease-in-out mx-3"
      style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={`Resume template ${index + 1}`}
        width={300}
        height={400}
        className="rounded-lg shadow-lg"
        loading="lazy"
      />
      {isHovered && (
        <Button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-blue-500 hover:bg-blue-600 z-10">
          Use Template
        </Button>
      )}
    </div>
  );
};

const TemplatesSection = () => {
  const templates = [
    "/template-1.png",
    "/template-2.png",
    "/template-3.png",
    "/template-4.png",
    "/template-5.png",
    "/template-7.png",
    "/template-8.png",
    "/template-10.png",
    "/template-11.png",
    "/template-12.png",
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Professional Templates</h2>
        <p className="text-lg text-gray-600 mb-8">
          Each resume template is designed to follow the exact rules you need to
          get hired faster. Use our resume templates and get free access to 18
          more career tools!
        </p>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 mb-12">
          Create My Resume
        </Button>
      </div>

      <div className="relative">
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="overflow-hidden"
        >
          {templates.map((template, index) => (
            <TemplateCard key={index} src={template} index={index} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TemplatesSection;