export interface Paging {
  next?: boolean;
  cursor?: string;
}

export interface DataResponse {
  code: number;
  data: object;
  paging?: Paging;
}
