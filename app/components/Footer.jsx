import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="Footer bg-gray-900 text-gray-300 py-8">
      {/* Top Footer */}
      <div className="topFooter grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-8">
        {/* Column 1 */}
        <div className="col1">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            About Us
          </h1>
          <p className="hover:text-gray-100 transition-all duration-300">
            StyleDivaa provides designer dresses and fashion courses. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            magni delectus error dignissimos.
          </p>
        </div>

        {/* Column 2 */}
        <div className="col2">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            Services
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Designer Dresses
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Fashion Courses
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Custom Tailoring
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Styling Tips
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="col3">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            Quick Links
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Home
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              About Us
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              FAQs
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="col4">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            Follow Us
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Facebook
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Instagram
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Twitter
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              Pinterest
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bottomFooter flex flex-col lg:flex-row items-center justify-between mt-8 border-t border-gray-700 pt-4 px-8">
        <div className="bottomFooter-Left text-gray-400">
          StyleDivaa is your one-stop destination for style and elegance.
        </div>
        <div className="bottomFooter-Right text-gray-400 mt-4 lg:mt-0">
          © {year} StyleDivaa | All Rights Reserved | Powered by{" "}
          <span className="text-brightPink hover:text-lightPink transition-all duration-300 cursor-pointer">
            NebulaNet
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
