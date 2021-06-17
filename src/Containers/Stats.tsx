import styled from 'styled-components';
import { useStore } from 'store/store';
import { Row, Column as ColumnType } from 'store/matrix.types';

function Stats() {
  const rows: Row[] = useStore<Row[]>((state) => state.rows);
  const columns: ColumnType[] = useStore<ColumnType[]>(
    (state) => state.columns
  );
  const nameLengthArr = useStore((state) => state.nameLengthArr);
  const imagesLength = useStore((state) => state.imagesLength);

  return (
    <Styled.FlexColStart>
      <Styled.Stats>
        <Styled.Info>No. of Rows: {rows.length - 1}</Styled.Info>
        <Styled.Info>No. of Columns: {columns.length - 1}</Styled.Info>
        <Styled.Info>No. of Images uploaded: {imagesLength}</Styled.Info>
        <Styled.Info>
          Longest label: {nameLengthArr[nameLengthArr.length - 1] || 0}
        </Styled.Info>
        <Styled.Info>Shortest label: {nameLengthArr[0] || 0}</Styled.Info>
      </Styled.Stats>
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
  Stats: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: ${(props) =>
      `${props.theme.spacings.l} 0 ${props.theme.spacings.l} ${props.theme.spacings.xxl}`};
  `,
  Info: styled.span`
    margin-bottom: ${(props) => props.theme.spacings.m};
  `,
  FlexColStart: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  `,
};

export default Stats;
