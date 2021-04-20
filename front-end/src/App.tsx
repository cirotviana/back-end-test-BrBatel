import { Box, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Copyright from './components/Copyright';
import CompaniesPage from './components/Companies/CompaniesPage';

import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
}, ptBR);

function App() {
  return (

    <ThemeProvider theme={theme}>
      <CompaniesPage />
      <Copyright />
    </ThemeProvider>

  );
}

export default App;
