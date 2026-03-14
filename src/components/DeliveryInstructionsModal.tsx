"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

const ADDRESS_TYPES = [
  {
    id: "house",
    label: "House",
    description: "Independent house, villa, or builder floor (6 AM - 11 PM delivery)",
  },
  {
    id: "apartment",
    label: "Apartment",
    description: "Apartment or condominium (building security may apply)",
  },
  {
    id: "business",
    label: "Business",
    description: "Office or commercial address (business hours delivery)",
  },
  {
    id: "other",
    label: "Other",
    description: "Other address type",
  },
] as const;

type DeliveryInstructionsModalProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  address: string;
  onSave?: (data: {
    addressType: string;
    saturdayDelivery: boolean;
    sundayDelivery: boolean;
    instructions: string;
  }) => void;
};

export default function DeliveryInstructionsModal({
  open,
  onClose,
  name,
  address,
  onSave,
}: DeliveryInstructionsModalProps) {
  const [addressType, setAddressType] = useState<string>("house");
  const [saturdayDelivery, setSaturdayDelivery] = useState<boolean | null>(null);
  const [sundayDelivery, setSundayDelivery] = useState<boolean | null>(null);
  const [instructions, setInstructions] = useState("");
  const [weekendOpen, setWeekendOpen] = useState(true);
  const [additionalOpen, setAdditionalOpen] = useState(true);

  const handleSave = () => {
    onSave?.({
      addressType,
      saturdayDelivery: saturdayDelivery ?? false,
      sundayDelivery: sundayDelivery ?? false,
      instructions: instructions.trim(),
    });
    onClose();
  };

  const description = ADDRESS_TYPES.find((t) => t.id === addressType)?.description ?? "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add delivery instructions"
      maxWidth="max-w-xl"
      footer={
        <div className="flex justify-end">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="!bg-yellow-400 !text-gray-900 hover:!bg-yellow-500"
            onClick={handleSave}
          >
            Save instructions
          </Button>
        </div>
      }
    >
      <div className="p-4 sm:p-5 space-y-5">
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600 mt-0.5">{address}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Type
          </label>
          <div className="flex flex-wrap gap-2">
            {ADDRESS_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setAddressType(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                  addressType === t.id
                    ? "border-orange-500 bg-orange-50 text-orange-800"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {description && (
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100"
            onClick={() => setWeekendOpen(!weekendOpen)}
          >
            Can you receive deliveries at this address on weekends?
            {weekendOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {weekendOpen && (
            <div className="p-3 space-y-3 border-t border-gray-200">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Saturdays</p>
                <div className="flex gap-2">
                  {([false, true] as const).map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => setSaturdayDelivery(val)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 ${
                        saturdayDelivery === val
                          ? "border-orange-500 bg-orange-50 text-orange-800"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {val ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Sundays</p>
                <div className="flex gap-2">
                  {([false, true] as const).map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => setSundayDelivery(val)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 ${
                        sundayDelivery === val
                          ? "border-orange-500 bg-orange-50 text-orange-800"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {val ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100"
            onClick={() => setAdditionalOpen(!additionalOpen)}
          >
            Do we need additional instructions to deliver to this address?
            {additionalOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {additionalOpen && (
            <div className="p-3 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery instructions
              </label>
              <textarea
                placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none resize-y"
              />
              <p className="text-xs text-gray-500 mt-2">
                Your instructions help us deliver your packages to your expectations and will be used when possible.
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
