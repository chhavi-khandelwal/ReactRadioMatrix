import styled from 'styled-components';
import { ReactComponent as Delete } from 'assets/images/delete.svg';
import { useStore } from 'store/store';
import { Row, Column as ColumnType, Remove } from 'store/matrix.types';
import { TransitionGroup } from 'react-transition-group';
import Column from './Column';
import { Styler } from 'assets/styles/Styled';

interface Props {
  row: Row;
  index: number;
}

function RowComp({ row, index }: Props) {
  const rows: Row[] = useStore<Row[]>((state) => state.rows);
  const columns: ColumnType[] = useStore<ColumnType[]>(
    (state) => state.columns
  );
  const removeRow = useStore<Remove>((state) => state.removeRow);

  return (
    <Styled.Row>
      {rows.length > 1 && row.id !== 0 && (
        <Styled.RowDelete
          type="button"
          onClick={() => removeRow(row.id, !!row.image, row.name?.length)}
          title="Delete Row"
          data-testid={`delete-row${row.id}`}
        >
          <Delete width={16} height={16} />
        </Styled.RowDelete>
      )}
      <TransitionGroup component={null}>
        {columns.map((column) => {
          return (
            <Styler.CSSTransition
              timeout={350}
              classNames="box"
              key={`column-${column.id}`}
              appear
              in={true}
              delay={index * 0.05}
            >
              <div>
                <Column row={row} column={column} />
              </div>
            </Styler.CSSTransition>
          );
        })}
      </TransitionGroup>
    </Styled.Row>
  );
}

const Styled = {
  Row: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    padding-right: ${(props) => props.theme.spacings.s};
  `,
  RowDelete: styled.button`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 0;
    position: absolute;
    left: -50px;
    top: 5px;
    cursor: pointer;
  `,
};

export default RowComp;
