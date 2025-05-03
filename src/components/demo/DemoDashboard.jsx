import React, { useState } from "react";
import EditableText from "./EditableText";
import {
  FaSearch,
  FaBell,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaGlobe,
  FaCommentAlt,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import demoImg from "../../assets/Demo-img.png";
import AddNew from "./AddNew";
import EditFund from "./EditFund";

const DemoDashboard = () => {
  const [showEditTab, setShowEditTab] = useState(false);
  const [showAddTab, setShowAddTab] = useState(false);
  const [totalAmount, setTotalAmount] = useState("N1,250,000");
  const [text, setText] = useState("Hello Micheal");
  const [dataSet, setDataSet] = useState([
    {
      id: 0,
      title: "Emergency fund",
      description: "Min. 3 months of expenses",
      amount: "₦115,000",
      dollar: "$2,050",
    },
    {
      id: 1,
      title: "Business reserve",
      description: "For bad months",
      amount: "₦210,000",
      dollar: "$1,850",
    },
    {
      id: 2,
      title: "Long term savings",
      description: "Investments",
      amount: "₦15,000",
      dollar: "$1,630",
    },
    {
      id: 3,
      title: "Long term savings",
      description: "Apartment",
      amount: "₦12,500",
      dollar: "$1,500",
    },
    {
      id: 4,
      title: "Emergency fund",
      description: "Health and wellness",
      amount: "₦80,000",
      dollar: "$1,250",
    },
    {
      id: 5,
      title: "Miscellaneous fund",
      description: "Black tax",
      amount: "₦45,000",
      dollar: "$1,150",
    },
  ]);
  const [selectedFund, setSelectedFund] = useState(null);

  // Function to open the Edit modal and set the selected fund
  const handleEdit = (fund) => {
    setSelectedFund(fund);
    setShowEditTab(true);
  };

  return (
    <>
      <div className="bg-black text-white font-sans min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 pt-6 pb-4">
          {/* <h1 className="text-lg font-semibold">Hello John</h1> */}
          <EditableText
            value={text}
            onChange={(val) => setText(val)}
            className="text-lg text-white font-semibold"
          />
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="text-white text-lg">
              <FaSearch />
            </button>
            <div className="relative">
              <button aria-label="Notifications" className="text-white text-lg">
                <FaBell className="text-2xl font-extrabold" />
              </button>
              <span className="absolute -top-1 -right-1 bg-red-600 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </header>

        {/* Portfolio Section */}
        <section className="px-4">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#00247d" }}
          >
            <img
              alt="Blue circular shapes background for portfolio card"
              className="absolute inset-0 w-full h-full object-cover"
              height="140"
              src={demoImg}
              width="400"
            />
            <div className="relative z-10 flex flex-col p-6 space-y-4">
              <div className="text-sm text-blue-400 flex items-center space-x-2">
                <span>Portfolio</span>
                <FaEye className="text-blue-400" />
              </div>
              <div className="flex justify-between">
                <EditableText
                  value={totalAmount}
                  onChange={(val) => setTotalAmount(val)}
                  className="text-white text-2xl font-semibold"
                />
                <div className="flex space-x-3">
                  <button
                    aria-label="Sort ascending"
                    className="border border-white rounded-md w-10 h-10 flex items-center justify-center text-white"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    aria-label="Sort descending"
                    className="border border-white rounded-md w-10 h-10 flex items-center justify-center text-white"
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2 space-x-2">
            <span className="w-8 h-1 rounded-full bg-blue-600"></span>
            <span className="w-8 h-1 rounded-full bg-blue-900"></span>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 px-4 mt-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-white text-base">Sort by</p>
            <button
              aria-label="Sort toggle"
              className="text-white text-base flex items-center space-x-1"
            >
              <span>↑↓</span>
            </button>
          </div>

          <ul className="space-y-4">
            {dataSet.map((fund) => (
              <li
                key={fund.id}
                onClick={() => handleEdit(fund)}
                className="bg-gray-900 bg-opacity-20 rounded-xl p-4 flex justify-between items-center cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-white text-base">
                    {fund.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {fund.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white text-base">
                    {fund.amount}
                  </p>
                  <p className="text-green-600 text-xs mt-1">{fund.dollar}</p>
                </div>
              </li>
            ))}
          </ul>
        </main>

        {/* Add Fund Button */}
        <button
          aria-label="Add new fund"
          onClick={() => setShowAddTab(true)}
          className="fixed bottom-20 right-6 bg-green-700 w-12 h-12 rounded-full flex items-center justify-center text-white text-3xl shadow-lg"
        >
          <FaPlus />
        </button>

        {/* Navigation */}
        <nav className="flex justify-around items-center h-16 border-t border-gray-700 bg-black text-gray-400">
          <button aria-label="Portfolio" className=" text-2xl">
            <FaGlobe />
          </button>
          <button aria-label="Messages" className="text-gray-400 text-2xl">
            <FaCommentAlt />
          </button>
          <button
            aria-label="Settings"
            onClick={() => setDataSet([])}
            className="text-gray-400 text-2xl"
          >
            <FaCog />
          </button>
        </nav>
      </div>

      {showAddTab && (
        <AddNew setDataSet={setDataSet} setShowAddTab={setShowAddTab} />
      )}

      {showEditTab && selectedFund && (
        <EditFund
          fundData={selectedFund}
          setShowEditTab={setShowEditTab}
          setDataSet={setDataSet}
        />
      )}
    </>
  );
};

export default DemoDashboard;
