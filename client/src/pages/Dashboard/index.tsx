import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
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
import { Input } from "@/Components/ui/input";
import { MdAdd } from "react-icons/md";
import { carTablecolumns } from "@/utils/TableColumns";
import { getAll } from "@/services/globalService";
import { ImSpinner8 } from "react-icons/im";
import failedLoadImg from "/images/failedLoad.webp";
import NoDataImg from "/images/Nodata.webp";
import { CarsData } from "@/types/CarsData";
import { GrNext, GrPrevious } from "react-icons/gr";
import Navbar from "@/Components/Navbar";

export default function Dashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<CarsData[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Fetch cars data
  const fetchCars = async () => {
    setLoadingStatus("loading");
    try {
      const response = await getAll("car", pageNumber);
      if (response?.status === 200) {
        setData(response?.data?.data);
        setLoadingStatus("success");
      }
    } catch (error) {
      console.log(error);
      setLoadingStatus("failed");
    }
  };

  // Handle delete car
  // const handleDelete = async (id: string) => {
  //   try {
  //     await deleteCar(id);
  //     fetchCars(); // Refresh the data after deletion
  //   } catch (error) {
  //     console.error("Failed to delete car:", error);
  //   }
  // };

  useEffect(() => {
    fetchCars();
  }, [pageNumber]); // Refetch data when pageNumber changes

  // Initialize the table
  const table = useReactTable({
    data,
    columns: carTablecolumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Navbar />
      <div>
        {loadingStatus === "loading" && data?.length === 0 ? (
          <div className="flex items-center justify-center h-screen">
            <span className="flex flex-col items-center gap-1">
              <ImSpinner8 size={24} className="animate-spin" />
              <p className="font-medium">... جاري التحميل</p>
            </span>
          </div>
        ) : loadingStatus === "success" && data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <img src={NoDataImg} className="w-24 h-24" alt="No data" />
            <p className="text-lg font-semibold text-gray-800">
              لا يوجد بيانات, اضف الان
            </p>
            <Link to="/addnew">
              <Button>
                <MdAdd size={26} /> إضافه سيارة
              </Button>
            </Link>
          </div>
        ) : loadingStatus === "success" && data?.length > 0 ? (
          <div className="p-4 container mx-auto">
            <div className="flex md:flex-row flex-col-reverse items-end gap-2  md:justify-between md:items-center mb-4">
              <Input
                placeholder="Search..."
                name="Search"
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="max-w-sm"
              />
              <Link to="/addnew">
                <Button>
                  <MdAdd size={24} /> إضافه سيارة
                </Button>
              </Link>
            </div>

            <div className="rounded-md border overflow-x-auto pb-4 sm:text-sm">
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

            <div className="flex justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 hover:bg-gray-700 transition-all duration-300 ease-in-out hover:text-white leading-relaxed"
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber === 1}
              >
                <GrPrevious />
                السابق
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 hover:bg-gray-700 transition-all duration-300 ease-in-out hover:text-white leading-relaxed"
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={data.length < 10} // Assuming 10 items per page
              >
                القادم
                <GrNext />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <img
              src={failedLoadImg}
              className="w-24 h-24"
              alt="Failed to load"
            />
            <p className="text-lg text-red-600 font-semibold">
              فشل التحميل، حاول مرة أخرى لاحقًا
            </p>
          </div>
        )}
      </div>
    </>
  );
}
