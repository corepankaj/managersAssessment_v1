import React,{useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Button, Card, CardContent, Input, IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import '../assets/css/index.css';
import Alert from './Alert.jsx';
import { LoginUser } from '../redux/actions/Auth';
import {YearChanged,ShowPage,QuarterChanged } from '../redux/actions/Page';

import { CSSLogin } from './styles/CSSLogin';


const Login = ({serverError, LoginUser, ShowPage,YearChanged,QuarterChanged})=> {
    const classes = CSSLogin();
    const [email, setMail] = useState('');
    const [password, setPassword] = useState({value:'', show:false});
    const [error, setError] = useState('');
    
    const submitHandler = () => {
        let err = ''
        err = (email.search('@') == -1 || email.length <= 4 || email.search('.') == -1) ? 
            'please enter valid email address' : (password.value.length<6)?'please enter valid password':'';
        err.length<=0 ? LoginUser({email, password:password.value}) : setError(err);
    }

    const [valueOne, setValueOne] = React.useState('selelct Year');
    const handleYearChange = (event) => {
        setValueOne(event.target.value);
        YearChanged(event.target.value);
      }

    
    const [valueTwo, setValueTwo] = React.useState('select Quarter');
    const handleQuarterChange = (event) => {
        setValueTwo(event.target.value);
        QuarterChanged(event.target.value);
      }

    return (

        
        <Grid container className={classes.root} direction="column" justify="center" alignItems="center">
            <Card className={classes.card}>
           
                <CardContent className={classes.content}>

                    <div>
                    <select value={valueOne}  onChange={handleYearChange} style={{width:120, height:30}}>
                       <option value="">select Year</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                    </div>

                    <div>
                    <select value={valueTwo}  onChange={handleQuarterChange} style={{width:120, height:30}}>
                    <option value="">select Quarter</option>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="Q4">Q4</option>
                    </select>
                    </div>

                    <div>
                        <label className={classes.label}>Email Address:</label>
                        <input className={classes.input} style={{width:390}} name="email" value={email} type="text" onChange={(evt)=>setMail(evt.currentTarget.value)} 
                            placeholder="please enter valid email" />
                    </div>

                    <div>
                        <label className={classes.label}>Password:</label>
                        <OutlinedInput style={{width:400, height:40}} type={password.show ? 'text' : 'password'} value={password.value}
                                onChange={(evt) => setPassword({...password, value:evt.target.value})} placeholder="please enter your password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton size="small" aria-label="toggle password visibility" onClick={()=>setPassword({...password, show:!password.show})} onMouseDown={(evt)=>evt.preventDefault()} >
                                        {password.show ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment> 
                            } 
                        />
                        <label className={classes.placeholder}>password lenght should atleast contain 6 letters and numbers</label>
                    </div>

                    <div className={classes.btnHolder}>
                        <Button className={classes.btn} variant="contained" color="primary"
                                onClick={submitHandler} >Login</Button>

                        <Button className={classes.btn} variant="contained"
                            onClick={()=>ShowPage('Register')} >Register</Button>
                    </div>

                    <div className={classes.fpass}>
                        <Button color="primary" onClick={()=>ShowPage('ForgetPassword')}>forget password</Button>
                    </div>
                    
                </CardContent>
            </Card>
            {
                (error && error.length>=5) || (serverError && serverError.length >= 5) && 
                <Alert className={classes.alert} severity="error">{ (error.length>=4 && error) || serverError }</Alert>
            }
            
        </Grid>
    )
}

const stateToProps = state => {
    return {
        serverError:state.auth.serverError
    }
}

Login.propTypes = {
    serverError:PropTypes.string,
    LoginUser:PropTypes.func.isRequired,
    ShowPage:PropTypes.func.isRequired,
    QuarterChanged:PropTypes.func.isRequired,
    YearChanged:PropTypes.func.isRequired  
}

export default connect(stateToProps, {LoginUser,QuarterChanged,ShowPage,YearChanged})(Login);