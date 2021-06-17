import styled from 'styled-components';
import { ReactComponent as Add } from 'assets/images/add.svg';
import { useStore } from 'store/store';
import { Row as RowType } from 'store/matrix.types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Stats from './Stats';
import Row from './Row';

function RadioMatrix() {
  const rows: RowType[] = useStore<RowType[]>((state) => state.rows);
  const addRow = useStore<() => void>((state) => state.addRow);
  const addColumn = useStore<() => void>((state) => state.addColumn);

  return (
    <Styled.FlexColStart>
      <Stats />
      <Styled.MainDiv>
        <Styled.FlexColStart>
          <Styled.FlexStart>
            <TransitionGroup>
              {rows.map((row, index) => {
                return (
                  <Styled.CSSTransition
                    timeout={350}
                    classNames="box"
                    key={`row-${row.id}`}
                    appear
                    delay={0.05}
                    spacing={rows.length > 1 && row.id !== 0}
                  >
                    <div>
                      <Row row={row} index={index} />
                    </div>
                  </Styled.CSSTransition>
                );
              })}
            </TransitionGroup>
            <Styled.ButtonNoBorder type="button">
              <Add width={16} height={16} onClick={addColumn} />
            </Styled.ButtonNoBorder>
          </Styled.FlexStart>

          <Styled.ButtonNoBorder type="button" spacing>
            <Add width={16} height={16} onClick={addRow} />
          </Styled.ButtonNoBorder>
        </Styled.FlexColStart>
      </Styled.MainDiv>
    </Styled.FlexColStart>
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
  CSSTransition: styled(CSSTransition)<{ delay: number; spacing?: boolean }>`
    transition: opacity 300ms ease-in-out ${(props) => props.delay}s;
    margin-left: ${(props) =>
      props.spacing ? `-${props.theme.spacings.xl}` : 0};

    &.box-enter {
      opacity: 0;
    }
    &.box-enter-active {
      opacity: 1;
    }
    &.box-exit {
      opacity: 0;
    }
    &.box-exit-active {
      opacity: 0.8;
    }
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
  `,
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
  FlexColStart: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  `,

  ButtonNoBorder: styled.button<{ spacing?: boolean }>`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 0;
    margin-left: ${(props) =>
      props.spacing ? `-${props.theme.spacings.xl}` : 0};
  `,
};

export default RadioMatrix;
