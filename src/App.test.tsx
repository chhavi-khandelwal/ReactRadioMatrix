import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from 'App';
describe('RadioMatrix', () => {
  test('Add a column', async () => {
    render(<App />);

    expect(await screen.findAllByText('col')).toHaveLength(1);
    const addColumnButton = screen.getByTestId('add-column');
    fireEvent.click(addColumnButton);

    await waitFor(async () => {
      expect(await screen.findAllByText('col')).toHaveLength(2);
    });
  });

  test('Add a row', async () => {
    render(<App />);

    expect(await screen.findAllByText('row')).toHaveLength(1);
    const addColumnButton = screen.getByTestId('add-row');
    fireEvent.click(addColumnButton);

    await waitFor(async () => {
      expect(await screen.findAllByText('row')).toHaveLength(2);
    });
  });

  test('remove column', async () => {
    render(<App />);
    const deleteBtn = screen.getByTestId('delete-col1');
    fireEvent.click(deleteBtn);

    await waitFor(async () => {
      const columnStats = screen.getByText('No. of Columns: 1');
      expect(columnStats).toBeInTheDocument();
    });
  });

  test('check for shortest label', async () => {
    render(<App />);

    const shortestLabelStats = screen.getByText('Shortest label: 3');
    expect(shortestLabelStats).toBeInTheDocument();
  });

  test('check for longest label', async () => {
    render(<App />);

    const shortestLabelStats = screen.getByText('Longest label: 3');
    expect(shortestLabelStats).toBeInTheDocument();
  });

  test('remove row', async () => {
    render(<App />);
    const deleteBtn = screen.getByTestId('delete-row2');
    fireEvent.click(deleteBtn);

    await waitFor(async () => {
      const rowStats = screen.getByText('No. of Rows: 1');
      expect(rowStats).toBeInTheDocument();
    });
  });
});
