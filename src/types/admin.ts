export interface AdminListParams {
  page: number;
  size: number;
  email: string;
  role: number;
}

export interface IAdmin {
  gender: string;
  phoneNumber: number;
  intro: string;
  image: string;
  birthDate: string;
  firstName: string;
  lastName: string;
  email: string;
  banned: boolean;
  avgRating: number;
  password: string;
}
