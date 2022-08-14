
export class ResponseDto<T> {
    rows: T[];
    totalRows: number;
    pageIndex: number;
    pageSize: number;


  constructor(
    rows: T[], 
    totalRows: number, 
    pageIndex: number, 
    pageSize: number
) {
    this.rows = rows
    this.totalRows = totalRows
    this.pageIndex = pageIndex
    this.pageSize = pageSize
  }

}