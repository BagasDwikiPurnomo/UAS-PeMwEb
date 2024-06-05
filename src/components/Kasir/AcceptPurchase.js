import React, { useState, useEffect } from 'react';
import { formatRupiah } from "../FormatHarga"; 

const AcceptPurchaseForm = ({ purchase, onSubmit, onCancel }) => {
  const { namaBarang, quantity, harga } = purchase;
  const [nominal, setNominal] = useState(harga * quantity); // Inisialisasi dengan harga * quantity
  const [voucher, setVoucher] = useState('');

  // Perbarui nilai nominal ketika harga atau quantity berubah
  useEffect(() => {
    setNominal(harga * quantity);
  }, [harga, quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...purchase, status: "Validated", nominal, voucher }); // Update status menjadi "validate" dan kirim data ke onSubmit
    setNominal(harga * quantity); // Reset nilai nominal
    setVoucher('');
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Form Pembayaran</h2>
      <h2 className="text-2px font text-gray-500 mb-4">* Pastikan Stok sesuai dengan barang di gudang</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nama Barang:</label>
          <input
            type="text"
            value={namaBarang}
            readOnly
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Quantity:</label>
          <input
            type="number"
            value={quantity}
            readOnly
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nominal Pembayaran:</label>
          <input
            type="text"
            value={formatRupiah(nominal)} // Tampilkan nilai nominal dengan format Rupiah
            readOnly
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Voucher (jika ada):</label>
          <input
            type="text"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcceptPurchaseForm;
