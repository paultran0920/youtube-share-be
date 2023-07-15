export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface BaseCriteria {
  /**
   * Search criteria
   */
  searchCriteria?: string;
  /**
   * Which page will be returned.
   * Default is all pages (if not specified)
   */
  page?: number;
  /**
   * Number of items per page.
   * Default is 10
   */
  pageSize?: number;
  /**
   * Sorting order.
   * Default is ASC
   */
  sort?: SortOrder;
  /**
   * Sort column
   */
  sortColumn?: string[];
}

export interface ListResult<T> {
  totalPage: number;
  items: T[];
}
