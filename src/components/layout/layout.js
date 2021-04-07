import React, { useEffect, useState ,useRef } from 'react';
import './layout.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import image from '../../assets/google.png'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
// styles
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
          },
    },
    rootGird: {
        flexGrow: 1,
      },
      media: {
        height: '30px',
        paddingTop: '29px', 
      },
      textWidth:{
          width:'100%'
      },
      userNameButton:{
         fontFamily:'"Google Sans",Roboto,Arial,sans-serif',
         letterSpacing:'.0107142857em',
         textTransform:'none' 
      }
  }));

export default function Layout() {
    // states
    const[firstName,setFirstName]=useState(null);
    const[lastName,setLastName]=useState(null);
    const[userName,setUserName]=useState(null);
    const[password,setPassword]=useState(null);
    const[repeatPassword,setRepeatPassword]=useState(null);
    const[showCurrentEmail,setShowCurrentEmail]=useState(true);
    const classes = useStyles();
    // for border 
    const defaultProps = {
        bgcolor: 'background.paper',
        borderColor: '#e0e0e0',
        m: 3,
        border: 1,
        style: { width: '100%', height: '600px' },
      };
     useEffect(()=>{
         // custom rule will have name 'isPasswordMatch'
         ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
    })
    const handleSubmit=()=>{

    }
    let  usernameInput=null;
    const userNameHandlerToggle=()=>{
        let prevCurrentEmail=showCurrentEmail;
        setShowCurrentEmail(!prevCurrentEmail);
      usernameInput=input => input && input.focus()
    }
  return (
    <>
        <Container p={3} fixed>
        <Box  display="flex" justifyContent="center">
        <Box p={3} borderRadius="borderRadius" {...defaultProps} >
        <div  className={classes.rootGird} >
        <Grid  container spacing={1}>
        <Grid item xs={12} sm={6}>
            <ValidatorForm
                onSubmit={()=>handleSubmit()}
                onError={errors => console.log(errors)}
                className={classes.root}
            >
            <Grid container >
                <Grid item xs={12} sm={6}>
                    <img className={classes.media} src={image} alt="google.png"/>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <Typography className={classes.textWidth} fontWeight="fontWeightMedium" >
                    Create your Google Account
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                <TextValidator
                    label="First Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    color="primary"
                    value={firstName}
                    onChange={(event)=>setFirstName(event.target.value)}
                    name="firstname"
                    validators={['required']}
                    errorMessages={['First Name is required']}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextValidator
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(event)=>setLastName(event.target.value)}
                    name="lastname"
                    validators={['required']}
                    errorMessages={['Last Name is required']}
                />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    {showCurrentEmail ?
                <TextValidator
                    label="username"
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={usernameInput}
                    value={userName}
                    onChange={(event)=>setUserName(event.target.value)}
                    name="email"
                    InputProps={{
                        endAdornment:
                        <InputAdornment  position="end">@gmail.com</InputAdornment>
                        }}
                    validators={['required', 'isEmail']}
                    errorMessages={['Choose a Gmail address', 'email is not valid']}
                /> : 
                <TextValidator
                    label="Your Email Address"
                    variant="outlined"
                    inputRef={input => input && input.focus()}
                    size="small"
                    fullWidth
                    value={userName}
                    onChange={(event)=>setUserName(event.target.value)}
                    name="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['Choose a Gmail address', 'email is not valid']}
            />
                }
                    {/* <FormControl  >
                    <FilledInput
                    id="filled-adornment-password"
                    type='email'
                    value={userName}
                    validators={['required', 'isEmail']}
                    errorMessages={['Choose a Gmail address', 'email is not valid']}
                    onChange={(event)=>setUserName(event.target.value)}
                    />
                    </FormControl> */}
                </Grid>
            </Grid>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
            {showCurrentEmail ?
            <Button onClick={()=>userNameHandlerToggle()} className={classes.userNameButton} color="primary">Use my current email address instead</Button>
           :
            <Button onClick={()=>userNameHandlerToggle()} className={classes.userNameButton} color="primary">Create a new Gmail address instead</Button>
            }
            </Grid>
            </Grid>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
            <TextValidator
                    label="Password"
                    fullWidth
                    hintText="Password"
                    variant="outlined"
                    size="small"
                    onChange={(event)=>setPassword(event.target.value)}
                    name="password"
                    type="password"
                    validators={['required','matchRegexp:^[a-zA-Z\d!@#$%&*]{8,}$']}
                    errorMessages={['Enter a Password','Use 8 characters or more for your password']}
                    value={password}
                />
                <span>
                caption text
                </span>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextValidator
                    label="confirm"
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(event)=>setRepeatPassword(event.target.value)}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch']}
                    errorMessages={['password mismatch']}
                    value={repeatPassword}
                />
            </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit">Next</Button>
            </ValidatorForm>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </div>           
        </Box>
        </Box>
        </Container>
    </>
  );
}