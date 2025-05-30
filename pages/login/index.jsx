import styles from '../../styles/Home.module.css'
import { signOut, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, getRedirectResult } from "firebase/auth"
import Swal from "sweetalert2";
import { useRecoilState, useRecoilValue } from "recoil";
import LoginState from "../../Atom/loginState";

import UserInfo from "../../Atom/user";
import { useEffect, useState } from "react";
import FirebaseApp from '../../FirebaseConfig';
import { Router, useRouter } from 'next/router';

export default function login() {

    const auth = getAuth(FirebaseApp)
    const google = new GoogleAuthProvider()
    const [LogState, setLogState] = useRecoilState(LoginState)
    const face = new FacebookAuthProvider()
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)
    let router = useRouter()


    useEffect(() => {
        if (LogState === true) {
            router.push("/profile")
        }
    }, [LogState])

    async function login_pro(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                text: `Welcome ${auth.currentUser.displayName}`,
                showConfirmButton: false,
                timer: 1500
            })
            setLogState(true)
            localStorage.setItem("log", true)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error?.code?.split("/")[1]}`,
            })
        }
    }


    useEffect(() => {
        onAuthStateChanged(auth, user => {
            const userCopy = JSON.parse(JSON.stringify(user));
            setUserInfo(userCopy);
        })
    }, [setUserInfo])

    function loginVal(email, pass) {
        if (email.value === "" || pass.value === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Please Fill Your Forms`,
            })
        } else if (!(email.value.includes("@"))) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Your Email Must Contain "@"`,
            })
        } else if (pass.value.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Your password Less than 6 Chracter`,
            })
        }
        else {
            login_pro(email.value, pass.value)
        }
    }

    return (
        <section className={`${styles.home} login h-screen`}>
            <div className="container mx-auto py-40 h-full flex items-center flex-col justify-center">
                <div className="form w-2/4 mx-auto flex justify-center flex-col">
                    <label>Email</label>
                    <input id="email" type="email" required className="mb-5 border-[1px] bg-transparent px-3 py-3 rounded" placeholder="Enter Your Email" />
                    <label>Password</label>
                    <input id="password" type="password" required className="mb-5 border-[1px] bg-transparent px-3 py-3 rounded" placeholder="Enter your Password" />
                    <div className="actions  flex items-center">
                        <div className="other">
                            <button className="text-[#dd003f] text-xl font-bold" onClick={() => {
                                sendPasswordResetEmail(auth, "youssif.elhelaly@gmail.com")
                            }}>Forget Password ?</button>
                        </div>
                        <button className="ml-auto bg-[#dcf836] text-black font-bold text-xl px-4 py-2 rounded-full" onClick={(e) => {
                            e.preventDefault()
                            let email = document.getElementById("email")
                            let password = document.getElementById("password")
                            loginVal(email, password)
                        }}>Log In</button>
                    </div>
                </div>
                <div className="social my-5">
                    <h2>You can Login with :</h2>
                    <div className="icons flex justify-center items-center">
                        <i class="fa-brands fa-google text-4xl my-5 text-[#dd4b39] cursor-pointer" onClick={async () => {
                            try {
                                await signInWithPopup(auth, google)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Login Success',
                                    text: `Welcome ${auth.currentUser.displayName}`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setLogState(true)
                                console.log(userInfo)
                            } catch (error) {
                                console.log(error)
                            }
                        }}></i>
                        {/* <i class="fa-brands fa-facebook text-4xl text-[#1877f2] cursor-pointer" onClick={async () => {
                            try {
                                await signInWithPopup(auth, face)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Login Success',
                                    text: `Welcome ${auth.currentUser.displayName}`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } catch (error) {
                                console.log(error)
                            }
                        }}></i> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
