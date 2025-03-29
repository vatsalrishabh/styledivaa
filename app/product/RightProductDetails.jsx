import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addItem } from "../../redux/cart/cartSlice";
import { IoChevronForward } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import BeforeLogin from "../components/LoginUser/BeforeLogin";
import RegisterUser from "../components/LoginUser/RegisterUser";
import { jwtDecode } from "jwt-decode";

const RightProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  const [selectedSize, setSelectedSize] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Open login modal
  const openLoginModal = () => {
    setShowLogin(true);
    setOpenModal(true);
  };

  // Open register modal
  const openRegisterModal = () => {
    setShowLogin(false);
    setOpenModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setOpenModal(false);
  };

  const isInCart = cart.some((item) => item.id === product?.id);

  const handleCartAction = () => {
    let storedUser = localStorage.getItem("userDetails");

    if (!storedUser) {
      openLoginModal();
      return;
    }

    storedUser = JSON.parse(storedUser);
    const decodedToken = jwtDecode(storedUser.token);
    console.log("Decoded Token:", decodedToken);

    if (isInCart) {
      router.push("/checkout");
    } else {
      if (!selectedSize) return;
      dispatch(addItem({ ...product, size: selectedSize, quantity: 1 }));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">{product?.name}</h1>
        <h2 className="text-lg text-gray-600 mb-2">{product?.print}</h2>
        <div className="flex items-center text-sm text-gray-700">
          <span className="mr-1">{product?.rating}</span>
          <FaStar className="text-yellow-500 mr-1" />
          <span>({product?.reviews}K reviews)</span>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <h1 className="text-xl font-bold text-gray-900 mr-2">₹{product?.price}</h1>
        <h1 className="text-base text-gray-500 line-through mr-2">MRP ₹{product?.mrp}</h1>
        <h1 className="text-pink-500 font-semibold">({product?.discount}% OFF)</h1>
      </div>

      <div className="text-green-600 mb-4">
        {product?.inclusiveOfTaxes ? "Inclusive of all taxes" : "Taxes not included"}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Select Size</span>
          <IoChevronForward className="text-gray-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(product?.stock || {}).map(([size, quantity]) => (
            <div
              key={size}
              onClick={() => quantity > 0 && setSelectedSize(size)}
              className={`rounded-full border-2 p-2 text-center w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 
                ${
                  quantity > 0
                    ? selectedSize === size
                      ? "border-pink-600 bg-pink-100 text-pink-600" // Selected size
                      : "border-pink-500 text-pink-500 hover:bg-pink-100 hover:border-pink-600 hover:text-pink-600" // Available size
                    : "border-gray-300 text-gray-300 cursor-not-allowed opacity-50" // Out of stock
                }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleCartAction}
        disabled={!selectedSize} // Disable button if no size selected
        className={`w-full py-3 rounded-lg transition text-white ${
          selectedSize
            ? "bg-pink-500 hover:bg-pink-700 cursor-pointer" // Active button
            : "bg-gray-300 cursor-not-allowed" // Disabled button
        }`}
      >
        {isInCart ? "Go to Checkout" : "Add to Cart"}
      </button>

      {/* Full-Screen Modal for Login/Register */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
            >
              ✖
            </button>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center">
                🚫 You are not logged in!
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Please log in to continue shopping.
              </p>
            </div>

            {/* Toggle between Login and Register */}
            {showLogin ? <BeforeLogin /> : <RegisterUser />}

            {/* Toggle Button Below */}
            <div className="mt-4 text-sm text-gray-600">
              {showLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-pink-600 font-semibold underline"
                  >
                    Register Now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-blue-600 font-semibold underline"
                  >
                    Login Here
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightProductDetails;
