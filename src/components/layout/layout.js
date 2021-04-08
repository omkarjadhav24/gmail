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
import Link from '@material-ui/core/Link';
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
         textTransform:'none' ,
         color:'#1a73e8'
      },
      boxPadding:{
         padding:'0px 40px 36px'
      },
      spanText:{
        fontFamily:'"Google Sans",Roboto,Arial,sans-serif',
        color: '#5f6368',
        marginLeft:'16px'
      },
      spanTextForUsername:{
        fontFamily:'"Google Sans",Roboto,Arial,sans-serif',
        color: '#202124',
        fontSize:'14px'
      },
      cpationForFigure:{
          fontSize:'16px',
          fontWeight:'300',
          width:'200px',
          marginLeft:'65px'
              },
      usernameSpanHide:{
          display:'none'
      },
      h1Tag:{
        fontFamily:'"Noto Sans Myanmar UI",arial,sans-serif'
    },
    checkBoxLabel:{
        fontSize:'0.9rem'
    }
  }));

const Layout=()=> {
    // useref for first name field focus whenever page render
    let firstNameInput = useRef(null);
    // for username fieled focus
    let emailInput = useRef(null);
     // for consume the styles
     const classes = useStyles();
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
    const[hideSpan,setHideSpan]=useState(false)
    const[displayNoneSpan,setDisplayNoneSpan]=useState('')
    // for container border 
    const defaultProps = {
        bgcolor: 'background.paper',
        borderColor: '#e0e0e0',
        m: 3,
        border: 1,
        margin:'30px',
        borderRadius:'9px',
        style: { width: '748px', height: '570px' ,marginLeft:'80.500px',marginRight:'80.500px' },
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
    }
    // hiding span tag below username and password onclicl next button
    const hideSpanHandler=()=>{
         // for hiding hint span below username and password
         setHideSpan(true)
         setDisplayNoneSpan(classes.usernameSpanHide)
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
                    {/* <h1 className={classes.h1Tag}><span>Create your Google Account</span></h1> */}
                    <Typography  className={classes.h1Tag} variant="h5" >
                    Create your Google Account
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                <TextValidator
                    label="First name"
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
                    label="Last name"
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
                <>
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
                        <span className={classes.spanTextForUsername} position="end">@gmail.com</span>
                        }}
                    validators={['required', 'isEmail','matchRegexp:^[a-zA-z0-9@.]{6,}$']}
                    errorMessages={['Choose a Gmail address', 'email is not valid','Sorry, your username must be between 6 and 30 characters long.']}
                />
                  {emailClass ?
                <span  className={hideSpan ? displayNoneSpan :classes.spanText} >
               {hideSpan ?null:<>You can use letters, numbers & periods</> }
                </span> :null}
                </>
                : 
                <>
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
            /><span className={classes.spanText}>You'll need to confirm that this email belongs to you.</span>
                </>
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
                    label="Confirm"
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
            {hideSpan  ? 
                    null
                 :
                 <span className={classes.spanText}>
                Use 8 or more characters with a mix of letters, numbers & symbols
                </span>
            }
           
            </Grid>
            {/* {passwordClass ?  
            <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
               
            </Grid>
            </Grid>
            :null
            } */}
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                 <FormControlLabel
                control={
                    <>
                    <Checkbox
                    name="checkedB"
                    color="primary"
                    onClick={()=>handleClickShowPassword()}
                    />
                    <span>Show password</span>
                    </>
                }
                />
                
            </Grid>
            </Grid>
            <Grid container spacing={1}>
                <div style={{ width: '100%' }}>
                <Box display="flex" p={1} bgcolor="background.paper">
                <Box p={1} flexGrow={1} >
                <Button  className={classes.userNameButton} color="primary">Sign in instead</Button>
                </Box>
                <Box p={1} >
                <Button  onClick={()=>hideSpanHandler()} variant="contained"  id="MuiButtoncontained" type="submit">Next</Button>
                </Box>
                </Box>
                </div>
            </Grid>
            </ValidatorForm>
        </Grid>
        <Grid item xs={12} sm={6}>
        
        <Box display="flex" justifyContent="center" m={1} p={1} >
        <Box  id="imgDiv" >
        <figure ><img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="244" height="244"/>
        </figure>
        <figcaption  style={{textAlign: 'center'}} className={classes.cpationForFigure}>One account. All of Google working for you.</figcaption>
        </Box>
      </Box>
        </Grid>
      </Grid>
    </div>           
        </Box>
        </Box>
        <Grid  style={{marginLeft:"80.500px",marginRight:"80.500px"}} container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="start"   >
                <Box>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="end"  >
                <Box>
                   <ul style={{listStyle:"none",display:'inline-flex',textDecoration:'none'}} >
                       <li style={{marginLeft:'20px'}}> <a href="#">Help</a> </li>
                       <li style={{marginLeft:'40px'}}> <a href="#">Privacy</a> </li>
                       <li style={{marginLeft:'40px'}}> <a href="#">Terms</a> </li>
                   </ul>
                </Box>
                </Box>
            </Grid>
        </Grid>
        </Container>
    </>
  );
}
export default Layout;