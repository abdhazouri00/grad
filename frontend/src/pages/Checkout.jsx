import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Checkout = () => {
  const { info, plan, creditToBuy, planTotal, backendUrl, setCredit } =
    useContext(Context);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    billingEmail: "",
    country: "TR",
    city: "IST",
    phoneNumber: "",
    company: "",
  });

  const bigAxios = async (userId) => {
    const response = await axios.put(`${backendUrl}/api/user/updateCredit`, {
      userId,
      amount: creditToBuy,
      increase: true,
    });
    setCredit(response.data.user.credit);
    await axios.put(`${backendUrl}/api/user/updateBillingEmail`, {
      userId,
      email: formData.billingEmail,
    });
    await axios.put(`${backendUrl}/api/user/updateCountry`, {
      userId,
      country: formData.country,
    });
    await axios.put(`${backendUrl}/api/user/updateCity`, {
      userId,
      city: formData.city,
    });
    await axios.put(`${backendUrl}/api/user/updatePhoneNumber`, {
      userId,
      phone: formData.phoneNumber,
    });
    await axios.put(`${backendUrl}/api/user/updateCompany`, {
      userId,
      company: formData.company,
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await bigAxios(localStorage.getItem("id"));
      toast.success("Transaction Successful , Redirecting to Home Page");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <section className="bg-white py-8 antialiased md:py-16">
        <form
          onSubmit={handleFormSubmit}
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Billing Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Full Name
                    </label>
                    <input
                      placeholder="Abdullah Hazuri"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="billingEmail"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Your Email*
                    </label>
                    <input
                      type="email"
                      id="billingEmail"
                      value={formData.billingEmail}
                      placeholder="abdhazouritr@gmail.com"
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Country*
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
                    >
                      <option value="TR">Turkey</option>
                      <option value="KSA">Saudi Arabia</option>
                      <option value="Sy">Syria</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      City*
                    </label>
                    <select
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
                    >
                      <option value="IST">Istanbul</option>
                      <option value="ANK">Ankara</option>
                      <option value="IZ">Izmir</option>
                      <option value="GZT">Gaziantep</option>
                      <option value="KOL">Kocaeli</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Phone Number*
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      pattern="^\+\d*$"
                      placeholder="+90 531 012 4716"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Amazon"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 w-full space-y-6 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Account Details
                </h2>
                <div className="-my-3 divide-y divide-gray-200">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Account Email
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {info.email}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Chosen Plan
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {plan}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Credit To Buy
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {creditToBuy}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      {typeof planTotal === "number"
                        ? `$${planTotal}.00`
                        : null}
                    </dd>
                  </dl>
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              >
                Proceed to Payment
              </button>
              <p className="text-xs font-normal text-gray-500">
                A confirmation receipt will be sent to your email shortly after
                the transaction is successfully completed.
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
