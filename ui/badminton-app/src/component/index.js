import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import Link from '@mui/material/Link';
const Login =()=> {
    const paperStyle ={
      padding:20,
      height:'70vh',
      width:380, 
      margin:"50px auto"
    }
    const btnstyle={margin:'1rem 0'}
    const formpass={margin: '10px 0'}
    return (
        <>
        <Grid style={{'borderRadius':'10px'}}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                <Avatar
                  alt="BFB"
                  src="/bfb.png"
                  sx={{ width: 100, height: 100 }}
                />     
                </Grid>
                <TextField label="Username" placeholder="Enter Username" color="error" fullWidth required/>
                <TextField label="Password" placeholder="Enter Password" type='password' color="error" style={formpass}fullWidth required/>
                <Typography style={formpass}>
                  <Link href="#" color="error">
                    Forgot Me?
                  </Link>
                </Typography>
                <Button type='submit' variant="contained" color='error' style={btnstyle} fullWidth>Sign In</Button>
            </Paper>
        </Grid>
        </>
     );
}
 
export default Login;