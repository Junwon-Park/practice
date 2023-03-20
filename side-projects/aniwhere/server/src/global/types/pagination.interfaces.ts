import { OrderBy } from 'global/enums/pagination.enums';

export interface ISortInput {
  fieldName: string;
  orderBy: OrderBy;
}

export interface IPaginationInput {
  page: number;
  count: number;
}

export type OptionalSort = ISortInput | null | undefined;

export type OptionalPagination = IPaginationInput | null | undefined;
