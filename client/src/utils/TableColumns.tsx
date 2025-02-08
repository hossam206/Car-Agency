import { CarsData } from "@/types/CarsData";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const carTablecolumns: ColumnDef<CarsData>[] = [
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "chassisNumber",
    header: "Chassis Number",
  },
  {
    accessorKey: "registrationDate",
    header: "Registration Date",
  },
  {
    accessorKey: "registrationExpiryDate",
    header: "Registration Expiry Date",
  },
  {
    accessorKey: "ownerName",
    header: "Owner Name",
  },
  {
    accessorKey: "driverName",
    header: "Driver Name",
  },
  {
    accessorKey: "driverNationality",
    header: "Driver Nationality",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const car = row.original;

      return (
        <div className="flex gap-3 text-lg">
          {/* View Button */}
          <Link
            to={`/cars/view/${car.id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>

          {/* Edit Button */}
          <Link
            to={`/cars/edit/${car.id}`}
            className="text-yellow-500 hover:text-yellow-700"
          >
            <FaEdit />
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(car.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      );
    },
  },
];
