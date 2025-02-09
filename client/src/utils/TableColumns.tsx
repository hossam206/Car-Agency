import { CarsData } from "@/types/CarsData";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

export const carTablecolumns = (
  handleDelete: (id: number) => void,
  handleDownloadPdf: (id: number, path: string) => void
): ColumnDef<CarsData>[] => [
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
    enableSorting: true,
  },
  {
    accessorKey: "chassisNumber",
    header: "Chassis Number",
    enableSorting: true,
  },
  {
    accessorKey: "registrationDate",
    header: "Registration Date",
    enableSorting: true,
  },
  {
    accessorKey: "registrationExpiryDate",
    header: "Registration Expiry Date",
    enableSorting: true,
  },
  {
    accessorKey: "ownerName",
    header: "Owner Name",
    enableSorting: true,
  },
  {
    accessorKey: "driverName",
    header: "Driver Name",
    enableSorting: true,
  },
  {
    accessorKey: "driverNationality",
    header: "Driver Nationality",
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const car = row.original;

      return (
        <div className="flex gap-3 text-lg items-center justify-start">
          {/* View Button */}

          {/* Edit Button */}
          <Link
            to={`/cars/editCar/${car._id}`}
            className="bg-[#D6F1E8] text-[#027968] hover:bg-[#027968] hover:text-white text-[14px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
          >
            <MdModeEdit />
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(car._id)}
            className="bg-[#FFF2F2] text-[#FF0000] hover:bg-[#FF0000] hover:text-white text-[14px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
          >
            <FaRegTrashCan />
          </button>
          <button
            className="bg-[#D6F4F9] text-[#1A7DA7] hover:bg-[#1A7DA7] hover:text-white text-[14px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => handleDownloadPdf(car._id, "car/download")}
          >
            <IoCloudDownloadOutline className="w-5 h-5" />
          </button>
        </div>
      );
    },
  },
];
