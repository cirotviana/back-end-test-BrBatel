import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

export const RenderError: React.FC<{ dissmissError: React.Dispatch<any> }> = (props) => {
    const { dissmissError } = props
    return (
        <Box style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
        }}>
            <Alert
                style={{ maxWidth: 1000, position: 'fixed', zIndex:1 }}
                severity="error"
                action={<IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        dissmissError(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>}>
                <AlertTitle>Error</AlertTitle>
                    Não foi possivel realizar essa operação. — <strong>Tente novamente mais tarde.</strong>
            </Alert>
        </Box>

    );
}