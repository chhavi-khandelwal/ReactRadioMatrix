import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

export const Styler = {
  CSSTransition: styled(CSSTransition)<{ delay: number; spacing?: number }>`
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
  FlexColStart: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  `,
};
