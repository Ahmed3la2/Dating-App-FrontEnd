export interface Pagination {
    currentPage : number,
    itemsPerPage : number ,
    totalItems : number,
    totalPges : number,
}

export class PaginatedResult<T>{
    result! :T;
    pagination!:Pagination;
}