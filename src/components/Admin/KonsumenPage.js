import React, { useState, useEffect } from 'react';
import BarangCard from "../Player/BarangCard";
const KonsumenPage = ({ users, gudangData, purchases }) => {
  /* eslint-disable-next-line*/
    const [selectedNamaBarang, setSelectedNamaBarang] = useState(null);
      /* eslint-disable-next-line*/
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false); // State untuk mengontrol visibility form


  const validatedPurchases = purchases.filter(
    (purchase) => purchase.status === "Validated" || purchase.status === "Unvalidated"
  );

  const sedangDivalidatePurchases = purchases.filter(
    (purchase) => purchase.status === "Sedang Divalidate"
  );

  const handleSelectBarang = (namaBarang) => {
    setSelectedNamaBarang(namaBarang);
    setShowAddPlayerForm(true); // Tampilkan form ketika barang dipilih
  };



  useEffect(() => {
    // Update localStorage with the new user data whenever users state changes
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 mt-6">Daftar Barang yg tersedia</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gudangData.map((barang) => (
          <BarangCard key={barang.id} barang={barang} onSelect={handleSelectBarang}/>
        ))}
      </div>
     
      {sedangDivalidatePurchases.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-6">Daftar Pembelian Konsumen</h2>
          <table className="min-w-full bg-white mb-20">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No.</th>
                <th className="py-2 px-4 border-b">Nama Barang</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {sedangDivalidatePurchases.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{purchase.namaBarang}</td>
                  <td className="py-2 px-4 border-b">{purchase.quantity}</td>
                  <td className="py-2 px-4 border-b">{purchase.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {validatedPurchases.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-6">Status Pesanan (Validated & Unvalidated)</h2>
          <table className="min-w-full bg-white mb-20">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No.</th>
                <th className="py-2 px-4 border-b">Nama Barang</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {validatedPurchases.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{purchase.namaBarang}</td>
                  <td className="py-2 px-4 border-b">{purchase.quantity}</td>
                  <td className="py-2 px-4 border-b">{purchase.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default KonsumenPage;
