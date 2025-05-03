import React, { useState } from "react";

const AddNew = ({ setShowAddTab, setDataSet }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    dollar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setDataSet((prev) => {
      const newData = [...prev, formData];

      return newData.map((item, index) => ({
        ...item,
        id: index,
      }));
    });

    // Clear the form
    setFormData({
      title: "",
      description: "",
      amount: "",
      dollar: "",
    });

    setShowAddTab(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">
          Add New Fund
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="title"
          >
            Fund Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter fund title"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="description"
          >
            Fund Description
          </label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter fund description"
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="amount"
            >
              Fund Amount (NGN)
            </label>
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 100000"
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="dollar"
            >
              Fund Amount ($)
            </label>
            <input
              name="dollar"
              value={formData.dollar}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 200"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setShowAddTab(false)}
            className="text-red-500 font-semibold p-2 rounded-md border border-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700"
          >
            Save Fund
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
