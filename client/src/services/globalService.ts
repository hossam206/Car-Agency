import axios from "axios";
const api = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

type apiProps = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  itemId?: number;
  page?: number;
  limit?: number;
  data?: object;
  headers?: object;
};
const handleError = (error: any, action: string) => {
  console.log(`error with ${action} is ${error}`);
  throw new Error(`Error is ,${error?.response?.data}`);
};

const apiCall = async ({
  method,
  path,
  page,
  limit,
  data,
  headers = {},
}: apiProps) => {
  const config = {
    method,
    url: `${api}/${path}/${page && limit ? `page=${page}` : ""}`,
    data,
    headers: { ...headers },
    withCredentials: true,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    handleError(error, method);
  }
};
// get all items

export const getAll = async (path: string, page?: number) => {
  return apiCall({ method: "GET", path, page });
};
// add item
export const addItem = async (path: string, data: object) => {
  const Token = "223";
  return apiCall({
    method: "POST",
    path: `${path}`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });
};
// get one item
export const getItem = async (itemId: number, path: string) => {
  return apiCall({ method: "GET", path: `${path}/${itemId}` });
};
// Update item
export const updateItem = async (
  itemId: number,
  path: string,
  data: object
) => {
  return apiCall({ method: "PUT", path: `${path}/${itemId}`, data });
};
// delete Item
export const deleteItem = (path: string, itemId: number) => {
  return apiCall({ method: "DELETE", path: `${path}/${itemId}` });
};


