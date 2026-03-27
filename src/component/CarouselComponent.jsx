import React from "react";
import { Carousel, Card } from "flowbite-react";

export default function CarouselComponent() {
  return (
    <>
    <Card>
      <div className="h-106 w-150">
        <Carousel pauseOnHover>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
        </Carousel>
      </div>
      </Card>
    </>
  );
}
