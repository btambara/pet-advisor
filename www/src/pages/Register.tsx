import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack, Paper, TextField, Box } from "@mui/material";

export default function Login() {
    document.title = "Pet Advisor | Login"
    
    return (
        <>
            <div style={{margin: "auto"}}>
                <Paper elevation={1} sx={{width: "25em"}}>
                    <Stack sx={{textAlign: "center", margin: 2}}>
                        <FontAwesomeIcon icon={faPaw} size="5x"/>
                        <h2>Register</h2>
                        <TextField id="standard-basic" label="Username" variant="standard" />
                        <TextField id="standard-basic" label="Password" variant="standard" type="password"/>
                    </Stack>
                    <Box sx={{p: 2}}>
                        <Button variant="outlined" sx={{marginRight: 2}}>Submit</Button>
                        <Button variant="outlined" href="/login">Cancel</Button>
                    </Box>
                </Paper>
            </div>
        </>
      )    
}