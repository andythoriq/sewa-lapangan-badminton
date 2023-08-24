import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';


const Login =()=> {
    const paperStyle ={padding:20,height:'70vh',width:380, margin:"50px auto"}
    const avatarStyle = {backgroundColor: '#2196f3'}
    const btnstyle={margin:'10px 0'}
    const formpass={margin: '10px 0'}
    return (
        <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label="Username" placeholder="Enter Username" fullWidth required/>
                <TextField label="Password" placeholder="Enter Password" type='password' style={formpass}fullWidth required/>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
                </FormGroup>
                <Button type='submit' variant="contained" color='primary' style={btnstyle} fullWidth>Sign In</Button>
                <Typography>
                    <Link href="#">
                        Forgot Password?
                    </Link>
                </Typography>
            </Paper>
        </Grid>
        </>
     );
}
 
export default Login;