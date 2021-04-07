import React, { useEffect, useState ,useRef } from 'react';
import './layout.css'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Box from '@material-ui/core/Box';
import image from '../../assets/google.png'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// styles. makestyles used as a wrapper, to assign the classes prop to our component.
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
      },
      boxPadding:{
          padding:'48px 40px 36px'
      }
  }));

const Layout=()=> {
    // useref for first name field focus whenever page render
    let firstNameInput = useRef(null);
    // for username fieled focus
    let emailInput = useRef(null);

    // states
    const[firstName,setFirstName]=useState(null);
    const[lastName,setLastName]=useState(null);
    const[userName,setUserName]=useState(null);
    const[password,setPassword]=useState(null);
    const[repeatPassword,setRepeatPassword]=useState(null);
    const[showCurrentEmail,setShowCurrentEmail]=useState(true);
    const[hidden,setHidden]=useState(true)
    const[passwordClass,setPasswordClass]=useState('Mui-error')
    const[emailClass,setEmailClass]=useState('Mui-error')
    const[hideGrid,setHideGrid]=useState(false)
    // for consume the styles
    const classes = useStyles();
    // for container border 
    const defaultProps = {
        bgcolor: 'background.paper',
        borderColor: '#e0e0e0',
        m: 3,
        border: 1,
        style: { width: '100%', height: '600px' },
      };
      // for confirm password it matches password if not then show error
      //add your own rules  addValidationRule()
     useEffect(()=>{
         // custom rule will have name 'isPasswordMatch'
         ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) return false
            return true;
        
        });
    })
    // for first name field focus only when first render page not again and agian 
    useEffect(()=>{
        firstNameInput.current.focus();
    },[])
    // onclick submit
    const handleSubmit=(event)=>{
        // for username below grid hiding
        setHideGrid(true)
    }
    let  usernameInput=null;
    // for handling button 
    // if user Create a new Gmail address instead
    // else Use my current email address instead
    // for toggling button
    const userNameHandlerToggle=()=>{
        let prevCurrentEmail=showCurrentEmail;
        setShowCurrentEmail(!prevCurrentEmail);
    //   usernameInput=input => input && input.focus()
        // for focusing username field
        // emailInput.current.focus()
    }
    // for showing hidden password  onclick show password checkbox 
    const handleClickShowPassword=()=>{
        let prevHidden=hidden;
        setHidden(!prevHidden);
    }
    // for password  two way  data binding
    const passwordHandler=(event)=>{
        setPassword(event.target.value)
        // if password error occurs then hide the grid
        setPasswordClass(event.target.classList.contains(passwordClass))
    }
    const handlerEmail=(event)=>{
        // two data binding
        setUserName(event.target.value)
        // hiding grid when username occurs error
        setEmailClass(event.target.classList.contains(emailClass))
    }
  return (
    <>
        <Container p={3} maxWidth="md">
        <Box  display="flex" justifyContent="center">
        <Box className={classes.boxPadding} borderRadius="borderRadius" {...defaultProps} >
        <div  className={classes.rootGird} >
        <Grid  container spacing={1}>
        <Grid item xs={12} sm={6}>
            <ValidatorForm
                onSubmit={(event)=>handleSubmit(event)}
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
                    <Typography variant="h5" gutterBottom >
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
                    inputRef={firstNameInput}
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
                    value={lastName}
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
                    label="Username"
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={emailInput}
                    value={userName}
                    onChange={(event)=>handlerEmail(event)}
                    name="email"
                    InputProps={{
                        endAdornment:
                        <span  position="end">@gmail.com</span>
                        }}
                    validators={['required', 'isEmail','matchRegexp:^[a-zA-z0-9@.]{6,}$']}
                    errorMessages={['Choose a Gmail address', 'email is not valid','Sorry, your username must be between 6 and 30 characters long.']}
                /> : 
                <TextValidator
                    label="Your Email Address"
                    variant="outlined"
                    inputRef={input => input && input.focus()}
                    size="small"
                    fullWidth
                    value={userName}
                    onChange={(event)=>handlerEmail(event)}
                    name="email"
                    validators={['required', 'isEmail','matchRegexp:^[a-zA-z0-9@.]{6,}$']}
                    errorMessages={['Choose a Gmail address', 'email is not valid','Sorry, your username must be between 6 and 30 characters long.']}
            />
                } 
                {emailClass ?
                <span>
                You'll need to confirm that this email belongs to you.
                </span> :null}
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
            <Grid item xs={12} sm={12}>
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
                    onChange={(event)=>passwordHandler(event)}
                    name="password"
                    type={ hidden ? 'password' : 'text'}
                    validators={['required','matchRegexp:^[a-zA-Z\d!@#$%&*]{8,}$']}
                    errorMessages={['Enter a Password','Use 8 characters or more for your password']}
                    value={password}
                />
                
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextValidator
                    label="confirm"
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(event)=>setRepeatPassword(event.target.value)}
                    name="repeatPassword"
                    type={ hidden ? 'password' : 'text'}
                    validators={['isPasswordMatch']}
                    errorMessages={['Password Mismatch']}
                    value={repeatPassword}
                />
            </Grid>
            </Grid>
            {passwordClass ?  
            <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <span>
                    Use 8 or more characters with a mix of letters, numbers & symbols
                </span>
            </Grid>
            </Grid>
            :null
            }
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                 <FormControlLabel
                control={
                    <Checkbox
                    name="checkedB"
                    color="primary"
                    onClick={()=>handleClickShowPassword()}
                    />
                }
                label="Show password"
                />
            </Grid>
            </Grid>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Button  className={classes.userNameButton} color="primary">Sign in instead</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" type="submit">Next</Button>
            </Grid>
            </Grid>
            </ValidatorForm>
        </Grid>
        <Grid item xs={12} sm={6}>
        
        <Box display="flex" justifyContent="center" m={1} p={1} >
        <Box p={1} >
        <figure ><img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="244" height="244"/>
            <figcaption className="figCaption">One account. All of Google working for you.</figcaption>
        </figure>
        </Box>
      </Box>
        </Grid>
      </Grid>
    </div>           
        </Box>
        </Box>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </Grid>
        </Grid>
        </Container>
    </>
  );
}
export default Layout;