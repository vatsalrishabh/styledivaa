import React from 'react';
import BreadCrumbs from '@/app/components/BreadCrumbs';
import LeftImgProduct from '../LeftImgProduct';
import RightProductDetails from '../RightProductDetails';
import Navbar from '@/app/components/Navbar';

const Page = () => {
  return (

    <>
    <Navbar/>

    <div className='w-full'>
      <div className="px-4 pt-4">
        <BreadCrumbs one="Home" oneLink="/" two="Product" twoLink="/product" />
      </div>

      <div className='p-4 md:p-10'>
        <div className="left-right-container grid lg:grid-cols-2 gap-4">
          <div className="left order-2 lg:order-1"> {/* Order changes for large screens */}
            <LeftImgProduct />
          </div>
          <div className="right order-1 lg:order-2"> {/* Order changes for large screens */}
            <RightProductDetails />
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Page;
