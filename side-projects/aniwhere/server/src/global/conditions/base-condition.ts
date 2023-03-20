import {
  IPaginationInput,
  ISortInput,
} from 'global/types/pagination.interfaces';

export interface IBaseCondition {
  pagination?: IPaginationInput;
  sort?: ISortInput[];
  keyword?: string;
  isActive?: boolean;
}
