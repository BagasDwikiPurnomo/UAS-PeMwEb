import React, { useState /*useEffect*/ } from "react";
import BarangCard from "./BarangCard";
import AddPlayer from "./AddPlayer";
import PaymentForm from './PaymentForm'; 

const PlayerList = ({ purchases, addPurchase, user, gudangData }) => {
  const [selectedNamaBarang, setSelectedNamaBarang] = useState(null);
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false); 
  const [currentPurchase, setCurrentPurchase] = useState(null); 

  const validatedPurchases = purchases.filter(
    (purchase) => purchase.status === "Validated" || purchase.status === "Unvalidated" || purchase.status === "Paid"
  );

  const sedangDivalidatePurchases = purchases.filter(
    (purchase) => purchase.status === "Sedang Divalidate"
  );

  const handleSelectBarang = (namaBarang) => {
    setSelectedNamaBarang(namaBarang);
    setShowAddPlayerForm(true);
  };

  const handlePayment = (purchase) => {
    setCurrentPurchase(purchase);
    setShowPaymentForm(true);
  };

  const closePaymentForm = () => {
    setShowPaymentForm(false);
    setCurrentPurchase(null);
  };

  const handleCloseForm = () => {
    setShowAddPlayerForm(false);
  };

  const handlePaymentSuccess = (paymentData) => {
    // Update the purchase status to "Paid"
    const updatedPurchases = purchases.map((p) =>
      p.id === paymentData.id 
        ? { ...p, status: 'Paid' } // Update the status to "Paid"
        : p
    );
    addPurchase(updatedPurchases); // Update the purchases array
  };

  console.log("PlayerList purchases:", purchases);
  console.log("PlayerList validatedPurchases:", validatedPurchases);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <p className="text-lg font-semibold mb-4">Hai, {user}</p>
      <h2 className="text-2xl font-bold mb-4">Selamat datang di BI Rotan Bintaro!</h2>
      <h2 className="text-lg font mb-2">Silahkan pilih barang dari daftar di bawah ini:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gudangData.map((barang) => (
          <BarangCard key={barang.id} barang={barang} onSelect={handleSelectBarang} />
        ))}
      </div>

      {showAddPlayerForm && (
        <AddPlayer 
          addPurchase={addPurchase} 
          selectedNamaBarang={selectedNamaBarang}
          onClose={handleCloseForm} 
        />
      )}

      {sedangDivalidatePurchases.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-6">Daftar Pembelian</h2>
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
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {validatedPurchases.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{purchase.namaBarang}</td>
                  <td className="py-2 px-4 border-b">{purchase.quantity}</td>
                  <td className="py-2 px-4 border-b">{purchase.status}</td>
                  {purchase.status === 'Validated' && (
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handlePayment(purchase)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Detail
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

  {showPaymentForm && (
    <PaymentForm 
      addPurchase={addPurchase}
      purchase={currentPurchase} 
      onClose={closePaymentForm} 
      onPaymentSuccess={handlePaymentSuccess} 
      status={currentPurchase.status} // Menambahkan properti status ke PaymentForm
    />
  )}

    </div>
  );
};

export default PlayerList;