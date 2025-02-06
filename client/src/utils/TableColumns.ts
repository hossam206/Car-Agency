import { carsLicences } from "@/types/columnsTypes";
import { ColumnDef } from "@tanstack/react-table";
export const columns: ColumnDef<carsLicences>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
