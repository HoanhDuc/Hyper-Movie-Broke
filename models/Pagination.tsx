import { IPagination } from "./interfaces/MovieInterface";

export class PaginationModel {
  private _PageIndex: number;
  private _PageSize: number;
  private _PageCount: number;
  private _TotalRecords: number;
  constructor(pagination: IPagination) {
    this._PageIndex = Number(pagination.currentPage);
    this._PageSize = pagination.totalItemsPerPage;
    this._PageCount = pagination.totalPages;
    this._TotalRecords = pagination.totalItems;
  }
  get pageIndex(): number {
    return this._PageIndex;
  }
  get pageSize(): number {
    return this._PageSize;
  }
  get pageCount(): number {
    return this._PageCount;
  }
  get totalRecords(): number {
    return this._TotalRecords;
  }
}
