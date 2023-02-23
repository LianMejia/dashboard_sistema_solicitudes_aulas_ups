import { TextField, Grid, Box, Paper, Button, Select, MenuItem, Divider } from "@mui/material"
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db, auth, firebase } from '../../firebase';
import Swal from "sweetalert2";

export const CrearUsuario = () => {

    const userAuth = useSelector(state => state.userAuth)

    const { userInfo } = userAuth

    const [name, setName] = useState('')
    const [cedula, setCedula] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cargo, setCargo] = useState('')

    const registerUserWithEmailAndPassword = async () => {
        try {
            const resp = await auth.createUserWithEmailAndPassword(email, password);
            console.log(resp)
            console.log(resp[0])
            Swal.fire({ icon: "success", text: "Se ha creado el nuevo usuario con exito", });
            db.collection('usuarios').doc(email).set({
                email: email,
                name: name.toUpperCase(),
                displayName: name.toUpperCase(),
                cargo: cargo,
                photo: '',
                uid: email,
                password: password,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                user_created: userInfo.displayName
            })
            setName('')
            setCedula('')
            setEmail('')
            setPassword('')
            setCargo('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box px={2} py={2}>
                <Paper elevation={3}>
                    <Box px={2} py={2}>
                        <p style={{ marginBottom: "10px", marginTop: "0px" }}><strong>CREAR NUEVO USUARIO</strong></p>
                        <Grid container spacing={5}>

                            <Grid item xs={6}>
                                <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>NOMBRE:</strong></p>

                                <TextField
                                    sx={{
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                    }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    size="small"
                                    fullWidth
                                />

                                <Box py={2}>
                                    <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>CARGO:</strong></p>
                                    <Select
                                        sx={{
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        label="MOTIVO DEL RECHAZO"
                                        size="small"
                                        fullWidth
                                        value={cargo}
                                        onChange={(e) => setCargo(e.target.value)}
                                    >
                                        <MenuItem value="PROFESOR">PROFESOR</MenuItem>
                                        <MenuItem value="MANTENIMIENTO">MANTENIMIENTO</MenuItem>
                                    </Select>
                                </Box>

                                {/* <Box py={2}>
                                    <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>CEDULA:</strong></p>

                                    <TextField
                                        sx={{
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        value={cedula}
                                        onChange={(e) => setCedula(e.target.value)}
                                        name="cedula"
                                        size="small"
                                        fullWidth
                                    />
                                </Box> */}

                                {/* <Box py={2}>
                                    <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>CONTRASEÑA:</strong></p>

                                    <TextField
                                        sx={{
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        size="small"
                                        fullWidth
                                    />
                                </Box> */}
                            </Grid>

                            <Grid item xs={6}>

                                <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>CEDULA:</strong></p>
                                <TextField
                                    sx={{
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                    }}
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    name="cedula"
                                    size="small"
                                    fullWidth
                                />

                                {/* <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>CORREO INSTITUCIONAL:</strong></p>

                                <TextField sx={{
                                    '& legend': { display: 'none' },
                                    '& fieldset': { top: 0 },
                                }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    size="small"
                                    fullWidth
                                /> */}

                            </Grid>

                        </Grid>

                        <Divider />

                        <Grid container spacing={5}>

                            <Grid item xs={6}>

                                <Box py={2}>
                                    <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>CORREO INSTITUCIONAL:</strong></p>
                                    <TextField sx={{
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                    }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        size="small"
                                        fullWidth
                                    />
                                </Box>

                            </Grid>

                            <Grid item xs={6}>

                                <Box py={2}>
                                    <p style={{ fontSize: "11px", marginBottom: "10px", marginTop: "0px" }}><strong>CONTRASEÑA:</strong></p>

                                    <TextField
                                        sx={{
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        size="small"
                                        fullWidth
                                    />
                                </Box>


                            </Grid>

                        </Grid>

                        <Button onClick={() => registerUserWithEmailAndPassword()} variant="contained" color="primary" size="small" fullWidth>Crear usuario</Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}