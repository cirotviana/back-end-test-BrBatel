import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import { CnpjMask } from 'utils/masks';
import { Companies, AnnualBilling } from 'models/companies.model';

export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    saveButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    buttonSpacing: {
      margin: theme.spacing(1, 2)
    }
  }));


export const FormCompanyDialog: React.FC<{ company: Companies; setCompany: Function; setFormValidation: Function; }> = (props) => {

  const classes = useStyles();

  const { company, setCompany, setFormValidation } = props;

  const inputVariantStyle = 'standard';

  function checkFormValidation() {
    if (Companies.checkIfAllDefined(company))
      setFormValidation(true);
  }

  function handleInputChange(event: any) {
    checkFormValidation();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newValue = { [name]: value };
    let newObject = {};
    Object.assign(newObject, company);
    setCompany(() => (Object.assign(newObject, newValue)));
  }

  checkFormValidation();

  return (<>
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            variant={inputVariantStyle}
            onChange={handleInputChange}
            value={company.name}
            autoFocus
            required
            fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cnpj"
            label="CNPJ"
            name="cnpj"
            autoComplete="cnpj"
            value={company.cnpj}
            onChange={handleInputChange}
            InputProps={{
              inputComponent: CnpjMask as any,
            }}
            variant={inputVariantStyle}
            required
            fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="demanda"
            label="Demanda"
            name="demanda"
            autoComplete="demanda"
            value={company.demanda}
            onChange={handleInputChange}
            variant={inputVariantStyle}
            required
            fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="faturamentoAnual"
            label="Faturamento Anual"
            name="faturamentoAnual"
            autoComplete="faturamentoAnual"
            value={company.faturamentoAnual}
            SelectProps={{ native: true }}
            onChange={handleInputChange}
            variant={inputVariantStyle}
            select
            fullWidth
          >
            <option key={-1} disabled selected>
              Faturamento Anual
              </option>
            {Object.values(AnnualBilling).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="sobre"
            label="Sobre"
            name="sobre"
            autoComplete="sobre"
            rows={4}
            value={company.sobre}
            onChange={handleInputChange}
            variant={inputVariantStyle}
            fullWidth
            multiline />
        </Grid>
      </Grid>
    </form>
  </>);
};
