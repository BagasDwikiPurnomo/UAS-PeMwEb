import React, { useState } from 'react';

const EditBarang = ({ barang, updateBarang, onCancel }) => {
  const [nama, setNama] = useState(barang.nama);
  const [jumlah, setJumlah] = useState(barang.jumlah);
  const [harga, setHarga] = useState(barang.harga);
  const [kategori, setKategori] = useState(barang.kategori);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBarang({
      id: barang.id,
      nama,
      jumlah,
      harga,
      kategori,
    });
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Barang</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nama Barang:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Jumlah:</label>
          <input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Harga:</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Kategori:</label>
          <input
            type="text"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBarang;
