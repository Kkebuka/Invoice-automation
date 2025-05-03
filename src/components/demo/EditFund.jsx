import React, { useState, useEffect } from "react";

const EditFund = ({ fundData, setShowEditTab, setDataSet }) => {
  const [formData, setFormData] = useState(fundData);

  useEffect(() => {
    setFormData(fundData);
  }, [fundData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setDataSet((prev) =>
      prev.map((item) => (item.id === fundData.id ? { ...formData } : item))
    );
    setShowEditTab(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Fund</h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount (₦)"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="dollar"
          value={formData.dollar}
          onChange={handleChange}
          placeholder="Amount ($)"
          className="w-full mb-3 p-2 border rounded"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setShowEditTab(false)}
            className="text-red-500 border border-red-500 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFund;
