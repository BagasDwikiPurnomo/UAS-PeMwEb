import React from "react";
import { formatRupiah } from "../FormatHarga"; // Sesuaikan path sesuai dengan lokasi file utils.js atau helpers.js

const BarangCard = ({ barang, onSelect }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-1">
      <h3 className="text-xl font-bold mb-2">{barang.nama}</h3>
      <p className="text-gray-700 mb-2">Harga: {formatRupiah(barang.harga)}</p>
      <p className="text-gray-700 mb-2">Kategori: {barang.kategori}</p>
      <button
        onClick={() => onSelect(barang.nama)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tambah
      </button>
    </div>
  );
};

export default BarangCard;
