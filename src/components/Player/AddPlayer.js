
import { useState, useEffect } from "react";

function AddPlayer({ addPurchase, selectedNamaBarang, onClose }) { // Terima prop onClose
  const [namaKonsumen, setNamaKonsumen] = useState("");
  const [namaBarang, setNamaBarang] = useState(selectedNamaBarang || "");
  const [quantity, setQuantity] = useState("");
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (selectedNamaBarang) {
      setNamaBarang(selectedNamaBarang);
    }
  }, [selectedNamaBarang]);

  function handleNamaKonsumenChange(e) {
    setNamaKonsumen(e.target.value);
  }

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }

  function handleAlamatChange(e) {
    setAlamat(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!namaKonsumen || !namaBarang || !quantity || !alamat) {
      setError("Semua kolom harus diisi!");
      return;
    }

    addPurchase({
      namaKonsumen,
      namaBarang,
      alamat,
      quantity,
      status: "Sedang Divalidate",
    });

    setNamaKonsumen("");
    setNamaBarang("");
    setQuantity("");
    setAlamat("");
    setError("");
    setSuccess(true);
    onClose(); // Tutup form setelah submit
  }

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg">

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Data berhasil dikirim!</p>}
        <div className="mb-4">
          <label htmlFor="namaKonsumen" className="block text-sm font-medium text-gray-700">
            Nama:
          </label>
          <input
            type="text"
            id="namaKonsumen"
            value={namaKonsumen}
            onChange={handleNamaKonsumenChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nama pembeli"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="namaBarang" className="block text-sm font-medium text-gray-700">
            Nama Barang:
          </label>
          <input
            type="text"
            id="namaBarang"
            value={namaBarang}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nama barang"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan jumlah barang"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
            Alamat:
          </label>
          <textarea
            id="alamat"
            value={alamat}
            onChange={handleAlamatChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan alamat lengkap"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Kirim
          </button>

          <div className="flex justify-end">
        <button
          onClick={onClose} // Panggil fungsi close ketika tombol diklik
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
        </div>
      </form>
    </div>
  );
}

export default AddPlayer;