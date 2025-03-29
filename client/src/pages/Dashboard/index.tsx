import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
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
import failedLoadImg from "/images/failedLoad.webp";
import NoDataImg from "/images/Nodata.webp";
import { CarsData } from "@/types/CarsData";
import { GrNext, GrPrevious } from "react-icons/gr";
import Navbar from "@/Components/Navbar";
import ConfirmDelete from "@/Components/ConfirmDelete";
import { handleDownloadPdf } from "@/utils";
import ContentLoader from "@/Components/ContentLoader/inedx";
export default function Dashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [carsCount, setCarsCount] = useState<number>(0); // ✅ Total cars count state
  const [globalFilter, setGlobalFilter] = useState(""); // ✅ Global search state
  const [data, setData] = useState<CarsData[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<string>("loading");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<Record<number, string>>(
    {}
  );
  const pageSize = 10;

  const updateDownloadStatus = (id: number, status: string) => {
    setDownloadStatus((prev) => ({ ...prev, [id]: status }));
  };

  // ✅ Fetch cars data with pagination
  const fetchCars = async () => {
    setLoadingStatus("loading");
    try {
      const response = await getAll("car", pageNumber, pageSize);
      setCarsCount(response?.data?.count);

      if (response?.status === 200 && response?.data?.data) {
        setData(response?.data?.data);
        setLoadingStatus("success");
      } else {
        setLoadingStatus("failed");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoadingStatus("failed");
    }
  };
  // console.log(data, data.length);
  useEffect(() => {
    fetchCars();
  }, [pageNumber, deleteItemId]); // ✅ Refetch data when pageNumber changes or item is deleted

  // ✅ Handle delete confirmation
  const handleDelete = (id: number) => {
    setDeleteItemId(id);
  };

  // ✅ Global search filter function (searches all columns)
  const globalSearchFilter = (row: any, filterValue: string) => {
    return row.getAllCells().some((cell: any) =>
      String(cell.getValue() ?? "")
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
  };

  const table = useReactTable({
    data,
    columns: carTablecolumns(
      handleDelete,
      handleDownloadPdf,
      updateDownloadStatus,
      downloadStatus
    ),

    state: { sorting, globalFilter }, // ✅ Include globalFilter
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _, filterValue) =>
      globalSearchFilter(row, filterValue),
  });
  return (
    <>
      <Navbar />
      {deleteItemId && (
        <ConfirmDelete
          path="car/remove"
          deletedItemId={deleteItemId}
          onClose={() => setDeleteItemId(null)}
        />
      )}
      <div>
        {/* ✅ Loading State */}
        {loadingStatus === "loading" ? (
          <ContentLoader />
        ) : loadingStatus === "failed" ? (
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
        ) : data.length === 0 ? (
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
        ) : (
          <div className="p-4 container mx-auto">
            {/* ✅ Search Bar */}
            <div className="flex md:flex-row flex-col-reverse items-end gap-2 md:justify-between md:items-center mb-4">
              <Input
                placeholder="Search here..."
                name="search"
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="max-w-sm"
              />

              <Link to="/addnew">
                <Button>
                  <MdAdd size={24} /> Add new car
                </Button>
              </Link>
            </div>

            {/* ✅ Data Table */}
            <div className="rounded-md border overflow-x-auto px-2 text-center pb-4 sm:text-sm">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="text-center font-semibold text-gray-800"
                        >
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

            {/* ✅ Pagination Controls */}
            <div className="flex justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                disabled={pageNumber === 1}
              >
                <GrPrevious /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber((prev) => prev + 1)}
                disabled={pageNumber * pageSize >= carsCount}
              >
                Next <GrNext />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
