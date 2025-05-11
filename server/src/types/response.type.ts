export type ResponseType = {
  success?: boolean;
  status?: number;
  statusText?: string;
  message?: string;
  data?: any;
  modifiedCount?: number;
  deletedCount?: number;
};
