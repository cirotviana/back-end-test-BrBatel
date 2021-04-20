import React from 'react'
import { AxiosResponse } from 'axios';
import { Alert, AlertTitle, Pagination } from '@material-ui/lab';
import { Box, Button, createMuiTheme, IconButton, makeStyles, TablePagination } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import API from '../../api/api'

import CompanyCard from './CompanyCard';
import SearchBar from '../SearchBar';

import { Companies } from '../../models/companies.model';
import CompanyDialogComponent from './CompanyDialog';


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
        backgroundColor: '#333',
        alignSelf: 'center'
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
    const [searchInputState, setSearchInputState] = React.useState<string>('');

    const [companiesList, setCompaniesList] = React.useState<Array<Companies>>([]);
    const [fetchError, setFetchError] = React.useState<any>(false);
    const [openCompanyDetails, setOpenCompanyDetails] = React.useState<any>(false);
    const [page, setPage] = React.useState<number>(1);
    const [numPages, setNumPage] = React.useState<number>(1);

    let allCompanies : Array<Companies>;

    let renderCompanies: any;
    //let numPages: number = 1;

    async function getCompanies() {
        API
            .get('/companies')
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    setCompaniesList(response.data);
                    setNumPage(Math.ceil(response.data.length/10))
                    setFetchError(false);
                }
            })
            .catch((err) => {
                showErrors(err);
            })
    }

    React.useEffect(() => {
        getCompanies();
    }, [])

    React.useEffect(() => {

    }, [companiesList, page])

    React.useEffect(() => {
        /* filter */
        renderCompanies = renderCompaniesPage(page)
    }, [searchInputState])

    React.useEffect(() => {
        setTimeout(
            () => setFetchError(false),
            6000
        );
    }, [fetchError])


    function renderCompaniesPage(pageNumber: number) {
        const itemsPerPage = 10;
        const max = (pageNumber * itemsPerPage) - 1
        const min = (pageNumber - 1) * itemsPerPage
        let renderCompanies = [];
        let companies = companiesList.filter((company) => {return company.name.toLowerCase().includes(searchInputState.toLowerCase())});
        //setNumPage(Math.ceil(companies.length/10))
        //numPages = companies.length/10;
        if (companies.length > 0)
            for (let i = min; i <= max && i < companies.length; i++) {
                const company = companies[i];
                renderCompanies.push((<CompanyCard key={company.id} openCompany={handleOpenCompanyDetails} company={company} />))
            }
        return renderCompanies;
    }

    const handleSaveCompany = (company: Companies) => {
        async function saveCompany() {
            API
                .post('/companies', company)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        company.id = response.data.id;
                        setFetchError(false);
                        setCompaniesList(oldList => [...oldList, company])
                    }
                })
                .catch((err) => {
                    setFetchError(true);
                })
        }
        saveCompany();
        handleCloseCompanyDetails();
    }

    const handleUpdateCompany = (company: Companies) => {
        function updateCompaniesList() {
            let arrayCompaniesList = [];
            for (let i = 0; i < companiesList.length; i++) {
                const elementCompany = companiesList[i];
                elementCompany.id === company.id ? arrayCompaniesList.push(company) : arrayCompaniesList.push(elementCompany)
            }
            setCompaniesList(arrayCompaniesList)
        }
        async function updateCompanies() {
            API
                .put('/companies/' + company.id, company)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        setFetchError(false);
                        updateCompaniesList()
                    }
                })
                .catch((err) => {
                    setFetchError(true);
                })
        }
        updateCompanies();
        handleCloseCompanyDetails();
    }

    const handleDeleteCompany = (company: Companies) => {
        function deleteCompaniesList(id: number) {
            let arrayCompaniesList = [];
            for (let i = 0; i < companiesList.length; i++) {
                const elementCompany = companiesList[i];
                if (elementCompany.id !== company.id) arrayCompaniesList.push(elementCompany)
            }
            setCompaniesList(arrayCompaniesList)
        }
        async function deleteCompany() {
            API
                .delete('/companies/' + company.id)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        setFetchError(false);

                        if (response.data)
                            deleteCompaniesList(Number(response.data.id))
                    }
                })
                .catch((err) => {
                    setFetchError(true);
                })
        }
        deleteCompany();
        handleCloseCompanyDetails();
    }

    const handleOpenCompanyDetails = (company: Companies) => {
        setOpenCompanyDetails(company);
    };

    const handleCloseCompanyDetails = () => {
        setOpenCompanyDetails(false);
    };

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const showErrors = (err: any) => {
        setFetchError(err)
    }

    const handleUpdateSearchInput = (input: string) => {
        setSearchInputState(input)
    }

    renderCompanies = renderCompaniesPage(page)

    const classes = useStyles();
    return (
        <>
            <SearchBar updateSearchInput={handleUpdateSearchInput} searchInputState={searchInputState} />
            <>
                <Box className={classes.mainContainer}>
                    <AddCompanyButton openCompany={handleOpenCompanyDetails} />
                    <Box className={classes.companiesListContainer} boxShadow={3}>
                        <Box style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', margin: theme.spacing(2)
                        }}>
                            {!fetchError ? (<></>)
                                :
                                (<Alert
                                    style={{ maxWidth: 1000, position: 'fixed' }}
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setFetchError(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }>
                                    <AlertTitle>Error</AlertTitle>
                                    Não foi possivel realizar essa operação. — <strong>Tente novamente mais tarde.</strong>
                                </Alert>)}
                        </Box>
                        <Box className={classes.companiesList} >
                            {renderCompanies}
                        </Box>
                        <Box style={{ display: 'flex', flexDirection: 'row-reverse', margin: theme.spacing(2, 3) }}>
                            <Pagination count={numPages} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
                        </Box>

                    </Box>
                </Box>

                {openCompanyDetails ? <CompanyDialogComponent company={openCompanyDetails} saveCompany={handleSaveCompany} updateCompany={handleUpdateCompany} deleteCompany={handleDeleteCompany} closeCompany={handleCloseCompanyDetails} open={openCompanyDetails} /> : null}
            </>

        </>
    )
}

