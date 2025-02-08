import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/Input";
import { MdAdd } from "react-icons/md";
import { carTablecolumns } from "@/utils/TableColumns";
import { getAll } from "@/services/globalService";
import { ImSpinner8 } from "react-icons/im";
// images
import failedLoadImg from "/images/failedLoad.webp";
import NoDataImg from "/images/Nodata.webp";
// Define the data type
type Person = {
  id: number;
  name: string;
  age: number;
  email: string;
};

// Sample data
const data: Person[] = [
  { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", age: 22, email: "alice@example.com" },
  { id: 4, name: "Bob Brown", age: 45, email: "bob@example.com" },
  { id: 5, name: "Charlie Davis", age: 30, email: "charlie@example.com" },
];

export default function Dashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<string>("success");
  // Load all data
  const fetchCars = async () => {
    setLoadingStatus("loading");
    try {
      const response = await getAll("car", 1, 5);
      if (response.status === "200") {
        setData(response?.data);
        setLoadingStatus("success");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoadingStatus("failed");
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);
  // Initialize the table
  const table = useReactTable({
    data,
    columns: carTablecolumns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // call fetchCars when reload
  // useEffect(() => {
  //   if (data?.length == 0) {
  //     fetchCars();
  //   }
  // }, []);
  return (
    <>
      {loadingStatus === "loading" && data.length == 0 ? (
        <div className="flex items-center justify-center h-screen">
          <span
            className="flex flex-col items-center 
          justify-center gap-1"
          >
            <ImSpinner8
              size={24}
              className="animate-spin transition-all duration-600 ease-in-out"
            />
            <p className="font-medium "> ... جاري التحميل</p>
          </span>
        </div>
      ) : loadingStatus === "success" && data.length === 0 ? (
        <div className="flex flex-col items-center justify-center  h-screen">
          <div className="w-[100px] h-[100px] overflow-hidden">
            <img src={NoDataImg} loading="lazy" className="w-full h-full" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="sm:text-xl xs:text-xs  text-slate-800 font-semibold">
              لا يوجد بيانات , اضف الان
            </p>
            <div className="flex flex-row items-center  my-2">
              <Link to="/addnew">
                <Button>
                  <MdAdd size={26} />
                  إضافه سيارة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : loadingStatus === "success" && data.length > 0 ? (
        <div className="p-4 container mx-auto">
          <div className="flex md:flex-row md:items-center md:justify-between flex-col-reverse justify-center items-end md:my-0 my-2">
            {/* Search Input */}
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGlobalFilter(e.target.value)
              }
              className="max-w-sm "
            />
            <div className="flex flex-row items-center justify-end my-2">
              <Button>
                <MdAdd size={24} />
                إضافه سيارة
              </Button>
            </div>
          </div>
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              السابق
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              القادم
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  h-screen">
          <div className="w-[100px] h-[100px] overflow-hidden">
            <img src={failedLoadImg} loading="lazy" className="w-full h-full" />
          </div>
          <p className="sm:text-xl xs:text-xs text-red-600 font-semibold">
            فشل التحميل ,حاول مره أخري لاحقا
          </p>
        </div>
      )}
    </>
  );
}
