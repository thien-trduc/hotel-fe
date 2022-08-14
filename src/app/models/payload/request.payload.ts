import { Pagination } from './pagination';

export interface RequestPayload {
    pagination: Pagination;
    query: any;
    sort: any;
}