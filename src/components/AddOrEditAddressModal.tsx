"use client";

import Modal from "./ui/Modal";
import AddressForm from "./AddressForm";
import type { Address } from "@/types/address";

type AddOrEditAddressModalProps = {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialAddress?: Address | null;
  onSave: (address: Address) => void;
};

export default function AddOrEditAddressModal({
  open,
  onClose,
  mode,
  initialAddress,
  onSave,
}: AddOrEditAddressModalProps) {
  const title = mode === "add" ? "Add an address" : "Edit your address";
  const formTitle = mode === "add"
    ? "Enter a new delivery address"
    : "Edit your delivery address";

  const handleSubmit = (data: Omit<Address, "id">) => {
    const id = mode === "edit" && initialAddress ? initialAddress.id : crypto.randomUUID();
    onSave({ ...data, id });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-lg">
      <div className="p-4 sm:p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{formTitle}</h2>
        <AddressForm
          initialValues={
            mode === "edit" && initialAddress
              ? {
                  fullName: initialAddress.fullName,
                  mobile: initialAddress.mobile,
                  country: initialAddress.country,
                  pincode: initialAddress.pincode,
                  flat: initialAddress.flat,
                  area: initialAddress.area,
                  landmark: initialAddress.landmark,
                  city: initialAddress.city,
                  state: initialAddress.state,
                  isDefault: initialAddress.isDefault,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          submitLabel="Use this address"
        />
      </div>
    </Modal>
  );
}
