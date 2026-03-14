"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Banknote, Lock, Info, Plus, ChevronRight, X } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/ui/Price";
import Button from "@/components/ui/Button";
import DeliveryInstructionsModal from "@/components/DeliveryInstructionsModal";
import SelectDeliveryAddressModal from "@/components/SelectDeliveryAddressModal";
import AddOrEditAddressModal from "@/components/AddOrEditAddressModal";
import { getProduct } from "@/lib/products";
import type { Product } from "@/types/product";
import { getCartItems, type CartItem } from "@/lib/cartStorage";
import type { Address } from "@/types/address";
import { formatAddressFull } from "@/types/address";

type CartProduct = Product & { quantity: number };

const PAYMENT_OPTIONS = [
  { id: "card", label: "Credit or debit card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Banknote },
  { id: "upi", label: "Scan and Pay with UPI", icon: Smartphone },
  { id: "upi_apps", label: "Other UPI Apps", icon: Smartphone },
  { id: "cod", label: "Cash on Delivery / Pay on Delivery", icon: Banknote },
] as const;

const NETBANKING_BANKS = [
  "Choose an Option",
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Other",
];

const WALLET_BALANCE = 0;

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "default-1",
    fullName: "Your Name",
    mobile: "9876543210",
    country: "India",
    pincode: "110001",
    flat: "123",
    area: "Sample Street, Locality Name",
    landmark: "Near landmark",
    city: "New Delhi",
    state: "Delhi",
    isDefault: true,
  },
];

function isValidUpiId(value: string): boolean {
  if (!value || value.trim().length < 5) return false;
  const trimmed = value.trim();
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(trimmed);
}

const CARD_NETWORKS = ["VISA", "Mastercard", "Amex", "Maestro", "RuPay"];
const EXPIRY_MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const EXPIRY_YEARS = (() => {
  const y = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, i) => String(y + i));
})();

