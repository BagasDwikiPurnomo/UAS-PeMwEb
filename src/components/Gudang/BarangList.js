import React from 'react';

const BarangList = ({ barangList, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Daftar Barang</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nama Barang</th>
            <th className="py-2 px-4 border-b">Jumlah</th>
            <th className="py-2 px-4 border-b">Harga</th>
            <th className="py-2 px-4 border-b">Kategori</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {barangList.map((barang) => (
            <tr key={barang.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{barang.id}</td>
              <td className="py-2 px-4 border-b">{barang.nama}</td>
              <td className="py-2 px-4 border-b">{barang.jumlah}</td>
              <td className="py-2 px-4 border-b">{barang.harga}</td>
              <td className="py-2 px-4 border-b">{barang.kategori}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(barang)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(barang.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarangList;
