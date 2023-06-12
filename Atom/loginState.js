// console.log(auth.currentUser)

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { connectStorageEmulator } from "firebase/storage";
import { atom } from "recoil";
import FirebaseApp from "../FirebaseConfig";

let state = false

const LoginState = atom({
    key: 'Login',
    default: state,
});

export default LoginState