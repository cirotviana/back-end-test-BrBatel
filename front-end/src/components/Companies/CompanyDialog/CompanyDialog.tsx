import React from 'react';
import Dialog from '@material-ui/core/Dialog';


import { Companies } from 'models/companies.model';
import { ContentCompanyDialog } from 'components/Companies/CompanyDialog/ContentCompanyDialog';
import { ButtonsCompanyDialog } from 'components/Companies/CompanyDialog/ButtonsCompanyDialog';

import { deleteCompanyApi, saveCompanyApi, updateCompanyApi } from 'api/api'

import {Actions} from 'components/Companies/CompaniesPage'

const CompanyDialogComponent: React.FC<{ company: Companies, openDialogState: boolean, updateCompaniesListState: Function, closeDialog: Function, showErrors: Function }> = (props) => {
  const [company, setCompany] = React.useState<any>(props.company);
  const [formValidation, setFormValidation] = React.useState<boolean>(false);

  const isCreateCompany = props.company.id ? false : true;
  const {closeDialog, showErrors, updateCompaniesListState, openDialogState } = props

  const openDialog = openDialogState ? true : false;

  const handleSaveCompany = (company: Companies) => {
    saveCompanyApi(company)
      .then((response: any) => {
        company.id = response.data.id;
        updateCompaniesListState(company, Actions.create)
      }).catch((err:any) => { showErrors(err) })
      closeDialog();
  }

  const handleUpdateCompany = (company: Companies) => {
    updateCompanyApi(company)
      .then(() => updateCompaniesListState(company, Actions.update))
      .catch((err:any) => { showErrors(err) })
      closeDialog();
  }

  const handleDeleteCompany = (company: Companies) => {
    deleteCompanyApi(company)
      .then(() => updateCompaniesListState(company, Actions.delete))
      .catch((err:any) => { showErrors(err) });
      closeDialog();
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => { closeDialog() }}
        aria-labelledby="form-dialog-title"
      >
        <ContentCompanyDialog
          company={company}
          isCreateCompany={isCreateCompany}
          setCompany={setCompany}
          setFormValidation={setFormValidation} />

        <ButtonsCompanyDialog
          company={company}
          onSave={handleSaveCompany}
          onUpdate={handleUpdateCompany}
          onDelete={handleDeleteCompany}
          closeCompany={closeDialog}
          formValidation={formValidation}
          isCreateCompany={isCreateCompany} />

      </Dialog>
    </div>
  );
}

export default CompanyDialogComponent;

