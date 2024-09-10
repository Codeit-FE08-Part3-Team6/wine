import React, { ReactNode, useState, useEffect } from "react";

interface CarouselProps {
  children: ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesLength = React.Children.count(children);

  useEffect(() => {
    setCurrentSlide(0);
    console.log(currentSlide);
    console.log(slidesLength);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-1000 ease-out [&>*]:flex [&>*]:h-full [&>*]:w-full [&>*]:flex-shrink-0 [&>*]:items-center [&>*]:justify-center"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children}
      </div>
    </div>
  );
}
