import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { FormCompanyDialog } from './FormCompanyDialog';
import { Companies } from 'models/companies.model';

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

export const ContentCompanyDialog: React.FC<{ isCreateCompany: boolean, company: Companies, setFormValidation: Function, setCompany: Function }> = (props) => {
  const { isCreateCompany, company, setCompany, setFormValidation } = props

  const renderDialogTitle = (
    <DialogTitle style={{ textAlign: 'center' }}>
      {isCreateCompany ? 'Cadastrar Empresa' : company.name}
    </DialogTitle>);

  const renderDialogContent = (
    <DialogContent>
      <FormCompanyDialog
        setFormValidation={setFormValidation}
        company={company}
        setCompany={setCompany} />
    </DialogContent>);

  return (<>
    {renderDialogTitle}
    {renderDialogContent}
  </>);
}


