import React, { useState, useEffect } from 'react';
import data from "../../data/barang.json";

const SupplierPage = ({ requests = [], gudangData = [], setGudangData, onUpdateRequest, onDeleteRequest }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [barangList, setBarangList] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedRequests, setUpdatedRequests] = useState([]); // State untuk melacak permintaan yang sudah diupdate

  useEffect(() => {
    if (!gudangData || gudangData.length === 0) {
      setBarangList(data.barang);
      setGudangData(data.barang);
    } else {
      setBarangList(gudangData);
    }
  }, [gudangData, setGudangData]);

  const handleUpdateRequest = () => {
    const quantityToUpdate = parseInt(updatedQuantity);

    if (!selectedBarang) {
      setErrorMessage("Please select a barang to update the request.");
      return;
    }

    if (isNaN(quantityToUpdate) || quantityToUpdate < 0) {
      setErrorMessage("Please enter a valid quantity greater than or equal to 0.");
      return;
    }

    // Periksa apakah quantity yang diminta lebih kecil dari atau sama dengan quantity dari permintaan yang dipilih
    if (quantityToUpdate < selectedRequest.quantity) {
      alert(`The quantity to update must be greater than or equal to ${selectedRequest.quantity}.`);
      return;
    }

    const confirmUpdate = window.confirm(`Are you sure you want to update the request for ${selectedRequest.namaBarang} with ${updatedQuantity} units?`);
    setShowUpdateForm(false); // Tutup form update
    if (!confirmUpdate) {
      return;
    }

    const updatedBarangList = barangList.map((barang) =>
      barang.id === selectedBarang.id
        ? { ...barang, jumlah: quantityToUpdate }
        : barang
    );

    setBarangList(updatedBarangList);
    setGudangData(updatedBarangList);

    onUpdateRequest(selectedRequest.id, quantityToUpdate);

    setSuccessMessage(`Stock for ${selectedRequest.namaBarang} has been successfully updated to ${updatedQuantity} units. Send it to Kasir!`);
    setShowUpdateForm(false); // Menutup form update setelah berhasil
    setSelectedRequest(null);
    setUpdatedQuantity('');
    setSelectedBarang(null);
    
    // Tambahkan permintaan yang sudah diupdate ke state updatedRequests
    setUpdatedRequests([...updatedRequests, selectedRequest.id]);
  };

  const handleBarangChange = (e) => {
    const barangId = e.target.value;
    const barang = barangList.find(b => b.id === parseInt(barangId));
    setSelectedBarang(barang);
    setUpdatedQuantity('');
    setErrorMessage(null);
    
  };

  const handleCancel = () => {
    setSelectedRequest(null);
    setSelectedBarang(null);
    setUpdatedQuantity('');
    setSuccessMessage(null);
    setErrorMessage(null);
    setShowUpdateForm(false); // Menutup form update saat membatalkan
  };

  const handleDeleteRequest = (requestId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this request?`);
    if (!confirmDelete) {
      return;
    }

    onDeleteRequest(requestId); // Panggil fungsi onDeleteRequest untuk menghapus permintaan dari backend
  };

  // Fungsi untuk menangani pemilihan permintaan dan mengatur barang yang dipilih
  const handleRequestUpdate = (request) => {
    setSelectedRequest(request);
    setSelectedBarang(null);
    setUpdatedQuantity('');
    setSuccessMessage(null);
    setErrorMessage(null);
    setShowUpdateForm(true);
    
    // Cari barang di gudang yang sesuai dengan namaBarang dari request
    const matchingBarang = barangList.find(barang => barang.nama === request.namaBarang);

    // Jika ditemukan, set selectedBarang
    if (matchingBarang) {
      setSelectedBarang(matchingBarang);
      setUpdatedQuantity(request.quantity); // Set quantity awal 
    } else {
      // Jika tidak ditemukan, berikan pesan error
      setErrorMessage("Barang tidak ditemukan di gudang.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Halaman Supplier</h2>

      {/* Menampilkan pesan sukses di atas tabel data barang di gudang */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong> 
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <h3 className="text-xl font-bold mb-4">Data Barang di Gudang</h3>
      <table className="min-w-full bg-white mb-10 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nama Barang</th>
            <th className="py-2 px-4 border-b">Jumlah</th>
            <th className="py-2 px-4 border-b">Harga</th>
            <th className="py-2 px-4 border-b">Kategori</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Menampilkan tabel permintaan dari kasir */}
      {/* Tampilkan tabel jika ada permintaan yang belum diupdate */}
      {requests.filter(request => !updatedRequests.includes(request.id)).length > 0 && (
        <>
          <h3 className="text-xl font-bold mb-4">Permintaan dari Kasir</h3>
          <table className="min-w-full bg-white mb-10 text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No.</th>
                <th className="py-2 px-4 border-b">Nama Konsumen</th>
                <th className="py-2 px-4 border-b">Nama Barang</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.filter(request => !updatedRequests.includes(request.id)).map((request, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{request.namaKonsumen}</td>
                  <td className="py-2 px-4 border-b">{request.namaBarang}</td>
                  <td className="py-2 px-4 border-b">{request.quantity}</td>
                  <td className="py-2 px-4 border-b">{request.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleRequestUpdate(request)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(request.id)} // Panggil fungsi handleDeleteRequest
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Menampilkan form update permintaan */}
      {showUpdateForm && (
         <div key={showUpdateForm}  className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Update Permintaan</h3>
          <p>Nama Barang: {selectedRequest.namaBarang}</p>
          <p>
            Pilih Barang:
            <select
              value={selectedBarang ? selectedBarang.id : ''}
              onChange={handleBarangChange}
              className="border border-gray-300 rounded-md px-2 py-1 ml-2"
            >
              <option value="" disabled>
                Select Barang
              </option>
              {barangList.map(barang => (
                <option key={barang.id} value={barang.id}>
                  {barang.nama} - {barang.jumlah} units available
                </option>
              ))}
            </select>
          </p>
          <p>
            Quantity:
            <input
              type="number"
              value={updatedQuantity}
              onChange={e => setUpdatedQuantity(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 ml-2"
              min="0"
              max={selectedBarang ? selectedBarang.jumlah : ''}
            />
          </p>
          <button
            onClick={handleUpdateRequest}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SupplierPage;