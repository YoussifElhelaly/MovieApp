// console.log(auth.currentUser)

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { connectStorageEmulator } from "firebase/storage";
import { atom } from "recoil";
import FirebaseApp from "../FirebaseConfig";

const auth = getAuth()

let state = false

onAuthStateChanged(auth , async (user) => {
    if(user) {
        state = true
        console.log(state)
    }else {
        state = false
        console.log(state)
    }
})

const LoginState = atom({
    key: 'Login',
    default: state,
});

export default LoginState