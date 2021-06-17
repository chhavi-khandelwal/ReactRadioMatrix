export interface Matrix {
  rows: Row[];
  columns: Column[];
}

export interface RemovalProps {
  imageFile?: any;
  name?: string;
}

export type Remove = (
  id: number,
  imageFileExists: boolean,
  labelLength: number
) => void;

export type Update = (arg: Row | Column, nameLength?: number) => void;

export type Row = { id: number; image?: any; name: string };

export type Column = { id: number; image?: any; name: string };

export interface Store {
  rows: Row[];
  columns: Column[];
  nameLengthArr: number[];
  imagesLength: number;
  addRow: () => void;
  addColumn: () => void;
  removeRow: Remove;
  removeColumn: Remove;
  updateRow: Update;
  updateColumn: Update;
}
