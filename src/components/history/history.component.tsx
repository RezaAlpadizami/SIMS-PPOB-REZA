import { useEffect, useState } from "react";

import axios from "axios";

import { useAppSelector } from "../../app/hooks";
import { thousandSeparator } from "../../utils/helper";
import LoadingLottie from "../spinner-lottie/spinner-lottie.component";

type TransactionData = {
  created_on: string;
  description: string;
  invoice_number: string;
  total_amount: string;
  transaction_type: string;
};

const HistoryTransaction = () => {
  const [filterData, setFilterData] = useState({
    offset: 0,
    limit: 10,
  });
  const { user } = useAppSelector((state) => state.auth);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [historyTransaction, setHistoryTransaction] = useState([]);

  const API_URL = "https://take-home-test-api.nutech-integrasi.app";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", options);
  };

  useEffect(() => {
    getHistoryTransaction();
    setFilterData({ ...filterData });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHistoryTransaction = async () => {
    setIsLoading(true);
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios
      .get(`${API_URL}/transaction/history`, {
        headers,
        params: { ...filterData },
      })
      .then((res) => {
        setIsLoading(false);
        const dataHistoryTransaction = res.data?.data?.records.map(
          (data: TransactionData) => ({
            ...data,
            created_on: formatDate(data.created_on),
          })
        );
        setHistoryTransaction(dataHistoryTransaction);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log("error", error);
      });
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="container mx-auto px-20">
      {isLoading && <LoadingLottie />}
      <h5 className="text-md font-semibold my-4">Semua Transaksi</h5>
      <div className="border border-gray-200 rounded-[4px] py-2 px-4 shadow">
        <div className={`${showMore ? "h-[315px] overflow-hidden" : "h-full"}`}>
          {historyTransaction.map((data: TransactionData) => (
            <div
              className="flex justify-between my-4"
              key={data.invoice_number}
            >
              <div>
                <p
                  className={`text-lg ${
                    data.transaction_type === "PAYMENT"
                      ? "text-red-500"
                      : "text-green-300"
                  }  font-semibold`}
                >
                  {data.transaction_type === "PAYMENT" ? "-" : "+"} Rp
                  {thousandSeparator(data.total_amount)}
                </p>
                <p className="text-[10px]">{data.created_on}</p>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-xs">{data.transaction_type}</p>
              </div>
            </div>
          ))}
        </div>
        <p
          className="text-center cursor-pointer text-red-500"
          onClick={handleShowMore}
        >
          Show More
        </p>
      </div>
    </div>
  );
};

export default HistoryTransaction;
