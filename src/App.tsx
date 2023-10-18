import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Register from "./routes/register/register.component";
import Login from "./routes/login/login.component";
import TopUp from "./components/top-up/top-up.component";
import Payment from "./components/payment/payment.component";
import HistoryTransaction from "./components/history/history.component";
import Account from "./components/account/account.component";
import EditAccount from "./components/edit-account/edit-account.component";
import { ConfigProvider } from "antd";
import RedirectToLogin from "./components/redirect-login/redirect-login";

const App = () => {
  return (
    <>
      <Router>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#e31616",
                algorithm: true,
              },
              Input: {
                colorPrimary: "#7D7C7C",
                algorithm: true,
              },
            },
          }}
        >
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="topup" element={<TopUp />} />
              <Route path="payment" element={<Payment />} />
              <Route path="history" element={<HistoryTransaction />} />
              <Route path="account" element={<Account />} />
              <Route path="edit-profile" element={<EditAccount />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<RedirectToLogin />} />
          </Routes>
        </ConfigProvider>
      </Router>
    </>
  );
};

export default App;
