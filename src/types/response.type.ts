export type Response<T = unknown> = {
  success?: boolean;
  message?: string;
  status?: number;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
};

export type ErrorSource = {
  path: string;
  message: string;
};

export type ErrorResponse = {
  success: false;
  status: number;
  message: string;
  sources?: ErrorSource[];
  error?: {
    status: number;
    name: string;
  };
  stack?: string | null;
};
