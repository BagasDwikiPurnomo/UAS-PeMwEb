import React, { useState } from 'react';
import { formatRupiah } from '../FormatHarga'; 

const PaymentForm = ({ purchase, onClose, onPaymentSuccess, addPurchase, status }) => {
  const [paymentMethod, setPaymentMethod] = useState('card'); 
  const [nominal, setNominal] = useState(purchase.harga * purchase.quantity); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Gather payment information
    const paymentData = {
      namaBarang: purchase.namaBarang,
      hargaBarang: purchase.harga,
      quantity: purchase.quantity,
      nominal: parseInt(nominal, 10) || 0,
      paymentMethod,
      id: purchase.id // Assuming purchase has an 'id' property
    };
  
    // Simulate successful payment (replace with your actual payment logic)
    onPaymentSuccess(paymentData); // Call the function passed from PlayerList
  
    onClose();
  }
  // Function to handle changes in the nominal input field
  const handleNominalChange = (e) => {
    const newNominal = parseInt(e.target.value, 10) || 0; 
    setNominal(newNominal); 
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/2 max-w-md"> 
        <h2 className="text-2xl font-bold mb-4">Payment Form</h2>   
        <form onSubmit={handleSubmit}>
          {/* Payment form fields */}
          <div className="mb-4">
            <label htmlFor="namaBarang" className="block text-gray-700 font-bold mb-2">
              Nama Barang:
            </label>
            <input
              type="text" 
              id="namaBarang"
              readOnly
              value={purchase.namaBarang}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
              Quantity:
            </label>
            <input
              type="text" 
              id="quantity"
              readOnly
              value={purchase.quantity}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Price:
            </label>
            <input
              type="text"
              id="price"
              readOnly
              value={formatRupiah(purchase.harga)} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-gray-700 font-bold mb-2">
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="card">Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="cash">Cash</option> 
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="nominal" className="block text-gray-700 font-bold mb-2">
              Nominal:
            </label>
            <p className="text-gray-600 text-sm mt-1">{formatRupiah(nominal)}</p> 
            <input
              type="number" 
              id="nominal"
              value={nominal}
              onChange={handleNominalChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;