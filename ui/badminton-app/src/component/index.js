import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Visibility } from "@mui/icons-material";
import React, { useState } from "react";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "50px auto",
  };
  const [isShowPasswod, setIsShowPassword] = useState(false);
  const btnstyle = { margin: "1rem 0" };
  const formpass = { margin: "10px 0" };
  return (
    <>
      <Grid style={{ borderRadius: "10px" }}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar alt="BFB" src="/bfb.png" sx={{ width: 200, height: 200 }} />
          </Grid>
          <TextField label="Username" placeholder="Enter Username" color="error" fullWidth required />
          <div style={{ display: "flex", width: "100%", position: "relative" }}>
            <TextField label="Password" placeholder="Enter Password" type={isShowPasswod ? "text" : "password"} color="error" style={formpass} fullWidth required />
            <div style={{ position: "absolute", 
                          right: 15, 
                          top: 28, 
                          cursor: "pointer",
                          }} onClick={() => setIsShowPassword(!isShowPasswod)}>
              <Visibility fontSize="small"/>
            </div>
          </div>
          <Typography style={formpass}>
            <Link href="#" color="error">
              Forgot Me?
            </Link>
          </Typography>
          <Button type="submit" variant="contained" color="error" style={btnstyle} fullWidth>
            Sign In
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
