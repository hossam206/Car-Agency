import React, { useState } from "react";
import { deleteItem, getAll } from "../services/globalService.ts";
import { toast } from "sonner";
import { FaCircleCheck } from "react-icons/fa6";

type ConfirmDeleteProps = {
  path: string;
  deletedItemId: any;
  onClose: () => void; // Fix `onclose` typo
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  path,
  deletedItemId,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!deletedItemId) return; // Prevent unnecessary API calls

    try {
      setLoading(true);
      const response = await deleteItem(path, deletedItemId);
      if (response?.status === 200) {
        toast.success("car deleting Success!", {
          icon: <FaCircleCheck className="h-5 w-5   text-green-500  " />,
        });
        onClose(); // Close modal after success
      }
      await getAll("car"); // Refresh data
    } catch (error) {
    } finally {
      setLoading(false); // Ensure loading resets
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1c252e7a] z-40">
      <div className="w-[calc(100vw-64px)] max-h-[calc(100vh-64px)] max-w-[370px] bg-white rounded-lg px-6 py-4 shadow-lg">
        <h4 className="font-semibold text-lg">Delete Confirmation</h4>
        <p className="pt-2 text-sm">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end mt-4 gap-2 text-sm">
          {/* Delete Button */}
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 disabled:bg-red-300"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

          {/* Cancel Button */}
          <button
            className="px-4 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfirmDelete);
