export interface IParamPaymentList {
  page: number;
  size: number;
  userEmail: string;
  paymentState: 'done' | 'pending' | '';
  sortBy: string; // default create at
  sortOrder: 'desc' | 'asc';
  type: '1' | '2'; //1 or 2;
}

export interface Payment {
  createdAt: string;
  email: string;
  paymentDescription: string;
  paymentId: string;
  state: string;
  total: number;
  type: string;
}
