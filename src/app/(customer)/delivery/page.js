'use client';

import { useState } from 'react';

export default function DeliveryPage() {
  const [subtotal, setSubtotal] = useState(12000); // you can pass this from cart
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Delivery Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-red-600">🚚 Delivery Information</h2>
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-red-200"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="09-..."
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-red-200"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Delivery Address</label>
            <textarea
              placeholder="Enter your address"
              rows={3}
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-red-200"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-6">🧾 Order Summary</h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} MMK</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee.toLocaleString()} MMK</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-600">{total.toLocaleString()} MMK</span>
              </div>
            </div>
          </div>

          <button
            className="mt-10 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            onClick={() => alert('Proceeding to payment...')}
          >
            Confirm & Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
