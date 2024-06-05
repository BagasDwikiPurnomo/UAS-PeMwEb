import React, { useState } from 'react';

const AddBarang = ({ addBarang, onCancel }) => {
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [harga, setHarga] = useState('');
  const [kategori, setKategori] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!nama || !jumlah || !harga || !kategori) {
      setError('Semua kolom harus diisi!');
      return;
    }

    // Tambahkan barang
    addBarang({ nama, jumlah, harga, kategori });

    // Reset form dan error setelah penambahan barang berhasil
    setNama('');
    setJumlah('');
    setHarga('');
    setKategori('');
    setError('');
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Tambah Barang</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nama Barang:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Masukkan nama barang"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Jumlah:</label>
          <input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Masukkan jumlah barang"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Harga:</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Masukkan harga barang"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Kategori:</label>
          <input
            type="text"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Masukkan kategori barang"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tambah
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

export default AddBarang;
