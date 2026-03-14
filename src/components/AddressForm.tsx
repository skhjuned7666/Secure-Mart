"use client";

import { useState } from "react";
import Button from "./ui/Button";
import type { Address } from "@/types/address";

const COUNTRIES = ["India"];
const INDIAN_STATES = [
  "Choose a state",
  "Andhra Pradesh",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "Uttar Pradesh",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Kerala",
  "Telangana",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
  "Other",
];

type AddressFormProps = {
  initialValues?: Partial<Address>;
  onSubmit: (data: Omit<Address, "id">) => void;
  submitLabel?: string;
};

export default function AddressForm({
  initialValues,
  onSubmit,
  submitLabel = "Use this address",
}: AddressFormProps) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
  const [mobile, setMobile] = useState(initialValues?.mobile ?? "");
  const [country, setCountry] = useState(initialValues?.country ?? "India");
  const [pincode, setPincode] = useState(initialValues?.pincode ?? "");
  const [flat, setFlat] = useState(initialValues?.flat ?? "");
  const [area, setArea] = useState(initialValues?.area ?? "");
  const [landmark, setLandmark] = useState(initialValues?.landmark ?? "");
  const [city, setCity] = useState(initialValues?.city ?? "");
  const [state, setState] = useState(initialValues?.state ?? "");
  const [isDefault, setIsDefault] = useState(initialValues?.isDefault ?? false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("Please enter full name.");
      return;
    }
    if (!mobile.trim()) {
      setError("Please enter mobile number.");
      return;
    }
    if (mobile.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!pincode.trim()) {
      setError("Please enter pincode.");
      return;
    }
    if (!/^\d{6}$/.test(pincode.replace(/\s/g, ""))) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!flat.trim() && !area.trim()) {
      setError("Please enter address (Flat/House or Area/Street).");
      return;
    }
    if (!city.trim()) {
      setError("Please enter town/city.");
      return;
    }
    if (!state || state === "Choose a state") {
      setError("Please select state.");
      return;
    }
    onSubmit({
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      country,
      pincode: pincode.trim(),
      flat: flat.trim(),
      area: area.trim(),
      landmark: landmark.trim(),
      city: city.trim(),
      state,
      isDefault,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between gap-2">
        <span className="text-sm text-blue-800">Save time. Autofill your current location.</span>
        <button
          type="button"
          className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          Autofill
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full name (First and Last name)
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
        <input
          type="tel"
          inputMode="numeric"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <p className="text-xs text-gray-500 mt-0.5">May be used to assist delivery</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="6 digits [0-9] PIN code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Flat, House no., Building, Company, Apartment
        </label>
        <input
          type="text"
          value={flat}
          onChange={(e) => setFlat(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area, Street, Sector, Village
        </label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
        <input
          type="text"
          placeholder="E.g. near apollo hospital"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Town/City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          >
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
        />
        <span className="text-sm text-gray-700">Make this my default address</span>
      </label>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          type="button"
          className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          Delivery instructions (optional)
          <span className="text-blue-600 text-xs">
            Add preferences, notes, access codes and more
          </span>
          <span className="text-gray-400">{showInstructions ? "▲" : "▼"}</span>
        </button>
        {showInstructions && (
          <div className="p-3 border-t border-gray-200">
            <textarea
              placeholder="Notes for delivery"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        className="!bg-yellow-400 !text-gray-900 hover:!bg-yellow-500"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
