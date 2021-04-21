import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        BrBatel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    textAlign: 'center',
    backgroundColor: '#333',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box boxShadow={3}>
      <footer className={classes.footer}>
        <Container>
          <Copyright />
        </Container>
      </footer>
    </Box>
  );
}