import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as Cross } from 'assets/images/cross.svg';

export type Props = {
  children: React.ReactNode;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLElement>;

const Modal: React.FC<Props> = (props: Props) => {
  const { children, onClose } = props;

  return (
    <Styled.ModalBox>
      <Styled.Shim onClick={onClose} />
      <Styled.Container>
        {onClose && (
          <Styled.CrossIcon onClick={onClose}>
            <Cross width={16} height={16} />
          </Styled.CrossIcon>
        )}
        <Styled.Content>{children}</Styled.Content>
      </Styled.Container>
    </Styled.ModalBox>
  );
};

const Styled = {
  CrossIcon: styled.button`
    border: none;
    position: absolute;
    right: 0px;
    top: 5px;
    background: none;
  `,
  ModalBox: styled.div<Props>`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  `,
  Container: styled.div<Props>`
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    padding: ${(props) => props.theme.spacings.l};
    border-radius: 10px;
    z-index: 9999;
    max-height: 90vh;
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.black20};
    transition: all 0.5s;
  `,
  Content: styled.div`
    padding: ${(props) => props.theme.spacings.m};
  `,
  Shim: styled.div<{ variant?: string }>`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    opacity: 0.4;
    background-color: ${(props) => props.theme.colors.black90};
  `,
};

export default Modal;
