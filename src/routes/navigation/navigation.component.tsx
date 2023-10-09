import { Fragment, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AccountBalance from "../../components/account-balance/account-balance.component";

const Navigation = () => {
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();

  const isAccountPage =
    location.pathname === "/account" || location.pathname === "/edit-profile";

  return (
    <Fragment>
      <nav className="w-full bg-white my-4 border-b">
        <div className="justify-between md:items-center md:flex container mx-auto px-20">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link className="flex gap-2" to="/">
                <img
                  src={require("../../assets/logo/Logo.png")}
                  alt="logo.png"
                />
                <h2 className="text-2xl font-bold">SIMS PPOB</h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-20 md:space-y-0 font-semibold">
                <li className="text-gray-600 hover:text-red-600">
                  <Link to="/topup">Top Up</Link>
                </li>
                <li className="text-gray-600 hover:text-red-600">
                  <Link to="/history">Transaction</Link>
                </li>
                <li className="text-gray-600 hover:text-red-600">
                  <Link to="/account">Akun</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {!isAccountPage && <AccountBalance />}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
