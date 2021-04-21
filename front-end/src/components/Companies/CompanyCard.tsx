import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Companies } from 'models/companies.model';


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(2, 1),
        flexShrink: 0,
        minWidth: 304,
        minHeight: 400,
        textAlign: 'justify',
        [theme.breakpoints.down('sm')]: {
            flexBasis: '100%'
        },
        [theme.breakpoints.up('md')]: {
            flexBasis: '40%'
        },
        [theme.breakpoints.up('lg')]: {
            flexBasis: '19%'
        },

    },
    media: {
        height: 140,
        margin: theme.spacing(6),
        textAlign: 'center'
    },
}));

const CompanyCard: React.FC<{ company: Companies, openCompany: Function }> = (props) => {
    const classes = useStyles();

    const company = props.company;

    return (
        <Card className={classes.root}>
            <CardActionArea
                style={{height:'100%'}}
                onClick={() => (props.openCompany(company))}
            >
                <CardMedia
                    className={classes.media}
                    title={company.name}
                >
                    <img style={{ height: '9rem', width: '9rem' }} src={"/logos/002-raspberry-pi.png"} alt={company.name}></img>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {company.name.length >= 21 ? company.name.slice(0, 19) + '...' : company.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {company.sobre.length > 150 ? company.sobre.slice(0, 150) + '...' : company.sobre}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CompanyCard;