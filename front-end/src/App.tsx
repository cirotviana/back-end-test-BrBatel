import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';

import MainPage from 'components/MainPage';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
}, ptBR);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
