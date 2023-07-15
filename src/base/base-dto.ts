export interface BaseDto {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface DeleteDto {
  ids: string | string[];
}
