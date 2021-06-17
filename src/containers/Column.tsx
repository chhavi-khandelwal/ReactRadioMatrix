import styled from 'styled-components';
import { ReactComponent as Delete } from 'assets/images/delete.svg';
import { useStore } from 'store/store';
import { Row, Column, Remove } from 'store/matrix.types';
import BoxContent from './BoxCotent';

interface Props {
  column: Column;
  row: Row;
}

function ColumnComp({ column, row }: Props) {
  const columns: Column[] = useStore<Column[]>((state) => state.columns);
  const removeColumn = useStore<Remove>((state) => state.removeColumn);

  return (
    <Styled.Column>
      {columns.length > 1 && column.id !== 0 && row.id === 0 && (
        <Styled.ColumnDelete
          type="button"
          onClick={() =>
            removeColumn(column.id, !!column.image, column.name?.length)
          }
          title="Delete Column"
          data-testid={`delete-col${column.id}`}
        >
          <Delete width={16} height={16} />
        </Styled.ColumnDelete>
      )}
      <BoxContent row={row} column={column} />
    </Styled.Column>
  );
}

const Styled = {
  ColumnDelete: styled.button`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 0;
    position: absolute;
    left: 0px;
    top: -50px;
    position: absolute;
    cursor: pointer;
  `,
  Column: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding-bottom: ${(props) => props.theme.spacings.s};
    padding-right: ${(props) => props.theme.spacings.s};
  `,
};

export default ColumnComp;
