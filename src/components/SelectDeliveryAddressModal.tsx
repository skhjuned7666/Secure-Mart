"use client";

import Modal from "./ui/Modal";
import Button from "./ui/Button";
import type { Address } from "@/types/address";

type SelectDeliveryAddressModalProps = {
  open: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onAddNew: () => void;
  onAddDeliveryInstructions: (id: string) => void;
  onDeliverToThisAddress: (addressId: string) => void;
};

export default function SelectDeliveryAddressModal({
  open,
  onClose,
  addresses,
  selectedId,
  onSelect,
  onEdit,
  onAddNew,
  onAddDeliveryInstructions,
  onDeliverToThisAddress,
}: SelectDeliveryAddressModalProps) {
  const selectedAddress = selectedId
    ? addresses.find((a) => a.id === selectedId)
    : addresses[0];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select a delivery address"
      maxWidth="max-w-2xl"
      footer={
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          className="!bg-yellow-400 !text-gray-900 hover:!bg-yellow-500"
          disabled={!selectedId}
          onClick={() => {
            if (selectedId) {
              onDeliverToThisAddress(selectedId);
              onClose();
            }
          }}
        >
          Deliver to this address
        </Button>
      }
    >
      <div className="p-4 sm:p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Delivery addresses ({addresses.length})
        </h2>

        <div className="space-y-4">
          {addresses.map((addr) => {
            const isSelected = selectedId === addr.id;
            return (
              <div
                key={addr.id}
                className={`border rounded-xl p-4 transition-colors ${
                  isSelected ? "border-orange-500 bg-orange-50/30" : "border-gray-200"
                }`}
              >
                <label className="flex gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery-address"
                    checked={isSelected}
                    onChange={() => onSelect(addr.id)}
                    className="mt-1 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{addr.fullName}</p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {[addr.flat, addr.area].filter(Boolean).join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {[addr.city, addr.state, addr.pincode, addr.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Phone number: {addr.mobile}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onEdit(addr.id);
                        }}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Edit address
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onAddDeliveryInstructions(addr.id);
                        }}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Add delivery instructions
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onAddNew}
          className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Add a new delivery address
        </button>
      </div>
    </Modal>
  );
}
