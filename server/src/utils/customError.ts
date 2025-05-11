export class CustomError extends Error {
  statusText: string;
  status: number;
  success: boolean;
  constructor(
    message: string,
    statusText: string,
    status: number,
    success: boolean
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusText = statusText;
    this.status = status;
    this.success = success;
  }
}
