import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(2, 1),
        flexShrink: 0,
        minWidth: 304,
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

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    /*  image="/logo192.png" */
                    title="Contemplative Reptile"
                >
                    <img src="/logo192.png"></img>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Microsoft Company
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
