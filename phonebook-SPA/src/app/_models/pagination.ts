export interface Pagination {
    recordsPerPage: number;
    page: number;
    totalAmountPages: number;
    totalItems: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}