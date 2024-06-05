import React, { useState, useEffect } from 'react';
import AddBarang from './AddBarang';
import EditBarang from './EditBarang';
import DeleteBarang from './DeleteBarang'; // Impor komponen DeleteBarang
import data from "../../data/barang.json";

const GudangManager = ({ gudangData, setGudangData }) => {
  const [barangList, setBarangList] = useState([]);
  const [currentBarang, setCurrentBarang] = useState(null); // State untuk barang yang sedang diedit
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State untuk konfirmasi penghapusan barang

  useEffect(() => {
    if (!gudangData || gudangData.length === 0) {
      console.log("Gudang Data:", gudangData); // Log gudangData
      setBarangList(data.barang);
      setGudangData(data.barang); // Mengatur gudangData dengan data statis dari file JSON
    } else {
      setBarangList(gudangData);
    }
    /* eslint-disable-next-line */
  }, [gudangData]);
  

  // Fungsi untuk menambahkan barang
  const addBarang = (barang) => {
    setBarangList([...barangList, { id: barangList.length + 1, ...barang }]);
    setGudangData([...barangList, { id: barangList.length + 1, ...barang }]);
    setShowAddForm(false);
  };

  // Fungsi untuk memperbarui barang
  const updateBarang = (updatedBarang) => {
    setBarangList(
      barangList.map((barang) =>
        barang.id === updatedBarang.id ? updatedBarang : barang
      )
    );
    setGudangData(
      barangList.map((barang) =>
        barang.id === updatedBarang.id ? updatedBarang : barang
      )
    );
    setShowEditForm(false);
  };

  // Fungsi untuk menghapus barang
  const deleteBarang = (id) => {
    setBarangList(barangList.filter((barang) => barang.id !== id));
    setGudangData(barangList.filter((barang) => barang.id !== id));
    setShowDeleteConfirmation(false);
  };

  // Fungsi untuk menampilkan form edit barang
  const handleEditBarang = (barang) => {
    setCurrentBarang(barang);
    setShowEditForm(true);
  };

  // Fungsi untuk menampilkan konfirmasi penghapusan barang
  const handleDeleteBarang = (barang) => {
    setCurrentBarang(barang);
    setShowDeleteConfirmation(true);
  };

  // Fungsi untuk membatalkan edit atau penghapusan barang
  const handleCancel = () => {
    setCurrentBarang(null);
    setShowEditForm(false);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manajemen Gudang</h2>
      {showAddForm && <AddBarang addBarang={addBarang} onCancel={() => setShowAddForm(false)} />}
      {showEditForm && (
        <EditBarang
          barang={currentBarang}
          updateBarang={updateBarang}
          onCancel={handleCancel} // Gunakan fungsi handleCancel untuk membatalkan edit
        />
      )}
      {showDeleteConfirmation && (
        <DeleteBarang
          barang={currentBarang}
          deleteBarang={deleteBarang}
          onCancel={handleCancel} // Gunakan fungsi handleCancel untuk membatalkan penghapusan
        />
      )}
      <button
        onClick={() => setShowAddForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        Tambah Barang
      </button>
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
                    onClick={() => handleEditBarang(barang)} // Gunakan fungsi handleEditBarang untuk menampilkan form edit
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBarang(barang)} // Gunakan fungsi handleDeleteBarang untuk menampilkan konfirmasi penghapusan barang
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
    </div>
  );
};

export default GudangManager;
