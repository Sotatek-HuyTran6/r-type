export interface Session {
  accessToken: string;
  refreshToken: string;
}

export interface CustomTableColumn {
  title: string;
  key?: string;
  align: 'center' | 'left' | 'right' | 'inherit';
  width: number;
  render: any;
}

export interface CustomTablePagination {
  current: number;
  pageSize: number;
  total: number;
  onChange: any;
}

export interface CustomTable {
  rows?: any;
  columns: CustomTableColumn[];
  pagination: CustomTablePagination;
}

export interface MapPosition {
  long?: number;
  lat?: number;
}

export interface MenuItem {
  subadminDisable?: boolean;
  label: string;
  path: string;
  icon: any;
  children?: {
    label: string;
    path: string;
    id?: string;
    icon?: any;
  }[];
}