function isValidCardNumber(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 13 && digits.length <= 19;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CartProduct[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [placing, setPlacing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(DEFAULT_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    DEFAULT_ADDRESSES[0]?.id ?? null
  );
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  const [showAddEditAddress, setShowAddEditAddress] = useState(false);
  const [addEditMode, setAddEditMode] = useState<"add" | "edit">("add");
  const [addEditAddressId, setAddEditAddressId] = useState<string | null>(null);
  const [deliveryInstructionsByAddressId, setDeliveryInstructionsByAddressId] = useState<
    Record<string, string>
  >({});
  const [instructionAddressId, setInstructionAddressId] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [netBankingBank, setNetBankingBank] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardNickname, setCardNickname] = useState("");
  const [cardExpiryMonth, setCardExpiryMonth] = useState("01");
  const [cardExpiryYear, setCardExpiryYear] = useState(EXPIRY_YEARS[0]);
  const [cardFormError, setCardFormError] = useState("");
  const [cardAdded, setCardAdded] = useState(false);
  const [showDeliveryInstructions, setShowDeliveryInstructions] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const stored: CartItem[] = getCartItems();
      if (stored.length === 0) {
        if (!cancelled) {
          setItems([]);
          setLoading(false);
        }
        return;
      }

      const products = await Promise.all(
        stored.map((item) => getProduct(item.productId))
      );
      if (cancelled) return;

      const merged: CartProduct[] = [];
      products.forEach((p, i) => {
        if (p) merged.push({ ...p, quantity: stored[i].quantity });
      });
      setItems(merged);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedAddress = useMemo(
    () => (selectedAddressId ? addresses.find((a) => a.id === selectedAddressId) : null),
    [addresses, selectedAddressId]
  );
  const deliveryName = selectedAddress?.fullName ?? "Your Name";
  const deliveryAddress = selectedAddress
    ? formatAddressFull(selectedAddress)
    : "Address line 1, City, State, PIN, India";
  const deliveryInstructions = selectedAddressId
    ? deliveryInstructionsByAddressId[selectedAddressId] ?? ""
    : "";

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const deliveryFee: number = 0;
  const orderTotal = subtotal + deliveryFee;

  const handleApplyPromo = () => {
    setPromoError("");
    const code = promoCode.trim();
    if (!code) {
      setPromoError("Please enter a coupon or gift card code.");
      return;
    }
    if (code.length < 4) {
      setPromoError("Please enter a valid code.");
      return;
    }
    setPromoApplied(true);
    setPromoError("");
  };

  const handleVerifyUpi = () => {
    setUpiError("");
    if (!upiId.trim()) {
      setUpiError("Please enter your UPI ID.");
      return;
    }
    if (!isValidUpiId(upiId)) {
      setUpiError("Invalid UPI ID. Use format: name@bank or number@bank");
      return;
    }
    setUpiVerified(true);
    setUpiError("");
  };

  const handleAddCardContinue = () => {
    setCardFormError("");
    const num = cardNumber.replace(/\s/g, "");
    if (!num) {
      setCardFormError("Please enter your card number.");
      return;
    }
    if (!isValidCardNumber(num)) {
      setCardFormError("Please enter a valid card number (13–19 digits).");
      return;
    }
    const now = new Date();
    const year = parseInt(cardExpiryYear, 10);
    const month = parseInt(cardExpiryMonth, 10) - 1;
    const expiry = new Date(year, month + 1, 0);
    if (expiry < now) {
      setCardFormError("Card expiry date must be in the future.");
      return;
    }
    setCardAdded(true);
    setShowAddCardModal(false);
    setCardNumber("");
    setCardFormError("");
  };

  const handlePlaceOrder = () => {
    setPaymentError("");

    if (paymentMethod === "wallet") {
      setPaymentError("Insufficient balance. Add money or choose another payment method.");
      return;
    }

    if (paymentMethod === "card" && !cardAdded) {
      setPaymentError("Please add a card using 'Add a new credit or debit card' or choose another payment method.");
      return;
    }

    if (paymentMethod === "upi_apps") {
      if (!upiId.trim()) {
        setPaymentError("Please enter your UPI ID for Other UPI Apps.");
        return;
      }
      if (!isValidUpiId(upiId)) {
        setPaymentError("Please enter a valid UPI ID (e.g. name@paytm).");
        return;
      }
    }

    if (paymentMethod === "netbanking") {
      if (!netBankingBank || netBankingBank === "Choose an Option") {
        setPaymentError("Please select a bank for Net Banking.");
        return;
      }
    }

    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      router.push("/order-confirmation");
    }, 800);
  };

  if (loading && items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <AnnouncementBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Secure checkout
          </h1>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600">
            Loading...
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <AnnouncementBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Secure checkout
          </h1>
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-700">Your cart is empty.</p>
            <Link
              href="/add-to-cart"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-5 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
            >
              Back to cart
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Secure checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Delivery & Payment */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivering to */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h2 className="text-base font-bold text-gray-900 mb-2">
                Delivering to {deliveryName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{deliveryAddress}</p>
              <button
                type="button"
                onClick={() => setShowSelectAddress(true)}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => {
                  setInstructionAddressId(selectedAddressId);
                  setShowDeliveryInstructions(true);
                }}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 mt-2 block text-left"
              >
                Add delivery instructions
              </button>
              {deliveryInstructions && (
                <p className="text-sm text-gray-600 mt-1">{deliveryInstructions}</p>
              )}
            </div>

            <DeliveryInstructionsModal
              open={showDeliveryInstructions}
              onClose={() => {
                setShowDeliveryInstructions(false);
                setInstructionAddressId(null);
              }}
              name={
                instructionAddressId
                  ? addresses.find((a) => a.id === instructionAddressId)?.fullName ?? deliveryName
                  : deliveryName
              }
              address={
                instructionAddressId
                  ? (() => {
                      const a = addresses.find((a) => a.id === instructionAddressId);
                      return a ? formatAddressFull(a) : deliveryAddress;
                    })()
                  : deliveryAddress
              }
              onSave={(data) => {
                if (instructionAddressId && data.instructions) {
                  setDeliveryInstructionsByAddressId((prev) => ({
                    ...prev,
                    [instructionAddressId]: data.instructions,
                  }));
                }
                setShowDeliveryInstructions(false);
                setInstructionAddressId(null);
              }}
            />

            <SelectDeliveryAddressModal
              open={showSelectAddress}
              onClose={() => setShowSelectAddress(false)}
              addresses={addresses}
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
              onEdit={(id) => {
                setAddEditAddressId(id);
                setAddEditMode("edit");
                setShowAddEditAddress(true);
              }}
              onAddNew={() => {
                setAddEditAddressId(null);
                setAddEditMode("add");
                setShowAddEditAddress(true);
              }}
              onAddDeliveryInstructions={(id) => {
                setInstructionAddressId(id);
                setShowSelectAddress(false);
                setShowDeliveryInstructions(true);
              }}
              onDeliverToThisAddress={(id) => {
                setSelectedAddressId(id);
                setShowSelectAddress(false);
              }}
            />

            <AddOrEditAddressModal
              open={showAddEditAddress}
              onClose={() => {
                setShowAddEditAddress(false);
                setAddEditAddressId(null);
              }}
              mode={addEditMode}
              initialAddress={
                addEditAddressId
                  ? addresses.find((a) => a.id === addEditAddressId) ?? null
                  : null
              }
              onSave={(address) => {
                if (addEditMode === "add") {
                  setAddresses((prev) => [...prev, address]);
                  setSelectedAddressId(address.id);
                } else {
                  setAddresses((prev) =>
                    prev.map((a) => (a.id === address.id ? address : a))
                  );
                }
                setShowAddEditAddress(false);
                setAddEditAddressId(null);
              }}
            />

            {/* Wallet balance & promo code */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-amber-50/50 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                  className="mt-1 text-orange-500 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-gray-800">
                    Secure-Mart Pay Balance ₹{WALLET_BALANCE.toLocaleString("en-IN")}{" "}
                    <span className="text-red-600 font-normal">Unavailable</span>
                  </span>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                    <Info size={14} className="text-blue-500 flex-shrink-0" />
                    Insufficient balance.{" "}
                    <button type="button" className="text-blue-600 hover:underline">
                      Add money & get rewarded
                    </button>
                  </p>
                </div>
              </label>
              <div className="flex gap-2 mt-3">
                <div className="flex-1 relative">
                  <Plus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter Code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                    }}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleApplyPromo}
                >
                  Apply
                </Button>
              </div>
              {promoError && <p className="text-sm text-red-600 mt-1">{promoError}</p>}
              {promoApplied && promoCode.trim() && (
                <p className="text-sm text-green-600 mt-1">Code applied successfully.</p>
              )}
            </div>

            {/* Payment method */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Payment method
              </h2>
              <div className="space-y-3">
                {PAYMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = paymentMethod === opt.id;
                  return (
                    <div key={opt.id}>
                      <label
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? "border-orange-500 bg-orange-50/50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => {
                            setPaymentMethod(opt.id);
                            setUpiError("");
                            setPaymentError("");
                          }}
                          className="mt-1 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                          <Icon size={18} className="text-gray-500" />
                          {opt.label}
                        </span>
                      </label>
                      {opt.id === "card" && isSelected && (
                        <div className="ml-6 mt-3 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {CARD_NETWORKS.map((net) => (
                              <span
                                key={net}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                              >
                                {net}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCardNickname(deliveryName);
                              setCardFormError("");
                              setShowAddCardModal(true);
                            }}
                            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            <Plus size={16} />
                            Add a new credit or debit card
                            <ChevronRight size={16} />
                          </button>
                          {cardAdded && (
                            <p className="text-sm text-green-600">Card added. You can place order.</p>
                          )}
                          <p className="text-sm text-gray-500">
                            Secure-Mart accepts all major credit &amp; debit cards.
                          </p>
                        </div>
                      )}
                      {opt.id === "netbanking" && isSelected && (
                        <div className="ml-6 mt-2">
                          <select
                            value={netBankingBank}
                            onChange={(e) => setNetBankingBank(e.target.value)}
                            className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                          >
                            {NETBANKING_BANKS.map((bank) => (
                              <option key={bank} value={bank}>
                                {bank}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {opt.id === "upi" && isSelected && (
                        <p className="ml-6 mt-2 text-sm text-gray-600 flex items-center gap-1">
                          <Info size={14} className="text-blue-500 flex-shrink-0" />
                          You will need to scan the QR code on the payment page to complete the payment.
                        </p>
                      )}
                      {opt.id === "upi_apps" && isSelected && (
                        <div className="ml-6 mt-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                          <p className="text-sm font-medium text-gray-800 mb-2">
                            Please enter your UPI ID
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <input
                              type="text"
                              placeholder="Enter UPI ID"
                              value={upiId}
                              onChange={(e) => {
                                setUpiId(e.target.value);
                                setUpiError("");
                                setUpiVerified(false);
                              }}
                              className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="md"
                              onClick={handleVerifyUpi}
                            >
                              Verify
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            The UPI ID is in the format of name/phone number@bankname
                          </p>
                          {upiError && <p className="text-sm text-red-600 mt-1">{upiError}</p>}
                          {upiVerified && upiId.trim() && (
                            <p className="text-sm text-green-600 mt-1">UPI ID verified.</p>
                          )}
                        </div>
                      )}
                      {opt.id === "cod" && isSelected && (
                        <p className="ml-6 mt-2 text-sm text-gray-600">
                          Cash, UPI and Cards accepted.{" "}
                          <button type="button" className="text-blue-600 hover:underline">
                            Know more
                          </button>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                <Lock size={12} />
                Your payment information is protected.
              </p>
            </div>

            {/* Review & help */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h2 className="text-base font-bold text-gray-900 mb-2">
                Review items and shipping
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Need help? Check our help pages or contact us.
              </p>
              <Link
                href="/add-to-cart"
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                Back to cart
              </Link>
            </div>
          </div>

          {/* Right: Order summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm sticky top-24">
              <h2 className="text-base font-bold text-gray-900 mb-3">
                Order summary
              </h2>

              {/* Compact item list */}
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2 text-sm border-b border-gray-100 pb-2 last:border-0"
                  >
                    <div className="flex-shrink-0 w-12 h-12 relative bg-gray-50 rounded overflow-hidden">
                      <Image
                        src={item.images[0] ?? ""}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-gray-500">
                        Qty: {item.quantity} × ₹
                        {item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-sm text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span>Items ({itemCount})</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mb-4">
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Order total</span>
                  <Price value={orderTotal} size="md" showSavings={false} />
                </div>
              </div>

              {paymentError && (
                <p className="text-sm text-red-600 mb-3">{paymentError}</p>
              )}

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handlePlaceOrder}
                disabled={placing}
              >
                {placing ? "Placing order..." : "Place order"}
              </Button>

              <Link
                href="/add-to-cart"
                className="block text-center text-sm font-semibold text-gray-600 hover:text-orange-600 mt-3"
              >
                Back to cart
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Add card modal */}
      {showAddCardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowAddCardModal(false)}
        >
          <div
            className="bg-gray-100 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">
                Add a new credit or debit card
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCardModal(false)}
                className="p-2 rounded-lg hover:bg-gray-200 text-gray-600"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 19));
                      setCardFormError("");
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nickname
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Personal card"
                    value={cardNickname}
                    onChange={(e) => setCardNickname(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry date
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={cardExpiryMonth}
                      onChange={(e) => setCardExpiryMonth(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                    >
                      {EXPIRY_MONTHS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={cardExpiryYear}
                      onChange={(e) => setCardExpiryYear(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                    >
                      {EXPIRY_YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-4">
                  Please ensure that you enable your card for online payments from your bank&apos;s app.
                </p>
                <div className="flex flex-wrap gap-2">
                  {CARD_NETWORKS.map((net) => (
                    <span
                      key={net}
                      className="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded"
                    >
                      {net}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {cardFormError && (
              <p className="px-4 sm:px-5 pb-2 text-sm text-red-600">{cardFormError}</p>
            )}
            <div className="p-4 sm:p-5 flex justify-end gap-2 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setShowAddCardModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="!bg-yellow-400 !text-gray-900 hover:!bg-yellow-500"
                onClick={handleAddCardContinue}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