const AddCompanyButton: React.FC<{ openCompany: Function }> = (props) => {
    return (
        <Box boxShadow={3} style={{ margin: theme.spacing(2) }}>
            <Button
                onClick={() => (props.openCompany(new Companies()))}
                style={{ backgroundColor: '#90caf9' }}>Adicionar</Button>
        </Box>
    )
}


const CompaniesList: React.FC = () => {

    const [companiesList, setCompaniesList] = React.useState<Array<Companies>>([]);
    const [fetchError, setFetchError] = React.useState<any>(false);
    const [openCompanyDetails, setOpenCompanyDetails] = React.useState<any>(false);
    const [page, setPage] = React.useState<number>(1);

    let renderCompanies: any;


    React.useEffect(() => {
        async function getCompanies() {
            API
                .get('/companies')
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        setCompaniesList(response.data);
                        setFetchError(false);
                    }
                })
                .catch((err) => {
                    showErrors(err);
                })
        }
        getCompanies();
    }, [])

    React.useEffect(() => {
    }, [companiesList, page])

    React.useEffect(() => {
        setTimeout(
            () => setFetchError(false),
            6000
        );
    }, [fetchError])


    function renderCompaniesPage(pageNumber: number) {

        const itemsPerPage = 10;
        const max = (pageNumber * itemsPerPage) - 1
        const min = (pageNumber - 1) * itemsPerPage

        let renderCompanies = [];

        let companies = companiesList;


        /* 
                 */
        if (companiesList.length > 0)
            for (let i = min; i <= max && i < companiesList.length; i++) {
                const company = companies[i];


                renderCompanies.push((<CompanyCard key={company.id} openCompany={handleOpenCompanyDetails} company={company} />))
            }
        return renderCompanies;
    }

    const handleSaveCompany = (company: Companies) => {
        async function saveCompany() {
            API
                .post('/companies', company)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        company.id = response.data.id;
                        setFetchError(false);
                        setCompaniesList(oldList => [...oldList, company])
                    }
                })
                .catch((err) => {
                    setFetchError(true);
                })
        }
        saveCompany();
        handleCloseCompanyDetails();
    }

    const handleUpdateCompany = (company: Companies) => {
        function updateCompaniesList() {
            let arrayCompaniesList = [];
            for (let i = 0; i < companiesList.length; i++) {
                const elementCompany = companiesList[i];
                elementCompany.id === company.id ? arrayCompaniesList.push(company) : arrayCompaniesList.push(elementCompany)
            }
            setCompaniesList(arrayCompaniesList)
        }
        async function updateCompanies() {
            API
                .put('/companies/' + company.id, company)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        setFetchError(false);
                        updateCompaniesList()
                    }
                })
                .catch((err) => {
                    setFetchError(true);
                })
        }
        updateCompanies();
        handleCloseCompanyDetails();
    }

    const handleDeleteCompany = (company: Companies) => {
        function deleteCompaniesList(id: number) {
            let arrayCompaniesList = [];
            for (let i = 0; i < companiesList.length; i++) {
                const elementCompany = companiesList[i];
                if (elementCompany.id !== company.id) arrayCompaniesList.push(elementCompany)
            }
            setCompaniesList(arrayCompaniesList)
        }
        async function deleteCompany() {
            API
                .delete('/companies/' + company.id)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        setFetchError(false);

                        if (response.data)
                            deleteCompaniesList(Number(response.data.id))
                    }
                })
                .catch((err) => {
                    setFetchError(true);
                })
        }
        deleteCompany();
        handleCloseCompanyDetails();
    }

    const handleOpenCompanyDetails = (company: Companies) => {
        setOpenCompanyDetails(company);
    };

    const handleCloseCompanyDetails = () => {
        setOpenCompanyDetails(false);
    };

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const showErrors = (err: any) => {
        setFetchError(err)
    }
    const classes = useStyles();

    renderCompanies = renderCompaniesPage(page)

    return (
        <>
            <Box className={classes.mainContainer}>
                <AddCompanyButton openCompany={handleOpenCompanyDetails} />
                <Box className={classes.companiesListContainer} boxShadow={3}>
                    <Box style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', margin: theme.spacing(2)
                    }}>
                        {!fetchError ? (<></>)
                            :
                            (<Alert
                                style={{ maxWidth: 1000, position: 'fixed' }}
                                severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setFetchError(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                                <AlertTitle>Error</AlertTitle>
                                    Não foi possivel realizar essa operação. — <strong>Tente novamente mais tarde.</strong>
                            </Alert>)}
                    </Box>
                    <Box className={classes.companiesList} >
                        {renderCompanies}
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row-reverse', margin: theme.spacing(2, 3) }}>
                        <Pagination count={10} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
                    </Box>
                    {/*                     <PaginationComponent /> */}
                </Box>
            </Box>

            {openCompanyDetails ? <CompanyDialogComponent company={openCompanyDetails} saveCompany={handleSaveCompany} updateCompany={handleUpdateCompany} deleteCompany={handleDeleteCompany} closeCompany={handleCloseCompanyDetails} open={openCompanyDetails} /> : null}
        </>

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

