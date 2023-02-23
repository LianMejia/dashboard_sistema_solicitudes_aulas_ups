import React, { useState, useEffect } from 'react'
import { Box, CssBaseline } from '@mui/material';
import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Header } from '../components/appbar/Header';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { auth } from '../firebase'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { authState } from '../redux/actions/account/authActions';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SolicitudesSoportePage } from '../pages/solicitudes/SolicitudesSoportes/SolicitudesSoportePage';
import { CrearUsuario } from '../pages/usuarios/CrearUsuario';
import { ListaUsuarios } from '../pages/usuarios/ListaUsuarios';
export const AppRouters = () => {
    let theme = createTheme({
        typography: {
            fontFamily: 'Raleway, Arial',
        },
        palette: {
            primary: {
                main: '#6b3bce',
                //main: '#6941C6',
            },
            // background: {
            //     //default: '#f6f9ff'
            // }
        },
    });
    theme = responsiveFontSizes(theme);
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            if (userAuth) {

                const authUser = auth.currentUser;


                console.log(userAuth, 'auth')
                userAuth.getIdTokenResult().then(getIdTokenResult => {
                    var rol = getIdTokenResult.claims.rol
                    var departamento = getIdTokenResult.claims.departamento
                    var cargo = getIdTokenResult.claims.cargo
                    console.log(userAuth.displayName)
                    dispatch(authState({
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                        email: userAuth.email,
                        photoURL: userAuth.photoURL,
                        rol: rol,
                        departamento: departamento,
                        cargo: cargo
                    }))
                })
                setIsAuth(true)

            } else {
                setIsAuth(false)
            }
            setChecking(false);
        });
    }, [setIsAuth, setChecking])
    if (checking) {
        return ('')
    }
    return (
        <HashRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ display: 'flex' }}>
                    {isAuth && <Header />}
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 0, width: isAuth ? { sm: `calc(100% - ${300}px)` } : '100%' }}
                    >
                        <Toolbar />
                        <Routes>
                            <Route path='/' element={
                                <PrivateRoute isAuth={isAuth}>
                                    <HomePage />
                                </PrivateRoute>
                            } />

                            <Route path='/account/login/' element={
                                <PublicRoute isAuth={isAuth}>
                                    <LoginPage />
                                </PublicRoute>
                            } />

                            <Route path="solicitudes">
                                <Route path='soportes' element={
                                    <PrivateRoute isAuth={isAuth}>
                                        <SolicitudesSoportePage />
                                    </PrivateRoute>
                                } />
                            </Route>

                            <Route path="usuarios">
                                <Route path='crear-usuario' element={
                                    <PrivateRoute isAuth={isAuth}>
                                        <CrearUsuario />
                                    </PrivateRoute>
                                } />

                                <Route path='lista-de-usuarios' element={
                                    <PrivateRoute isAuth={isAuth}>
                                        <ListaUsuarios />
                                    </PrivateRoute>
                                } />

                            </Route>

                        </Routes>
                    </Box>
                </Box>
            </ThemeProvider>
        </HashRouter>
    )
}