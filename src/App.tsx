import './App.css';
import RadioMatrix from 'Containers/RadioMatrix';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RadioMatrix />
    </ThemeProvider>
  );
}

export default App;
