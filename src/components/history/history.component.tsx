import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import { message } from "antd";
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
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [historyTransaction, setHistoryTransaction] = useState([]);
  const [filterData, setFilterData] = useState({
    offset: 0,
    limit: 5,
  });
  const [showMore, setShowMore] = useState<boolean>(false);

  const API_URL = "https://take-home-test-api.nutech-integrasi.app";

  const showMessage = (type: "success" | "error", content: string) => {
    message.open({
      type,
      content,
    });
  };

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
        showMessage("success", res.data?.message);
        const dataHistoryTransaction = res.data?.data?.records.map(
          (data: TransactionData) => ({
            ...data,
            created_on: formatDate(data.created_on),
          })
        );
        setHistoryTransaction(dataHistoryTransaction);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        showMessage("error", error?.response?.data?.message);
      });
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="container mx-auto px-20">
      {isLoading && <LoadingLottie />}
      <h5 className="text-md font-semibold my-4">Semua Transaksi</h5>
      <div
        className={`border border-gray-200 overflow-y-auto shadow ${
          showMore ? "max-h-[400px]" : "min-h-full"
        } rounded-[4px] py-2 px-4`}
      >
        {historyTransaction.map((data: TransactionData) => (
          <div className="flex justify-between my-4">
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
