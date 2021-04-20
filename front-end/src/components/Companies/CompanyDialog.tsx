import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';

import { Companies, AnnualBilling } from '../../models/companies.model';

const useStyles = makeStyles((theme) => ({
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

function CnpjMask(props: any) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const FormCompany: React.FC<{ company: Companies, setCompany: Function, setFormValidation: Function }> = (props) => {

  const classes = useStyles();

  const { company, setCompany, setFormValidation } = props

  const inputVariantStyle = 'standard';

  checkFormValidation();

  function checkFormValidation() {
    if (Companies.checkIfAllDefined(company))
      setFormValidation(true)
  }

  function handleInputChange(event: any) {
    checkFormValidation();


    const target = event.target;
    const value = target.value;
    const name = target.name;
        
    let newValue = { [name]: value };
    let newObject = {};
    Object.assign(newObject, company)
    
    setCompany(() => (Object.assign(newObject, newValue)));
  }

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
            fullWidth
          />
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
            fullWidth
          />
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
            fullWidth
          />
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
            multiline
          />
        </Grid>
      </Grid>
    </form>
  </>)
}

const CompanyDialogComponent: React.FC<{ company: Companies, open: boolean, saveCompany: Function, updateCompany: Function, deleteCompany: Function, closeCompany: Function }> = (props) => {
  const [company, setCompany] = React.useState<any>(props.company);
  const [formValidation, setFormValidation] = React.useState<boolean>(false);


  const isCreateCompany = props.company.id ? false : true;
  const { saveCompany, updateCompany, deleteCompany, closeCompany } = props
  const open = props.open ? true : false;



  function saveOrUpdate(company: Companies) {
    isCreateCompany ? saveCompany(company) : updateCompany(company)
  }

  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={() => { closeCompany() }} aria-labelledby="form-dialog-title">
        <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">
          {isCreateCompany ? 'Cadastrar Empresa' : company.name}
        </DialogTitle>

        <DialogContent>
          <FormCompany setFormValidation={setFormValidation} company={company} setCompany={setCompany} />
        </DialogContent>

        <DialogActions style={{ justifyContent: 'space-between' }} >

          {!isCreateCompany ?
            (<Box className={classes.buttonSpacing} boxShadow={3} style={{ backgroundColor: '#212121' }}>
              <Button onClick={() => { deleteCompany(company) }} color="secondary">
                Excluir
            </Button>
            </Box>)
            : <Box />}

          <Box className={classes.saveButtonContainer}>
            <Box className={classes.buttonSpacing} boxShadow={3} style={{ backgroundColor: '#90caf9' }}>
              <Button onClick={() => { closeCompany() }} color="primary">
                Cancelar
              </Button>
            </Box>
            <Box className={classes.buttonSpacing} boxShadow={3} style={{ backgroundColor: '#90caf9' }}>

              {formValidation ?
                (<Button onClick={() => { saveOrUpdate(company); }} color="primary">Salvar</Button>) :
                (<Button disabled onClick={() => { saveOrUpdate(company); }} color="primary">Salvar</Button>)
              }

            </Box>
          </Box>

        </DialogActions>
      </Dialog>
    </div>
  );
}


export default CompanyDialogComponent;