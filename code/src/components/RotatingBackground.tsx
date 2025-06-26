'use client';

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from 'next/image';

interface RotatingBackgroundProps {
  images: StaticImageData[];
  interval?: number;
}

const RotatingBackground = ({ images, interval = 5000 }: RotatingBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Background ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          fill
          priority
        />
      ))}
    </div>
  );
};

export default RotatingBackground;