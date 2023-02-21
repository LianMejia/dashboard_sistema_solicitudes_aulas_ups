import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import edificio_f from './../assets/edificio_f.jpg'
import Logo_ups from './../assets/Logo_ups.png'

const theme = createTheme();

export const LoginPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                {/* FORM */}

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box pb={2}>
                            <img width={250} src={Logo_ups} alt="" />
                        </Box>
                        <Paper elevation={3}>
                            <Box component="form" px={2} pb={2} pt={1}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="correo"
                                    label="Correo"
                                    name="correo"
                                    size='small'
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    size='small'
                                />
                                <Box py={2}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size='small'
                                    >
                                        Iniciar sesion
                                    </Button>
                                </Box>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
                {/* BACKGROUND IMAGE */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${edificio_f})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </ThemeProvider>
    );
}