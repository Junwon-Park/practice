import {
  IPaginationInput,
  ISortInput,
} from 'global/types/pagination.interface';

export interface IBaseCondition {
  pagination?: IPaginationInput;
  sort?: ISortInput[];
  keyword?: string;
  isActive?: boolean;
}
