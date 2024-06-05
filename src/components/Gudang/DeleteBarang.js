// DeleteBarang.js
import React from "react";

const DeleteBarang = ({ barang, deleteBarang, onCancel }) => {
  const handleDelete = () => {
    deleteBarang(barang.id);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Hapus Data Barang</h2>
      <p className="mb-4">Apakah Anda yakin ingin menghapus barang {barang.nama}?</p>
      <div className="flex justify-between">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Hapus
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default DeleteBarang;
