import { atom } from "recoil";

let state = false

const LoginState = atom({
    key: 'Login',
    default: state,
});

export default LoginState