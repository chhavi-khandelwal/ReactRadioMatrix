import Input from 'components/Input/Input';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from 'store/store';
import styled from 'styled-components';
import { ReactComponent as Tick } from 'assets/images/tick.svg';
import Modal from 'components/Modal/Modal';
import { Column, Row } from 'store/matrix.types';

export type Props = {
  row?: Row;
  column?: Column;
};

interface Form {
  name: string;
}

const InputLabel = (props: Props) => {
  const { row, column } = props;
  const updateRow = useStore((state) => state.updateRow);
  const updateColumn = useStore((state) => state.updateColumn);

  const [label, setLabel] = useState<string>(
    row?.id ? row.name : column?.name || ''
  );
  const [showLabel, setShowLabel] = useState<boolean>(true);

  const { register, handleSubmit, errors, reset } = useForm<Form>({
    defaultValues: { name: label },
  });

  const onUpdateName = (data: Form) => {
    const { name } = data;
    if (row?.id) {
      updateRow({ ...row, ...{ name } }, row.name.length);
    } else if (column?.id) {
      updateColumn({ ...column, ...{ name } }, column.name.length);
    }

    setLabel(name);
    setShowLabel(true);
  };

  useEffect(() => {
    reset({ name: label });
  }, [label, reset]);

  return (
    <Styled.Container>
      {!showLabel && (
        <Modal onClose={() => setShowLabel(true)}>
          <Styled.Form onSubmit={handleSubmit((data) => onUpdateName(data))}>
            <Styled.InputContainer>
              <Input
                type="text"
                placeholder="Enter name"
                name="name"
                error={errors?.name?.type ? 'Required' : ''}
                ref={register({ required: true })}
              />
            </Styled.InputContainer>
            <Styled.Button type="submit">
              <Tick width={15} height={18} />
            </Styled.Button>
          </Styled.Form>
        </Modal>
      )}

      <Styled.Label
        row={!column?.id}
        onClick={() => setShowLabel(false)}
        title={label}
      >
        {label}
      </Styled.Label>
    </Styled.Container>
  );
};

var Styled = {
  InputContainer: styled.div`
    margin-right: ${(props) => props.theme.spacings.l};
  `,
  Button: styled.button`
    border: none;
  `,
  Form: styled.form`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Container: styled.div`
    position: relative;
    cursor: pointer;
  `,
  Label: styled.span<{ row: boolean }>`
    display: inline-block;
    font-size: 10px;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: ${(props) => (props.row ? 'left' : 'center')};

    &:hover {
      background-color: ${(props) => props.theme.colors.black20};
      border-radius: 4px;
    }
  `,
};
export default InputLabel;
