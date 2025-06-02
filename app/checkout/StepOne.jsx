"use client";
import React, { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  ShoppingCartIcon,
  HomeIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toggleCart } from "@/redux/cart/openCartSlice";
import AddressModal from "../components/AddressModal"; // this will be having localstorage to store data
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation"; // Correct for Next.js App Router
import SnackBarr from "../components/SnackBarr";

const StepOne = ({ gotoNextStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { numOfItems } = useSelector((state) => state.openCart);
  const cartItems = useSelector((state) => state.cart); // List and details of the items in the cart
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({}); // user details after the localstorage
  const [allAddress, setAllAddress] = useState([]);
     const [snackMessage, setSnackMessage] = useState("");
      const [statusCode, setStatusCode] = useState(null);
      const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => {
    const loadUserDetails = async () => {
      const userDetails = localStorage.getItem("userDetails");
      if (userDetails) {
        const data = JSON.parse(userDetails);
        setLoggedInUser(data);
        // console.log(jwtDecode(data.token));
        setLoggedInUser(jwtDecode(data.token));
      } else {
        // router.push("/home");
      }
    };
    loadUserDetails();
  }, []);

  // console.log(cartItems)
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.post(`/api/users/getAddress`, {
          email: loggedInUser.email,
        });
        setAllAddress(response.data.addresses); // Fix: Extract 'addresses' array
        // console.log(response.data.addresses);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (loggedInUser.email) {
      fetchAddress();
    }
  }, [loggedInUser.email,allAddress]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCartClick = () => {
    dispatch(toggleCart()); // Toggle the cart open/close
  };

  const today = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() + 5); // Add 5 days for estimated delivery

  // Format the date manually
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${
    days[deliveryDate.getDay()]
  }, ${deliveryDate.getDate()} ${months[deliveryDate.getMonth()]}`;

  // creating a final cart with all the details to hit the payment gateway api in next component
  useEffect(() => {
    localStorage.setItem(
      "finalCart",
      JSON.stringify({ loggedInUser, allAddress, cartItems })
    );
    console.log(JSON.parse(localStorage.getItem('finalCart')))
  }, [loggedInUser, allAddress, cartItems]); // Runs whenever any of these change
  // creating a final cart with all the details to hit the payment gateway api in next component

  return (
    <div className="bg-pink-50 h-full w-full flex flex-col md:flex-row justify-between items-start p-6 rounded-lg shadow-lg">
      {/* Left Section - Product & Address Details */}
      <div className="w-full md:w-1/2 pb-4">
        <h2 className="text-pink-600 text-2xl font-semibold flex items-center gap-2">
          <ShoppingCartIcon className="h-6 w-6 text-pink-500" />
          Product Details
        </h2>
        <p className="text-gray-600">
          Estimated Delivery by <b>{formattedDate}</b>
        </p>

        {/* Product List */}
        {cartItems.map((product, index) => (
          <div
            key={index}
            className="bg-white p-4  rounded-lg shadow mt-4 transition transform hover:scale-105"
          >
            <h3 className="text-gray-800 font-semibold">{product.name}</h3>
            <p className="text-gray-700 mt-1 font-bold">₹{product.price}</p>
            <p className="text-green-600 text-sm">All issue easy returns</p>

            <div className="flex justify-between items-center mt-2 text-gray-600">
              <p className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
                Size: <b>{product.size}</b>
              </p>
               <p className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
                Color: <b>{product.color}</b>
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
        {/* User Details Section */}
        <div className="mt-6">
          <h3 className="text-gray-800 font-semibold flex items-center gap-2">
            <HomeIcon className="h-6 w-6 text-pink-500" />
            User Details
          </h3>
{
  loggedInUser&& ( <div className="bg-white p-4 rounded-lg shadow mt-4">
            <p className="text-gray-800 font-bold">{loggedInUser.name}</p>
            <p className="text-gray-600">{loggedInUser.email}</p>
            <p className="text-gray-600">📞 {loggedInUser.mobile}</p>
          </div>) 
}
       
        </div>

        {/* Address Section */}
        {allAddress.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-gray-800 font-semibold flex items-center gap-2">
              <HomeIcon className="h-6 w-6 text-pink-500" />
              Delivery Address
            </h3>

            {allAddress.map((address, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mt-4">
                <p className="text-gray-600 font-bold">
                  {address.streetAddress}
                </p>
                <p className="text-gray-600">
                  {address.roomNumber}, {address.city}, {address.state} -{" "}
                  {address.zipcode}
                </p>
                <p className="text-gray-600">📞 {loggedInUser.mobile}</p>

                <button
                  className="text-pink-500 mt-2 flex items-center gap-1 hover:text-pink-700 transition"
                  onClick={() => setIsOpen(true)}
                >
                  <PencilSquareIcon className="h-5 w-5" /> EDIT
                </button>
              </div>
            ))}
          </div>
        ) : (
          <button
            className="text-pink-500 mt-2 flex items-center gap-1 hover:text-pink-700 transition"
            onClick={() => setIsOpen(true)}
          >
            <PencilSquareIcon className="h-5 w-5" /> Add Shipping Address
          </button>
        )}
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
  onClick={() => {
  if (allAddress.name.length === 0) {
      setSnackMessage("Please add a shipping address!");
      setStatusCode(400);
      setShowSnackBar(true);
      setIsOpen(true)
    } else if (cartItems.length === 0) {
      console.log("the cart is empty")
      alert("Your cart is empty!");
   
    } else {
      gotoNextStep();
    }
  }}
  className={`mt-4 w-full px-6 py-3 rounded transition transform hover:scale-105 
    ${
       allAddress.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-pink-500 text-white hover:bg-pink-700"
    }`}
>
  Continue →
</button>

        </div>
      </div>

      {/* Address Modal */}
      <AddressModal isOpen={isOpen} closeModal={() => setIsOpen(false)} setAllAddress={setAllAddress} loggedInUser={loggedInUser} cartItems={cartItems} />
         {showSnackBar && <SnackBarr message={snackMessage} statusCode={statusCode} showSnackBar={showSnackBar} />}
    </div>
  );
};

export default StepOne;
