import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';

import Footer from 'components/Footer';
import CompaniesPage from 'components/Companies/CompaniesPage';
import { RenderError } from 'components/ErrorComponent';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
}, ptBR);

function MainPage() {
  const [errorState, setErrorState] = React.useState<any>(false);

  React.useEffect(() => {
    setTimeout(
      () => setErrorState(false),
      6000
    );
  }, [errorState])

  const showErrors = (err: any) => {
    setErrorState(err)
  }
  
  const closeErrors = ()=>{
    setErrorState(false);
  }

  return (
    <ThemeProvider theme={theme}>
      {errorState ? <RenderError dissmissError={closeErrors}  /> : null}
      <CompaniesPage setError={showErrors}/>
      <Footer />
    </ThemeProvider>
  );
}

export default MainPage;
