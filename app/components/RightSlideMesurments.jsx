'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import {  closeSizeChart, openSizeChart } from "../../redux/cart/openCartSlice";
import Image from 'next/image';
import measure from "../../public/assets/measure.avif";

export default function RightSlideMesurments() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.openCart.sizeSlider);
  const [unit, setUnit] = useState('cm');

  const convert = (value) => {
    const [min, max] = value.split('-').map(parseFloat);
    if (unit === 'inch') {
      return `${(min / 2.54).toFixed(1)}-${(max / 2.54).toFixed(1)}"`;
    }
    return `${min}-${max} cm`;
  };

  const convertSingle = (value) => {
    const v = parseFloat(value);
    return unit === 'inch' ? `${(v / 2.54).toFixed(1)}"` : `${v} cm`;
  };

  const measurements = [
    { size: 'XS', bust: '26-32', waist: '22-26', hip: '28-34', length: '34' },
    { size: 'S', bust: '27.6-34.6', waist: '24-27.6', hip: '29.9-35.4', length: '35' },
    { size: 'M', bust: '29.1-36.2', waist: '25.6-29.1', hip: '31.5-37', length: '35.6' },
    { size: 'L', bust: '30.7-37.8', waist: '27.2-30.7', hip: '33.1-38.6', length: '36.2' },
    { size: 'XL', bust: '32.3-39.4', waist: '28.7-32.3', hip: '34.6-40.2', length: '36.8' },
    { size: 'XXL', bust: '34-41', waist: '30.3-33.8', hip: '36-42', length: '37.4' },
  ];

  return (
    <Dialog open={isCartOpen} onClose={() => dispatch(closeSizeChart(false))} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out bg-white rounded-l-2xl shadow-lg">
              <div className="flex h-full flex-col overflow-y-scroll p-6 bg-gradient-to-b from-pink-50 to-white">
                <div className="flex justify-between items-center border-b pb-4">
                  <DialogTitle className="text-xl font-bold text-pink-600">Size Guide</DialogTitle>
                  <button
                    onClick={() => dispatch(closeSizeChart())}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-4 flex justify-end ">
                  <button
                    onClick={() => setUnit(unit === 'cm' ? 'inch' : 'cm')}
                    className="bg-pink-500 text-white px-4 py-1 rounded shadow hover:bg-pink-600"
                  >
                    Switch to {unit === 'cm' ? 'inch' : 'cm'}
                  </button>
                </div>

                <div className="mt-6 overflow-x-auto ">
                  <table className="min-w-full text-center border-collapse border border-pink-300 rounded-md shadow">
                    <thead>
                      <tr className="bg-pink-200 text-pink-900">
                        <th className="px-4 py-2 border">Size</th>
                        <th className="px-4 py-2 border">Bust ({unit})</th>
                        <th className="px-4 py-2 border">Waist ({unit})</th>
                        <th className="px-4 py-2 border">Hip ({unit})</th>
                        <th className="px-4 py-2 border">Length ({unit})</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {measurements.map((item) => (
                        <tr key={item.size} className="even:bg-pink-50">
                          <td className="px-4 py-2 border font-medium text-pink-700">{item.size}</td>
                          <td className="px-4 py-2 border">{convert(item.bust)}</td>
                          <td className="px-4 py-2 border">{convert(item.waist)}</td>
                          <td className="px-4 py-2 border">{convert(item.hip)}</td>
                          <td className="px-4 py-2 border">{convertSingle(item.length)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-pink-700 mb-2">How to Measure</h3>
                 
                  {/* <div className="mt-4">
                    <Image src={measure} alt="Measurement Guide" objectFit='' width={200} />
                  </div> */}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}