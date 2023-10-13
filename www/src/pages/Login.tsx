import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Box, Button, Paper, Snackbar, Stack, TextField } from "@mui/material";
import React from "react";
import axios from "axios";

export default function Login() {
    document.title = "Pet Advisor | Login"
    
    const [loginData] = React.useState({
        username: "",
        password: ""
    });
    const [missingOpen, setMissingOpen] = React.useState(false);
    const [incorrectOpen, setIncorrectOpen] = React.useState(false);
    const [usernameFilled, setUsernameFilled] = React.useState(true);
    const [passwordFilled, setPasswordFilled] = React.useState(true);

    const displayLoginError = () => {
        setIncorrectOpen(true);
    };
    
    const displayMissingError = () => {
        setMissingOpen(true);
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIncorrectOpen(false);
        setMissingOpen(false);
    };

    const handleChangeForm = (event: React.SyntheticEvent) => {
        let target = (event.target as HTMLTextAreaElement)

        if(target.name === "username"){
            loginData.username = target.value
            if(target.value){
                setUsernameFilled(true);
            }
        }else if(target.name === "password"){
            loginData.password = target.value
            if(target.value){
                setPasswordFilled(true);
            }
        }
    }

    function login(): void {
        setUsernameFilled(loginData.username !== "")
        setPasswordFilled(loginData.password !== "")

        if(loginData.username && loginData.password){
            let data = new FormData();
            data.append('username', loginData.username);
            data.append('password', loginData.password);
            data.append('grant_type', 'password');
            data.append('client_id', import.meta.env.VITE_CLIENT_ID)
            data.append('client_secret', import.meta.env.VITE_CLIENT_SECRET)
    
            axios({
                url: "http://localhost:8000/o/token/",
                method: "POST",
                data: data,
            })
                .then((res) => {
                    sessionStorage.setItem("apiKey", res.data["access_token"]); 
                    window.location.replace("/dashboard");
                })
                .catch((err) => {
                    console.log(err.message);
                    setMissingOpen(false)
                    displayLoginError();
                });
        }else{
            setIncorrectOpen(false);
            displayMissingError();
        }
    }

    return (
        <>
            <Snackbar open={incorrectOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} variant="filled">
                Incorrect login credentials.
                </Alert>
            </Snackbar>
            <Snackbar open={missingOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} variant="filled">
                Missing login credentials.
                </Alert>
            </Snackbar>
            <div style={{margin: "auto"}}>
                <Box component="form" autoComplete="on">
                    <Paper elevation={1} sx={{width: "25em"}}>
                        <Stack sx={{textAlign: "center", margin: 2}}>
                            <FontAwesomeIcon icon={faPaw} size="5x"/>
                            <h2>Login</h2>
                            <TextField id="username-field" label="Username" variant="standard" name="username" onChange={ handleChangeForm } required={ true } error={ !usernameFilled }/>
                            <TextField id="password-field" label="Password" variant="standard" type="password" name="password" onChange={ handleChangeForm } required={ true } error={ !passwordFilled } />
                        </Stack>
                        <Box sx={{p: 2}}>
                            <Button variant="outlined" sx={{marginRight: 2}} onClick={ login }>Login</Button>
                            <Button variant="outlined" href="/register" disabled={ true }>Register</Button>
                        </Box>
                    </Paper>
                </Box>
            </div>
        </>
    )  
}