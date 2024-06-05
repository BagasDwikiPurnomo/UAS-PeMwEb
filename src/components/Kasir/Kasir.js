import React, { useState, useEffect, useRef } from 'react';
import AcceptPurchaseForm from './AcceptPurchase';
import data from "../../data/barang.json";
import { formatRupiah } from '../FormatHarga';

const CashierPage = ({ purchases, onAccept, onDecline, gudangData, setGudangData, onRequest }) => {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [barangList, setBarangList] = useState([]);
  const [requestedItems, setRequestedItems] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]); 
  const [declineMessages, setDeclineMessages] = useState([]); 

  const successTimeoutRef = useRef(null); // Ref untuk timeout pesan sukses
  const declineTimeoutRef = useRef(null); // Ref untuk timeout pesan decline

  useEffect(() => {
    if (!gudangData || gudangData.length === 0) {
      console.log("Gudang Data:", gudangData); 
      setBarangList(data.barang);
      setGudangData(data.barang); 
    } else {
      setBarangList(gudangData);
    }
    /* eslint-disable-next-line */
  }, [gudangData]);

  const handleRequest = (purchase) => {
    const { namaBarang, quantity, namaKonsumen } = purchase;

    if (requestedItems.includes(namaBarang)) {
      alert(`You have already requested stock for ${namaBarang}`);
      return;
    }

    if (window.confirm(`Do you really want to request stock for ${namaBarang}?`)) {
      const requestedPurchase = {
        namaKonsumen: namaKonsumen,
        namaBarang: namaBarang,
        quantity: quantity,
        alamat: "", 
        status: "Requested",
      };

      onRequest(requestedPurchase);
      setRequestedItems([...requestedItems, namaBarang]);
    }
  };

  const checkStock = (namaBarang, quantity) => {
    const barang = barangList.find(b => b.nama === namaBarang);
    return barang ? barang.jumlah >= quantity : false;
  };

  const handleAccept = (purchase) => {
    if (window.confirm(`Are you sure you want to validate this order?`)) {
      const updatedPurchase = { ...purchase, status: 'Validated' };
      onAccept(updatedPurchase);
      setSuccessMessages([...successMessages, purchase.id]);
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = setTimeout(() => setSuccessMessages([]), 3000);
    }
  };

  
  const handleUnvalidate = (purchase) => {
    if (window.confirm(`Are you sure you want to unvalidate this order?`)) {
      const updatedPurchase = { ...purchase, status: 'Unvalidated' };
      onDecline(updatedPurchase);
      setDeclineMessages([...declineMessages, purchase.id]);
      clearTimeout(declineTimeoutRef.current);
      declineTimeoutRef.current = setTimeout(() => setDeclineMessages([]), 3000);
    }
  };


  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Halaman Kasir</h2>
      <h3 className="text-xl font-bold mb-4">Daftar Barang Tersedia di Gudang</h3>
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
              <td className="py-2 px-4 border-b">{formatRupiah(barang.harga)}</td>
              <td className="py-2 px-4 border-b">{barang.kategori}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mb-4">Daftar Pembelian</h3>
      <table className="min-w-full bg-white mb-10">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Nama Konsumen</th>
            <th className="py-2 px-4 border-b">Nama Barang</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Alamat</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Filter purchases dengan status BUKAN "Unvalidated" */}
          {purchases && Array.isArray(purchases) && purchases.filter(purchase => purchase.status !== 'Unvalidated' && purchase.status !== 'Validated').map((purchase, index) => (
            <tr key={index} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{purchase.namaKonsumen}</td>
              <td className="py-2 px-4 border-b">{purchase.namaBarang}</td>
              <td className="py-2 px-4 border-b">{purchase.quantity}</td>
              <td className="py-2 px-4 border-b">{purchase.alamat}</td>
              <td className="py-2 px-4 border-b">{purchase.status}</td>
              <td className="py-2 px-4 border-b">
                {checkStock(purchase.namaBarang, purchase.quantity) ? (
                  <>
                    <button
                      onClick={() => setSelectedPurchase(purchase)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                    >
                      Accept
                    </button>
                    {/* Tampilkan tombol Unvalidate jika status sudah "Validated" */}
              
                      <button
                        onClick={() => handleUnvalidate(purchase)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                      >
                        Unvalidate
                      </button>
                  
                  </>
                ) : null}
                {/* Tampilkan tombol Request jika stok tidak cukup */}
                {!checkStock(purchase.namaBarang, purchase.quantity) && (
                  <button
                    onClick={() => handleRequest(purchase)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                  >
                    Request
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tampilkan hint hijau jika ada pembelian yang berhasil di-validate */}
      {successMessages.length > 0 && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success! </strong> 
          <span className="block sm:inline">Data berhasil di-validate.</span>
        </div>
      )}

      {/* Tampilkan hint merah jika ada pembelian yang di-unvalidate */}
      {declineMessages.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Decline! </strong> 
          <span className="block sm:inline">Pesanan ini di-unvalidate.</span>
        </div>
      )}

      {selectedPurchase && (
        <AcceptPurchaseForm
          purchase={{
            ...selectedPurchase,
            harga: barangList.find(b => b.nama === selectedPurchase.namaBarang)?.harga || 0
          }}
          onSubmit={handleAccept}
          onCancel={() => setSelectedPurchase(null)}
          onDecline={handleUnvalidate}
        />
      )}
    </div>
  );
};

export default CashierPage;