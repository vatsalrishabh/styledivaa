"use client";
import React, { useEffect, useState } from "react";
import { 
  PencilSquareIcon, 
  ShoppingCartIcon, 
  HomeIcon, 
  CreditCardIcon 
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "@/redux/cart/openCartSlice";
import AddressModal from "../components/AddressModal";
import LoginModal from "../components/LoginUser/LoginModal";

const StepOne = ({ gotoNextStep }) => {
  const dispatch = useDispatch();
  const { numOfItems } = useSelector((state) => state.openCart);
  const cartItems = useSelector((state) => state.cart); // List and details of the items in the cart
  const [isOpen, setIsOpen] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState({});
  useEffect(()=>{
    const loadUserDetails = async ()=>{
      const userDetails = localStorage.getItem('userDetails');
      if(userDetails){
        const data = JSON.parse(userDetails);
        setLoggedInUser(data);
      }
    }
    loadUserDetails();
  },[]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCartClick = () => {
    dispatch(toggleCart()); // Toggle the cart open/close
  };



  return (
    <div className="bg-pink-50 h-full w-full flex flex-col md:flex-row justify-between items-start p-6 rounded-lg shadow-lg">
      {/* Left Section - Product & Address Details */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-pink-600 text-2xl font-semibold flex items-center gap-2">
          <ShoppingCartIcon className="h-6 w-6 text-pink-500" />
          Product Details
        </h2>
        <p className="text-gray-600">
          Estimated Delivery by <b>Tuesday, 18th Mar</b>
        </p>

        {/* Product List */}
        {cartItems.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow mt-4 transition transform hover:scale-105">
            <h3 className="text-gray-800 font-semibold">{product.name}</h3>
            <p className="text-gray-700 mt-1 font-bold">₹{product.price}</p>
            <p className="text-green-600 text-sm">All issue easy returns</p>

            <div className="flex justify-between items-center mt-2 text-gray-600">
              <p className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
                Size: <b>{product.size}</b>
              </p>
              <p className="flex items-center gap-2">
                <ShoppingCartIcon className="h-5 w-5 text-gray-500" />
                Qty: <b>{product.quantity}</b>
              </p>
            </div>

            <button 
              className="text-pink-500 mt-2 flex items-center gap-1 hover:text-pink-700 transition" 
              onClick={handleCartClick}
            >
              <PencilSquareIcon className="h-5 w-5" /> EDIT
            </button>
          </div>
        ))}

        {/* Address Section */}
        {
          true?    <div className="hide-when not loggedIn">
          <h3 className="text-gray-800 font-semibold mt-6 flex items-center gap-2">
                <HomeIcon className="h-6 w-6 text-pink-500" />
                Delivery Address
              </h3>
              <p className="text-gray-600">Dimple</p>
              <p className="text-gray-600">
                1556/1 Gurushatha Nilaya, MCC B Block 12th main Near Bhavani floor mill, 
                Davangere, Karnataka - 577004
              </p>
              <p className="text-gray-600">📞 9844998888</p>
      
              <button 
                className="text-pink-500 mt-2 flex items-center gap-1 hover:text-pink-700 transition" 
                onClick={() => setIsOpen(true)}
              >
                <PencilSquareIcon className="h-5 w-5" /> EDIT
              </button>
          </div>:  <LoginModal/>
        }
      </div>


      {/* Right Section - Price Details & Continue */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-pink-600 text-2xl font-semibold flex items-center gap-2">
          <CreditCardIcon className="h-6 w-6 text-pink-500" />
          Price Details ({cartItems.length} Item{cartItems.length !== 1 && "s"})
        </h2>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <p className="flex justify-between text-gray-700">
            <span>Total Product Price</span>
            <span>+ ₹{totalPrice}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between text-gray-800 font-semibold">
            <span>Order Total</span>
            <span>₹{totalPrice}</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Clicking 'Continue' will not deduct any money
          </p>

          <button 
            onClick={gotoNextStep} 
            className="mt-4 w-full bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-700 transition transform hover:scale-105"
          >
            Continue →
          </button>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
};

export default StepOne;
