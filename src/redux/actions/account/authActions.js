import { auth, db, firebase } from '../../../firebase'
export const authState = (formData) => ({
    type: 'AUTH_SUCCESS',
    payload: {
        uid: formData.uid,
        displayName: formData.displayName,
        email: formData.email,
        photoURL: formData.photoURL,
        rol: formData.rol,
        departamento: formData.departamento,
        cargo: formData.cargo
    }
})
export const login = (formData) => async (dispatch) => {
    try {
        dispatch({type: 'USER_LOGIN_REQUEST'})
        const sign = await auth.signInWithEmailAndPassword(formData.email, formData.password)
        console.log('datos del long', sign.user.emailVerified)
        //if (sign.user.emailVerified === true) {
            console.log(sign.user.emailVerified)
            const user = {
                uid: sign.user.uid
            }

            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                payload: user
            })
        //} else {
        //    dispatch({
        //        type: 'USER_LOGIN_FAIL',
        //        payload: 'Debe verificar su cuenta antes de iniciar sesión',
        //    })
        //}
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error,
        })
    }
}