// components/Dashboard/Dashboard.js
import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import QRCode from "qrcode.react";

const Dashboard = () => {
  // Placeholder data
  const hospitalInfo = {
    name: "Medical Center",
    address: "123 Health St, Cityville",
    contact: "123-456-7890",
  };

  const [editablePatientInfo, setEditablePatientInfo] = useState(false);

  const medicineOptions = [
    { value: 1, label: "Aspirin", availability: 10, price: 5.99, quantity: 1 },
    { value: 2, label: "Ibuprofen", availability: 5, price: 8.99, quantity: 1 },
    {
      value: 3,
      label: "Antibiotic",
      availability: 15,
      price: 12.99,
      quantity: 1,
    },
    {
      value: 4,
      label: "Paracetamol",
      availability: 20,
      price: 3.99,
      quantity: 1,
    },
    {
      value: 5,
      label: "Cough Syrup",
      availability: 8,
      price: 9.99,
      quantity: 1,
    },
    // ... (additional medicine options)
  ];

  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const { control, handleSubmit } = useForm();

  const handleMedicineSelect = (selectedOptions) => {
    setSelectedMedicines(selectedOptions);
  };

  const handleQuantityChange = (medicineId, quantity) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.map((medicine) =>
        medicine.value === medicineId
          ? { ...medicine, quantity: parseInt(quantity, 10) }
          : medicine
      )
    );
  };

  const handleFrequencyChange = (medicineId, frequency) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.map((medicine) =>
        medicine.value === medicineId
          ? { ...medicine, frequency: parseInt(frequency, 10) }
          : medicine
      )
    );
  };

  const generateQRCodeData = () => {
    return selectedMedicines
      .map(
        (medicine) => `{'id':${medicine.value},'quantity':${medicine.quantity}}`
      )
      .join(",");
  };

  const onSubmitPatientInfo = (data) => {
    console.log("Submitted Patient Info:", data);
    setEditablePatientInfo(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Sidebar */}
      <div className="bg-blue-500 text-white p-4 md:w-1/4 lg:w-1/5">
        <div className="mb-4">
          <img
            className="w-16 h-16 rounded-full mb-2"
            src="path/to/profile-image.jpg"
            alt="Profile"
          />
          <p>Your Name</p>
        </div>
        <button className="bg-white text-blue-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        {/* Hospital Info Section */}
        <div className="w-full p-4 bg-white shadow-md mb-4">
          <h2 className="text-xl font-bold mb-4">Hospital Information</h2>
          <p className="text-gray-600 mb-2">Name: {hospitalInfo.name}</p>
          <p className="text-gray-600 mb-2">Address: {hospitalInfo.address}</p>
          <p className="text-gray-600 mb-2">Contact: {hospitalInfo.contact}</p>
        </div>

        {/* Patient Details Section */}
        <div className="w-full p-4 bg-white shadow-md mb-4">
          <h2 className="flex justify-between items-center text-xl font-bold mb-4">
            Patient Details
            <button
              className="text-blue-500"
              onClick={() => setEditablePatientInfo(!editablePatientInfo)}
            >
              {editablePatientInfo ? "Cancel" : "Edit"}
            </button>
          </h2>
          {editablePatientInfo ? (
            <form onSubmit={handleSubmit(onSubmitPatientInfo)}>
              <div className="mb-4">
                <label
                  htmlFor="patientName"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="patientName"
                  type="text"
                  className="border rounded-md px-3 py-2 w-full"
                  {...control("patientName")}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="patientAge"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Age
                </label>
                <input
                  id="patientAge"
                  type="number"
                  className="border rounded-md px-3 py-2 w-full"
                  {...control("patientAge")}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="patientGender"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Gender
                </label>
                <select
                  id="patientGender"
                  className="border rounded-md px-3 py-2 w-full"
                  {...control("patientGender")}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="patientCondition"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Condition
                </label>
                <input
                  id="patientCondition"
                  type="text"
                  className="border rounded-md px-3 py-2 w-full"
                  {...control("patientCondition")}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">Name: John Doe</p>
              <p className="text-gray-600 mb-2">Age: 30</p>
              <p className="text-gray-600 mb-2">Gender: Male</p>
              <p className="text-gray-600 mb-2">Condition: Stable</p>
            </div>
          )}
        </div>

        {/* Prescribed Medicines Section */}
        <div className="w-full p-4 bg-white shadow-md mb-4">
          <h2 className="text-xl font-bold mb-4">Prescribed Medicines</h2>
          <div className="mb-4">
            <label
              htmlFor="medicineSearch"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Search and Select Medicines
            </label>
            <Select
              id="medicineSearch"
              options={medicineOptions}
              value={selectedMedicines}
              onChange={handleMedicineSelect}
              isSearchable
              isMulti
              getOptionLabel={(option) =>
                `${option.label} - ${option.availability} - ${option.price} INR`
              }
              placeholder="Search and select medicines"
            />
          </div>
          {selectedMedicines.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-2">Prescribed Medicines:</h3>
              {selectedMedicines.map((medicine) => (
                <div key={medicine.value} className="mb-4 border-b pb-4">
                  <p className="text-gray-600 mb-2">ID: {medicine.value}</p>
                  <p className="text-gray-600 mb-2">Name: {medicine.label}</p>
                  <p className="text-gray-600 mb-2">
                    Availability: {medicine.availability}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Price: {medicine.price} INR
                  </p>
                  <div className="flex items-center mb-2">
                    <label
                      htmlFor={`quantity_${medicine.value}`}
                      className="mr-2 text-gray-600"
                    >
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id={`quantity_${medicine.value}`}
                      className="border rounded-md px-3 py-2 focus:outline-none"
                      value={medicine.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(medicine.value, e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor={`frequency_${medicine.value}`}
                      className="mr-2 text-gray-600"
                    >
                      Frequency (times/day):
                    </label>
                    <input
                      type="number"
                      id={`frequency_${medicine.value}`}
                      className="border rounded-md px-3 py-2 focus:outline-none"
                      value={medicine.frequency || 1}
                      onChange={(e) =>
                        handleFrequencyChange(medicine.value, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Code Section */}
      <div className="w-full md:w-1/4 lg:w-1/5 p-4">
        {selectedMedicines.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">QR Code</h2>
            {/* {console.log(selectedMedicines)} */}
            <QRCode value={generateQRCodeData()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
