import React from 'react'
import { Box, Button, createMuiTheme, makeStyles, TablePagination } from '@material-ui/core'

import MediaCard from './CompanyCard';
import SearchBar from './SearchBar';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        textAlign: 'center',
        backgroundColor: '#333',
    },
    companiesList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: theme.spacing(1),
        padding: theme.spacing(2),
    },
    companiesListContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#333'
    },
    mainContainer: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                backgroundColor: '#212121',
                padding: theme.spacing(2),
    }
}));

export default function CompaniesPage() {

    const classes = useStyles();
    return (
        <>
            <SearchBar />
            <Box className={classes.mainContainer}>
                <AddCompanyButton />
                <CompaniesList />
            </Box>
        </>
    )

}

function AddCompanyButton() {
    return (
        <Box boxShadow={3} style={{ margin: theme.spacing(2) }}>
            <Button style={{ backgroundColor: '#90caf9' }}>Adicionar</Button>
        </Box>
    )
}


function CompaniesList() {
    const classes = useStyles();

    let companiesList: Array<any> = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const renderCompanies = companiesList.map((value) => (<MediaCard />))

    return (
        <Box className={classes.companiesListContainer} boxShadow={3}>
            <Box className={classes.companiesList} >
                {renderCompanies}
            </Box>
            <PaginationComponent />
        </Box>

    )
}




function PaginationComponent() {
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            component="div"
            count={100}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
}


/*
function PaginationComponent() {
    return (
        <Box style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            margin: theme.spacing(1,2),
            padding: theme.spacing(2),
            color: '#fff'
        }}>
            <Typography>
                Items por página 10 {<IconButton><ArrowDownIcon></ArrowDownIcon></IconButton>}   1-10 of 15
        </Typography>
        </Box>
    )
}
 */
