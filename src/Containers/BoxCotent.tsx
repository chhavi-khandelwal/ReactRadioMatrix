import styled from 'styled-components';
import { useCallback } from 'react';
import { ReactComponent as Plus } from 'assets/images/plus.svg';
import { useStore } from 'store/store';
import { Row, Column, Update } from 'store/matrix.types';
import InputLabel from 'components/InputLabel/InputLabel';

interface Props {
  column: Column;
  row: Row;
}

function BoxContent({ column, row }: Props) {
  const updateRow = useStore<Update>((state) => state.updateRow);
  const updateColumn = useStore<Update>((state) => state.updateColumn);

  const UploadImage: (e: any, r: Row, c: Column) => void = useCallback(
    (e, row, column) => {
      const file = e.target.files[0];
      if (!file.type.includes('image')) {
        alert('File is not an image');
        return;
      }

      if (row.id === 0) {
        updateColumn({ ...column, image: file });
      } else {
        updateRow({ ...row, image: file });
      }
    },
    [updateColumn, updateRow]
  );

  const ColumnBar = useCallback(
    ({ column }: { column: Column }) => (
      <Styled.Flex col>
        <Styled.Button type="button">
          <Styled.UploadedImage
            src={URL.createObjectURL(column.image)}
            width={50}
            height={50}
            alt={column.image}
          />
        </Styled.Button>
        <InputLabel column={column} />
      </Styled.Flex>
    ),
    []
  );

  const RowBar = useCallback(
    ({ row }: { row: Row }) => (
      <Styled.Flex>
        <Styled.Button type="button">
          <Styled.UploadedImage
            src={URL.createObjectURL(row.image)}
            width={50}
            height={50}
            alt={row.image}
          />
        </Styled.Button>
        <Styled.InputLabelContainer spacing={1}>
          <InputLabel row={row} />
        </Styled.InputLabelContainer>
      </Styled.Flex>
    ),
    []
  );

  const ImageContainer = useCallback(
    ({ row, column }: Props) => (
      <Styled.Flex col={!!!row.id}>
        <Styled.Button type="button">
          <Styled.PlusIcon width={16} height={16} />
          <Styled.FileInput
            type="file"
            onChange={(e) => UploadImage(e, row, column)}
          />
        </Styled.Button>
        <Styled.InputLabelContainer spacing={row.id ? 1 : 0}>
          <InputLabel row={row} column={column} />
        </Styled.InputLabelContainer>
      </Styled.Flex>
    ),
    [UploadImage]
  );

  const getContent = useCallback(
    (row, column) => {
      const rowId = row.id;
      const columnId = column.id;
      if (rowId === 0 && columnId === 0) {
        return <Styled.DivNoBorder />;
      }
      if (rowId === 0 || columnId === 0) {
        if (rowId === 0 && column.image) {
          return <ColumnBar column={column} />;
        } else if (columnId === 0 && row.image) {
          return <RowBar row={row} />;
        } else {
          return <ImageContainer row={row} column={column} />;
        }
      } else {
        return (
          <Styled.DivNoBorder>
            <Styled.Radio />
          </Styled.DivNoBorder>
        );
      }
    },
    [ColumnBar, RowBar, ImageContainer]
  );

  return <>{getContent(row, column)}</>;
}

const Styled = {
  PlusIcon: styled(Plus)`
    position: absolute;
    top: 16px;
    right: 16px;
  `,
  InputLabelContainer: styled.div<{ spacing?: number }>`
    margin-left: ${(props) => (props.spacing ? props.theme.spacings.s : 0)};
  `,
  Flex: styled.div<{ col?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${(props) => (props.col ? 'column' : 'row')};
  `,
  UploadedImage: styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
  `,
  FileInput: styled.input`
    opacity: 0;
    width: 50px;
    height: 50px;
    cursor: pointer;
  `,
  Button: styled.button`
    width: 50px;
    height: 50px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => props.theme.colors.black20};
    border-radius: 10px;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
  `,
  DivNoBorder: styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Radio: styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 3px solid ${(props) => props.theme.colors.black90};
  `,
};

export default BoxContent;
