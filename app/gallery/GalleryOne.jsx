"use client";
import React, { useState } from "react";
import Image from "next/image";

const GalleryOne = () => {
  const images = [
    "https://m.media-amazon.com/images/I/91C7JjVhvxL._AC_UY1100_.jpg",
    "https://assets.ajio.com/medias/sys_master/root/20230808/za8L/64d170b4eebac147fcb12c5c/-473Wx593H-466431051-navy-MODEL.jpg",
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/1/51f3766DR011543_1.jpg?rnd=20200526195200&tr=w-512",
    "https://m.media-amazon.com/images/I/91C7JjVhvxL._AC_UY1100_.jpg",
    "https://assets.ajio.com/medias/sys_master/root/20230808/za8L/64d170b4eebac147fcb12c5c/-473Wx593H-466431051-navy-MODEL.jpg",
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/1/51f3766DR011543_1.jpg?rnd=20200526195200&tr=w-512",
    "https://m.media-amazon.com/images/I/91C7JjVhvxL._AC_UY1100_.jpg",
    "https://assets.ajio.com/medias/sys_master/root/20230808/za8L/64d170b4eebac147fcb12c5c/-473Wx593H-466431051-navy-MODEL.jpg",
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/1/51f3766DR011543_1.jpg?rnd=20200526195200&tr=w-512",
  ];

  const [modalImage, setModalImage] = useState(null);

  const openModalWithMoreInfo = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="gallery flex justify-center items-center flex-col p-5">
      <h1 className="text-2xl font-bold text-center mb-5">StyleDivaa Gallery</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="photocard relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              width={300}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
            <div
              className="readMore absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white text-center py-2 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => openModalWithMoreInfo(image)}
            >
              Read More
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-5 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-black text-xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>
            <Image
              src={modalImage}
              alt="Modal Image"
              width={500}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryOne;
