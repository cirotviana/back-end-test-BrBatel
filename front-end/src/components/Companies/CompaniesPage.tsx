import React from 'react'
import { Pagination } from '@material-ui/lab';
import { Box, Button, createMuiTheme, makeStyles } from '@material-ui/core'

import { getCompaniesApi } from 'api/api'

import CompanyCard from 'components/Companies/CompanyCard';
import SearchBar from 'components/Companies/SearchBar';
import CompanyDialogComponent from 'components/Companies/CompanyDialog/CompanyDialog';

import { Companies } from 'models/companies.model';

const theme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
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


export const Actions = {
    update: 'update',
    create: 'create',
    delete: 'delete'
}

const CompaniesPage: React.FC<{ setError: Function }> = (props) => {

    const [companiesList, setCompaniesList] = React.useState<Array<Companies>>([]);

    const [searchInputState, setSearchInputState] = React.useState<string>('');

    const { setError } = props;

    const [openCompanyDetails, setOpenCompanyDetails] = React.useState<any>(false);

    const [page, setPage] = React.useState<number>(1);

    const [numPages, setNumPages] = React.useState<number>(1);

    const itemsPerPage = 10;

    let renderCompanies: any;
    let renderPagination: any;

    React.useEffect(() => {
        handleGetCompanies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        setPage(1);
    }, [searchInputState])

    React.useEffect(() => {
        handleUpdateNumPages(companiesList.length)
    }, [companiesList])

    const handleUpdateSearchInput = (input: string) => {
        setSearchInputState(input)
    }

    const handleUpdateNumPages = (numCompanies: number) => {
        setNumPages(Math.ceil(numCompanies / 10))
    }

    const handleOpenCompanyDetails = (company: Companies) => {
        setOpenCompanyDetails(company);
    };

    const handleCloseCompanyDetails = () => {
        setOpenCompanyDetails(false);
    };

    const handlePaginationChange = (event: React.ChangeEvent<unknown> | number, pageNumber: number) => {
        setPage(pageNumber)
    }

    const showErrors = (err: any) => {
        setError(err)
    }

    const updateCompaniesListState = (company: Companies, action: string) => {
        if (action === Actions.create)
            setCompaniesList((oldList: any) => [...oldList, company])
        else {
            let arrayCompaniesList = [];
            for (let i = 0; i < companiesList.length; i++) {
                const elementCompany = companiesList[i];
                if (action === Actions.delete)
                    if (elementCompany.id !== company.id) arrayCompaniesList.push(elementCompany)
                if (action === Actions.update)
                    elementCompany.id === company.id ? arrayCompaniesList.push(company) : arrayCompaniesList.push(elementCompany)
            }
            setCompaniesList(arrayCompaniesList)
        }
    }

    const handleGetCompanies = () => {
        getCompaniesApi()
            .then((response: any) => {
                setCompaniesList(response.data.companies);
                handleUpdateNumPages(response.data.numCompanies);
            }).catch((err) => { showErrors(err); })
    }

    const filterCompanies = () => {
        return companiesList.filter((company) => { return company.name.toLowerCase().includes(searchInputState.toLowerCase()) });
    }

    const buildRenderCompanies = (pageNumber: number) => {
        let companies = filterCompanies();
        let companiesArray = [];
        const max = (pageNumber * itemsPerPage) - 1
        const min = (pageNumber - 1) * itemsPerPage
        if (companies.length > 0)
            for (let i = min; i <= max && i < companies.length; i++) {
                const company = companies[i];
                companiesArray.push((<CompanyCard key={company.id} openCompany={handleOpenCompanyDetails} company={company} />))
            }
        return companiesArray;
    }

    const classes = useStyles();

    renderCompanies = buildRenderCompanies(page)

    renderPagination = (<Pagination count={numPages} onChange={handlePaginationChange} page={page} variant="outlined" shape="rounded" />)

    return (
        <>
            <SearchBar updateSearchInput={handleUpdateSearchInput} searchInputState={searchInputState} />

            <Box className={classes.mainContainer}>
                <AddCompanyButton openCompany={handleOpenCompanyDetails} />
                <Box className={classes.companiesListContainer} boxShadow={3}>
                    <Box className={classes.companiesList}>
                        {renderCompanies}
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row-reverse', margin: theme.spacing(2, 3) }}>
                        {renderPagination}
                    </Box>)
                </Box>
            </Box>
            {openCompanyDetails ?
                <CompanyDialogComponent
                    company={openCompanyDetails}
                    updateCompaniesListState={updateCompaniesListState}
                    showErrors={showErrors}
                    closeDialog={handleCloseCompanyDetails}
                    openDialogState={openCompanyDetails}
                /> : null}
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


export default CompaniesPage