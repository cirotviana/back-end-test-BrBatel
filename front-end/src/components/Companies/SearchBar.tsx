import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginRight: theme.spacing(2),
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);


const SearchCompaniesBar : React.FC<{updateSearchInput: Function, searchInputState:  string}> = (props)=>{
  const classes = useStyles();

  const {updateSearchInput, searchInputState} = props;

  const [openMenu, setOpenMenu] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(openMenu);

  const handleOpenMenuUser = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenuUser = () => {
    setOpenMenu(null);
  };

  function handleSearchInputChange(event: any) {
    updateSearchInput(event.target.value);
  }


  const menuId = 'user-menu';
  const renderMenu = (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleCloseMenuUser}
    >
      <MenuItem onClick={handleCloseMenuUser}>Perfil</MenuItem>
      <MenuItem onClick={handleCloseMenuUser}>Logout</MenuItem>
    </Menu>
  );

  const renderUserAvatar = (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleOpenMenuUser}
        color="inherit"
      >
        <AccountCircle style={{ fontSize: '3rem' }} />

        <div className={classes.logo}>
          Jimi Hendrix
        </div>
      </IconButton>
    </div>
  );

  const renderSearch = (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Buscar por nome…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearchInputChange}
        value={searchInputState}
      />
    </div>
  )

  const renderLogo = (
    <div className={classes.logo} >
      <img alt='Logo' src='/node-logo.png' style={{ height: '6rem', width: '9rem' }} />
    </div>
  )

  return (
    <>
      <AppBar position="static">
        <Box boxShadow={3}>
          <Toolbar style={{ justifyContent: 'space-around', backgroundColor: '#333' }}>
            {renderLogo}
            {renderSearch}
            {renderUserAvatar}
          </Toolbar>
        </Box>
      </AppBar>

      {renderMenu}
    </>
  );
}


export default SearchCompaniesBar;
