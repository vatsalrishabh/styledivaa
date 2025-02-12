"use client";

import React from "react";
import Image from "next/image";

const LeftImgProduct = () => {
  const images = [
    "https://m.media-amazon.com/images/I/91C7JjVhvxL._AC_UY1100_.jpg",
    "https://assets.ajio.com/medias/sys_master/root/20230808/za8L/64d170b4eebac147fcb12c5c/-473Wx593H-466431051-navy-MODEL.jpg",
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/1/51f3766DR011543_1.jpg?rnd=20200526195200&tr=w-512",
    "https://m.media-amazon.com/images/I/51oBh8RWBdL._AC_UL1000_.jpg",
  ];

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {images.map((img, index) => (
        <div
          key={index}
          className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={img}
            alt={`Product ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
};

export default LeftImgProduct;
