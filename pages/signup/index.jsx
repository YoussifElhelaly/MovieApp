import Link from "next/link";
import FirebaseApp from "../../FirebaseConfig";
import styles from '../../styles/Home.module.css'
import { signOut, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import Swal from "sweetalert2";
import { useRecoilState, useRecoilValue } from "recoil";
import LoginState from "../../Atom/loginState";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function signup() {
    const auth = getAuth()
    const google = new GoogleAuthProvider()
    const [LogState, setLogState] = useRecoilState(LoginState)
    let router = useRouter()



    async function signup(email, pass, userName) {
        try {
            await createUserWithEmailAndPassword(auth, email, pass)
            await updateProfile(auth.currentUser, { displayName: userName, photoURL: "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black.png" })
            setLogState(true)
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.code.split("/")[1]}`,
            })
            console.log(error)
        }
    }

    function val(email, pass, passCon, userName, emailCon) {
        if (email.value === "" ||
            pass.value === "" ||
            passCon.value === "" ||
            userName.value === "" ||
            emailCon.value === "") {
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
        } else if (emailCon.value !== email.value) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Your Confirmation email wrong`,
            })
        } else if (pass.value.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Your password Less than 6 Chracter`,
            })
        } else if (passCon.value !== pass.value) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Your Confirmation Password wrong`,
            })
        }
        else {
            signup(email.value, pass.value, userName.value)
        }
    }

    useEffect(() => {
        if (LogState === true) {
            router.push("/profile")
        }
    }, [LogState])

    return (
        <section className={`${styles.home} signup h-screen pt-[85px]`}>
            <div className="container mx-auto py-40  h-full flex items-center flex-col justify-center">
                <div className="form w-2/4 mx-auto flex justify-center flex-col">
                    <label>User Name</label>
                    <input id="userName" type="userName" required className="mb-5 border-[1px] bg-transparent px-3 py-3 rounded" placeholder="Enter Your userName" />
                    <label>Email</label>
                    <input id="email" type="email" required className="mb-5 border-[1px] bg-transparent px-3 py-3 rounded" placeholder="Enter Your Email" />
                    <label>Confirm Email</label>
                    <input id="confirmEmail" type="email" required className="mb-5 border-[1px] bg-transparent px-3 py-3 rounded" placeholder="Retype Your Email" />
                    <label>Password</label>
                    <input id="password" type="password" required className="mb-5 border-[1px] bg-transparent px-3 py-3 rounded" placeholder="Enter your Password" />
                    <label>Confirm Password</label>
                    <input id="confirmPassword" type="password" required className="mb-5 border-[1px] bg-transparent px-3 py-3 rounded" placeholder="Retype your Password" />
                    <div className="actions flex items-center">
                        <div className="other">
                            <p>
                                Already have an account
                                <button className="text-[#dd003f] text-xl font-bold" onClick={() => {
                                    sendPasswordResetEmail(auth, "youssif.elhelaly@gmail.com")
                                }}> Login</button>
                            </p>
                        </div>
                        <button className="ml-auto bg-[#dcf836] text-black font-bold text-xl px-4 py-2 rounded-full" onClick={() => {
                            let userName = document.getElementById("userName")
                            let email = document.getElementById("email")
                            let confirmEmail = document.getElementById("confirmEmail")
                            let password = document.getElementById("password")
                            let confirmPassword = document.getElementById("confirmPassword")
                            val(email, password, confirmPassword, userName, confirmEmail)
                        }}>Log In</button>
                        <p onClick={() => {
                            signOut(auth)
                        }}>logout </p>
                    </div>
                </div>
                <div className="social my-5">
                    <h2>You can SignUp with :</h2>
                    <div className="icons flex justify-between items-center">
                        <i class="fa-brands fa-google text-4xl my-5 text-[#dd4b39]" onClick={async () => {
                            try {
                                await signInWithPopup(auth, google)
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
                        }}></i>
                        <i class="fa-brands fa-facebook text-4xl text-[#1877f2]"></i>
                    </div>
                </div>
            </div>
        </section>
    )
}
