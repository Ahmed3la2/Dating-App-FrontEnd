export interface Pagination {
    currentPage : number,
    itemsPerPage : number ,
    totalItems : number,
    totalPges : number,
}

export class PaginatedResult<T>{
    [x: string]: any;
    result! :T;
    pagination!:Pagination;
}