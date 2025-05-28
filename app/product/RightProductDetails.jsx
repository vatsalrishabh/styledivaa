import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addItem } from "../../redux/cart/cartSlice";
import { IoChevronForward } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import BeforeLogin from "../components/LoginUser/BeforeLogin";
import RegisterUser from "../components/LoginUser/RegisterUser";

const RightProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);

 
const colors = product?.color?.split(",") || [];
console.log(colors);

  const openLoginModal = () => {
    setShowLogin(true);
    setOpenModal(true);
  };

  const openRegisterModal = () => {
    setShowLogin(false);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const isInCart = cart.some((item) => item.id === product?.id);

  const handleCartAction = () => {
    if (!selectedSize || !selectedColor) return;
    dispatch(addItem({ ...product, size: selectedSize, color: selectedColor, quantity: 1 }));
  };

  const handleCheckout = () => {
    dispatch(addItem({ ...product, size: selectedSize || null, color: selectedColor || null, quantity: 1 }));
    router.push("/checkout");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-xl mx-auto">
      {/* Title and rating */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>
        <h2 className="text-lg text-gray-600 mb-2">{product?.print}</h2>
        <div className="flex items-center text-sm text-gray-700">
          <span className="mr-1">{product?.rating}</span>
          <FaStar className="text-yellow-500 mr-1" />
          <span>({product?.reviews}K reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 mr-2">₹{product?.price}</h1>
        <h1 className="text-base text-gray-500 line-through mr-2">MRP ₹{product?.mrp}</h1>
        <h1 className="text-pink-500 font-semibold">({product?.discount}% OFF)</h1>
      </div>

      {/* Tax */}
      <div className="text-green-600 mb-4">
        {product?.inclusiveOfTaxes ? "Inclusive of all taxes" : "Taxes not included"}
      </div>

      {/* Select Size */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">Select Size</span>
          <IoChevronForward className="text-gray-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(product?.stock || {}).map(([size, quantity]) => {
            const isSelected = selectedSize === size;
            const isAvailable = quantity > 0;

            return (
              <div
                key={size}
                onClick={() => isAvailable && setSelectedSize(size)}
                className={`rounded-full border-2 p-2 text-center w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200
                  ${
                    isAvailable
                      ? isSelected
                        ? "border-pink-600 bg-pink-600 text-white font-semibold shadow-md"
                        : "border-pink-400 text-pink-600 hover:bg-pink-100 hover:border-pink-600"
                      : "border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                  }`}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>

      {/* Select Color */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Select Color</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">-- Choose a color --</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleCartAction}
          disabled={!selectedSize || !selectedColor}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            selectedSize && selectedColor
              ? "bg-pink-500 hover:bg-pink-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isInCart ? "Go to Checkout" : "Add to Cart"}
        </button>

        <button
          onClick={handleCheckout}
          className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-700 text-white font-semibold transition"
        >
          Checkout Now
        </button>
      </div>

      {/* Modal */}
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

            {showLogin ? <BeforeLogin /> : <RegisterUser />}

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
