import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
  import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Donors = () => {

const [Billings, setBillings] = useState([]);

const fetchBillings = () => {
  let token = localStorage.getItem("token");
  axios({
    url: "https://beathaecommerceback-end.onrender.com/api/v1/billing",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const allBillings = response.data;
      setBillings(allBillings);
      toast.success(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
};

useEffect(() => {
  fetchBillings();
}, []);

const handleDeleteBillings = async (id) => {
  if (window.confirm("Are you sure you want to delete?")) {
    let token = localStorage.getItem("token");
    axios({
      url: `https://beathaecommerceback-end.onrender.com/api/v1/billing/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.success("customer deleted successfully");
        console.log(response, "Response");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error, "Error");
      });
  }
};
  
  return (
  
    <div data-aos="zoom-in" className="mt-10">
      <span className="text-3xl font-bold">Donors</span>
      <div className="bg-white p-4 rounded-lg">
        <div className="hidden md:flex shadow-md mt-10">
          <span className="font-bold w-1/4">Firstname</span>
          <span className="font-bold w-1/4">Lastnae</span>
          <span className="font-bold w-1/4">Email</span>
          <span className="font-bold w-1/4">Postal code</span>
          <span className="font-bold w-1/4">City</span>
          <span className="font-bold w-1/4">Action</span>
        </div>
        <div className="md:hidden flex flex-col">
          {Billings.map((billings) => (
            <div
              className="border border-gray-300 rounded-lg p-4 mb-4"
              key={billings._id}
            >
              <div className="flex justify-between mb-2">
                <span className="font-bold">Email:</span>
                <span>{billings.email}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Country:</span>
                <span>{billings.country}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Street:</span>
                <span>{billings.street}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">State:</span>
                <span>{billings.state}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Postcode:</span>
                <span>{billings.postcode}</span>
              </div>
              <div className="flex justify-end">
                <FaEdit
                  className="text-2xl text-gray-900 mr-2"
                  style={{ cursor: "pointer" }}
                />
                <MdDeleteOutline
                  onClick={() => handleDeleteBillings(billings._id)}
                  className="text-2xl text-red-500"
                  style={{ cursor: "pointer" }}
                />
                <ToastContainer />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-col">
          {Billings.map((billings) => (
            <div className="flex mt-10" key={billings._id}>
              <span className="w-1/4">{billings.email}</span>
              <span className="w-1/4">{billings.country}</span>
              <span className="w-1/4">{billings.street}</span>
              <span className="w-1/4">{billings.state}</span>
              <span className="w-1/4">{billings.postcode}</span>

              <div className="w-1/4 flex items-center">
                <FaEdit
                  className="text-2xl text-gray-900 mr-2"
                  style={{ cursor: "pointer" }}
                />
                <MdDeleteOutline
                  onClick={() => handleDeleteBillings(billings._id)}
                  className="text-2xl text-red-500"
                  style={{ cursor: "pointer" }}
                />
                <ToastContainer />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Donors
