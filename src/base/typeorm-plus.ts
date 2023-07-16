import { Column, ColumnOptions } from 'typeorm';
import { SortOrder } from './search-criteria';

export const ColumnText = (options?: ColumnOptions): PropertyDecorator =>
  Column({ type: 'varchar', ...options });
export const ColumnTextOptional = (
  options?: ColumnOptions,
): PropertyDecorator => Column({ type: 'varchar', nullable: true, ...options });

export const ColumnDateTime = (options?: ColumnOptions): PropertyDecorator =>
  Column({ type: 'datetime', ...options });
export const ColumnDate = (options?: ColumnOptions): PropertyDecorator =>
  Column({ type: 'date', ...options });

export const ColumnInt = (options?: ColumnOptions): PropertyDecorator =>
  Column({ type: 'int', ...options });
export const ColumnIntOptional = (options?: ColumnOptions): PropertyDecorator =>
  Column({ type: 'int', nullable: true, ...options });

export const ColumnBoolean = (options?: ColumnOptions): PropertyDecorator =>
  Column({ type: 'boolean', ...options });
export const ColumnBooleanOptional = (
  options?: ColumnOptions,
): PropertyDecorator => Column({ type: 'boolean', nullable: true, ...options });

export const toOrder = (columns: string[], order: SortOrder) => {
  const orderObj = {};
  columns.forEach((column) => {
    orderObj[column] = order;
  });
  return orderObj;
};

export const toSkip = (page: number, pageSize: number) => {
  return pageSize * (page - 1);
};

export const toTotal = (count: number, pageSize: number) => {
  return Math.ceil(count / pageSize);
};
