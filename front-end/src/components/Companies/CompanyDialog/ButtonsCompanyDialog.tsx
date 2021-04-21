import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { Companies } from 'models/companies.model';

export const useStyles = makeStyles((theme) => ({
    saveButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttonSpacing: {
        margin: theme.spacing(1, 2),
        backgroundColor: '#90caf9',
    }
}));

export const ButtonsCompanyDialog: React.FC<{ company: Companies, closeCompany: Function, formValidation: boolean, isCreateCompany: boolean, onSave: Function, onUpdate: Function, onDelete: Function }> = (props) => {
    const { closeCompany, formValidation, isCreateCompany } = props
    const { onSave, onUpdate, onDelete, company } = props
    const classes = useStyles();
    return (
        <DialogActions style={{ justifyContent: 'space-between' }}>
            {!isCreateCompany ?
                (<Box className={classes.buttonSpacing} boxShadow={3} style={{ backgroundColor: '#212121' }}                >
                    <Button color="secondary"
                        onClick={() => { onDelete(company) }}>
                        Excluir
                    </Button>
                </Box>)
                : <Box />}

            <Box className={classes.saveButtonContainer}>
                <Box className={classes.buttonSpacing} boxShadow={3}>
                    <Button color="primary"
                        onClick={() => { closeCompany() }}
                    >
                        Cancelar
                    </Button>
                </Box>
                <Box className={classes.buttonSpacing} boxShadow={3}>
                    {formValidation ?
                        (<Button color="primary"
                            onClick={() => {
                                if (isCreateCompany)
                                    onSave(company)
                                else
                                    onUpdate(company)
                            }}
                        >
                            Salvar
                        </Button>) :
                        (<Button color="primary"
                            disabled
                            onClick={() => { /* //save or update */ }}>
                            Salvar
                        </Button>)}
                </Box>
            </Box>
        </DialogActions>)
}
