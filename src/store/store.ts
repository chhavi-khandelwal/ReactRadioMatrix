import create from 'zustand';
import { Store, Row, Column } from './matrix.types';

const NameLength = 3;

const store = (set: any) => ({
  rows: [
    { id: 0, name: '', image: null },
    { id: 2, name: 'row', image: null },
  ],
  columns: [
    { id: 0, name: '', image: null },
    { id: 1, name: 'col', image: null },
  ],
  imagesLength: 0,
  nameLengthArr: [],
  addRow: () =>
    set((state: Store) => ({
      rows: [
        ...state.rows,
        { id: state.rows[state.rows.length - 1].id + 1, name: 'row' },
      ],
      nameLengthArr: [...state.nameLengthArr, NameLength].sort(),
    })),
  addColumn: () =>
    set((state: Store) => ({
      columns: [
        ...state.columns,
        { id: state.columns[state.columns.length - 1].id + 1, name: 'col' },
      ],
      nameLengthArr: [...state.nameLengthArr, NameLength].sort(),
    })),
  updateRow: (row: Row, nameLength?: number) =>
    set((state: Store) => {
      const nameLengthArr = state.nameLengthArr;
      if (nameLength) {
        nameLengthArr.splice(
          state.nameLengthArr.indexOf(nameLength),
          1,
          row.name.length
        );
      }
      return {
        rows: state.rows.map((r) => (r.id === row.id ? { ...r, ...row } : r)),
        imagesLength: row.image ? state.imagesLength + 1 : state.imagesLength,
        nameLengthArr: nameLength
          ? [...state.nameLengthArr.sort()]
          : state.nameLengthArr,
      };
    }),
  updateColumn: (column: Column, nameLength?: number) =>
    set((state: Store) => {
      const nameLengthArr = state.nameLengthArr;
      if (nameLength) {
        nameLengthArr.splice(
          state.nameLengthArr.indexOf(nameLength),
          1,
          column.name.length
        );
      }
      return {
        columns: state.columns.map((c) =>
          c.id === column.id ? { ...c, ...column } : c
        ),
        imagesLength: column.image
          ? state.imagesLength + 1
          : state.imagesLength,
        nameLengthArr: nameLength
          ? [...state.nameLengthArr.sort()]
          : state.nameLengthArr,
      };
    }),
  removeRow: (id: number, imageFileExists: boolean, labelLength: number) =>
    set((state: Store) => {
      const nameArr = state.nameLengthArr;
      nameArr.splice(state.nameLengthArr.indexOf(labelLength), 1);
      return {
        rows: [...state.rows.filter((c) => c.id !== id)],
        imagesLength: imageFileExists
          ? state.imagesLength - 1
          : state.imagesLength,
        nameLengthArr: [...nameArr],
      };
    }),
  removeColumn: (id: number, imageFileExists: boolean, labelLength: number) =>
    set((state: Store) => {
      const nameArr = state.nameLengthArr;
      nameArr.splice(state.nameLengthArr.indexOf(labelLength), 1);

      return {
        columns: [...state.columns.filter((c) => c.id !== id)],
        imagesLength: imageFileExists
          ? state.imagesLength - 1
          : state.imagesLength,
        nameLengthArr: [...nameArr],
      };
    }),
});

export const useStore = create<Store>(store);
