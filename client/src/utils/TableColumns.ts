import { carsLicences } from "@/types/columnsTypes";
import { ColumnDef } from "@tanstack/react-table";
export const carTablecolumns: ColumnDef<carsLicences>[] = [
  {
    accessorKey: "vehicle Type",
    header: "vehicle Type",
  },
  {
    accessorKey: " Number Chassis",
    header: " Number Chassis",
  },
  {
    accessorKey: "Registration Date",
    header: "Registration Date",
  },
  {
    accessorKey: "Registration Expiry Date",
    header: "Registration Expiry Date",
  },
  {
    accessorKey: "vehicle Type",
    header: "Owner Name",
  },
  {
    accessorKey: "Registration Date",
    header: "Driver Name",
  },
  {
    accessorKey: "Registration Expiry Date",
    header: "Driver Nationality",
  },
];
