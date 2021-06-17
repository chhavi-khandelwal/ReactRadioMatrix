import styled from 'styled-components';
import { ReactComponent as Add } from 'assets/images/add.svg';
import { useStore } from 'store/store';
import { Row as RowType } from 'store/matrix.types';
import { TransitionGroup } from 'react-transition-group';
import Stats from './Stats';
import Row from './Row';
import { Styler } from 'assets/styles/Styled';

function RadioMatrix() {
  const rows: RowType[] = useStore<RowType[]>((state) => state.rows);
  const addRow = useStore<() => void>((state) => state.addRow);
  const addColumn = useStore<() => void>((state) => state.addColumn);

  return (
    <Styler.FlexColStart>
      <Stats />
      <Styled.MainDiv>
        <Styler.FlexColStart>
          <Styled.FlexStart>
            <TransitionGroup>
              {rows.map((row, index) => {
                return (
                  <Styler.CSSTransition
                    timeout={350}
                    classNames="box"
                    key={`row-${row.id}`}
                    appear
                    delay={0.05}
                    spacing={rows.length > 1 && row.id !== 0 ? 1 : 0}
                  >
                    <div>
                      <Row row={row} index={index} />
                    </div>
                  </Styler.CSSTransition>
                );
              })}
            </TransitionGroup>
            <Styled.ButtonNoBorder
              type="button"
              onClick={addColumn}
              data-testid="add-column"
              title="Add column"
            >
              <Add width={16} height={16} />
            </Styled.ButtonNoBorder>
          </Styled.FlexStart>

          <Styled.ButtonNoBorder
            type="button"
            spacing={1}
            onClick={addRow}
            data-testid="add-row"
            title="Add row"
          >
            <Add width={16} height={16} />
          </Styled.ButtonNoBorder>
        </Styler.FlexColStart>
      </Styled.MainDiv>
    </Styler.FlexColStart>
  );
}

const Styled = {
  FlexStart: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
  `,
  MainDiv: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: ${(props) => props.theme.spacings.xxl};
  `,
  ButtonNoBorder: styled.button<{ spacing?: number }>`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    margin-left: ${(props) =>
      props.spacing ? `-${props.theme.spacings.xl}` : 0};
  `,
};

export default RadioMatrix;
