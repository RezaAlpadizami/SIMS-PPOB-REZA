const HistoryTransaction = () => {
  return (
    <div className="container mx-auto px-20">
      <h5 className="text-md font-semibold my-4">Semua Transaksi</h5>
      <div className="border border-gray-300 rounded-[4px] py-2 px-4">
        <div className="flex justify-between">
          <div>
            <p className="text-lg text-green-300 font-semibold">+ Rp.10.000</p>
            <p className="text-[8px]">17 Agustus 2023 13.10 WIB</p>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-xs">Top Up Saldo</p>
          </div>
        </div>
        <p className="text-center text-red-300">Show More</p>
      </div>
    </div>
  );
};

export default HistoryTransaction;
