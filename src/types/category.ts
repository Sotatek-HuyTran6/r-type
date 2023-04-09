export interface CategoryListParams {
  page: number;
  size: number;
  searchPhrase: string;
}

export interface Category {
  _id?: string;
  name: string;
  age: boolean;
}
