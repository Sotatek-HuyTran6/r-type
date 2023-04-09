export interface PostListParams {
  queryFor: 'map' | 'normal';
  queryType: 'all';
  pageSize: number;
  pageNumber: number;
  houseType?: 1 | 2 | 3 | 4 | 5;
  houseCategory?: 1 | 2;
  showInvisible: boolean;
}
