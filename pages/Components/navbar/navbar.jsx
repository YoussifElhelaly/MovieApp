import { useState } from 'react'
import styles from '../../../styles/navbar.module.css'
import logo from '../../../IMG/logo1.png'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LoginState from '../../../Atom/loginState'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import UserInfo from '../../../Atom/user'

function Navbar() {

    const router = useRouter();
    const auth = getAuth()
    const user = auth.currentUser
    const userInfo = useRecoilValue(UserInfo)
    const [mobileNav, setMobileNav] = useState(true)
    const logState = useRecoilValue(LoginState)
    // console.log(logState)
    // onAuthStateChanged(auth, (user) => {
    //     if(user) {
    //         setLogState(true)
    //     } else {
    //         setLogState(false)
    //     }
    // })

    return (
        <nav className={`${styles.nav} nav fixed w-full bg-[#0f2133] z-50`}>
            <div className="container mx-auto px-5 py-2 flex items-center">
                <Link href="../">
                    <Image className="" src={logo} alt="logo" />
                </Link>
                <i className="fa-solid fa-bars min-[1025px]:hidden ml-auto text-4xl" onClick={
                    () => {
                        setMobileNav(!mobileNav)
                    }
                }></i>
                <div className={`${mobileNav ? "" : styles.active} ${styles.res} lg:flex items-center justify-between w-full pl-2`} id="mobile">
                    <ul className="lg:flex mr-auto">
                        <Link href={"../"} className="m-5 text-md font-semibold">Home</Link>
                        <Link href={"../movie"} className="m-5 text-md font-semibold">Movies</Link>
                        <Link href={"../tv"} className="m-5 text-md font-semibold">Celebrities</Link>
                        <li className="m-5 text-md font-semibold">News</li>
                        <li className="m-5 text-md font-semibold">Community</li>
                    </ul>
                    <div className="right flex items-center justify-between flex-1 ">
                        <div className="search ml-auto mr-4 relative border-[1px] border-white rounded-md overflow-hidden">

                            <input type="Search" id='Search' placeholder='Search' className='bg-[#0f2133] text-white px-5 py-1 focus-visible:outline-none w-[200px] autofill:bg-red-800' />
                            <button onClick={(e) => {
                                let SearchInput = document.getElementById("Search")
                                e.preventDefault
                                let validSearch = /[a-z]/
                                if ((SearchInput.value).match(validSearch) !== null) {
                                    router.push(`../Search/${SearchInput.value}`)
                                }

                            }}>
                                <i className="fa-solid fa-magnifying-glass absolute pr-4 cursor-pointer right-0 top-1/2 -translate-y-1/2 bg-[#0f2133]"></i>
                            </button>

                        </div>
                        {
                            logState ?
                                <Link href="../profile" className="user flex items-center justify-end">
                                    <h2 className='mr-4'>{userInfo.displayName}</h2>
                                    <img src="https://lh3.googleusercontent.com/a/AEdFTp51NtOdjuF5y9mX2A2Of5JVEDh1Yb1-iGLzrtTKdA=s96-c" alt="user photo" className='w-[50px] rounded-full' />
                                </Link>
                                : <div className="login text-end">
                                    <Link href="../login">LOG IN</Link>
                                    <button className="bg-[#dd003f] rounded-full px-5 h-fit py-2 ml-4">SignUp</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar