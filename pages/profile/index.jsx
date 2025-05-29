import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRecoilState, useRecoilValue } from "recoil";
import LoginState from "../../Atom/loginState";
import UserInfo from "../../Atom/user";
import FirebaseApp from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import img from '../../IMG/slider-bg.jpg'
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import Image from "next/image";
import { doc, getDoc, getDocFromCache, getFirestore, setDoc } from "firebase/firestore";
import userLater from "../../Atom/Later";
import Later from "../../Atom/Later";
import Fav from "../../Atom/Fav";
// import {storage} from "./firebase"
export default function Profile() {

    const auth = getAuth(FirebaseApp)
    const storage = getStorage(FirebaseApp)
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)
    const [logState, setLogState] = useRecoilState(LoginState)
    const [currentPage, setCurrentPage] = useState("profileInfo")
    const [userPhoto, setUserPhoto] = useState(auth?.currentUser?.photoURL)
    let user = auth?.currentUser
    let router = useRouter()
    const database = getFirestore(FirebaseApp);
    const [userFav, setUserFav] = useRecoilState(Fav)
    const [userLater, setUserLater] = useRecoilState(Later)

    function changePhoto() {
        let file = document.getElementById("file").files[0]
        const storageRef = ref(storage, `/${file.name}`);
        const uploadFile = uploadBytesResumable(storageRef, file)
        uploadFile.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            console.log(prog)
        }, (err) => {
            console.log(err)
        }, () => {
            getDownloadURL(uploadFile.snapshot.ref)
                .then((url) => {
                    updateProfile(user, { photoURL: url })
                    setUserPhoto(url)
                })

        }
        )
    }

    useEffect(() => {
        if (logState === false) {
            router.push("/login")
        }
    }, [logState])

    useEffect(() => {
        console.log(userFav)
        console.log(userLater)
    }, [userFav, userLater])

    // useEffect(() => {
    //     handelUserData()
    // }, [])

    function handelCurrentPage() {
        if (currentPage == "profileInfo") {
            return (
                <div className="profileInfo w-[90%] md:w-3/6">
                    <h2 className="text-4xl font-bold  mb-[70px]">{`${userInfo?.displayName}'s profile`}</h2>
                    <div className="detailsCard bg-[#0b1a2a] border-[#0f2133] border-4 p-5">
                        <div className="info">
                            <div className="form">
                                <h3>01.PROFILE DETAILS</h3>
                                <div className="inputGroup flex flex-col">
                                    <label className="my-[15px]">UserName</label>
                                    <input className="bg-[#233a50] text-[#abb7c4] px-[15px] py-[10px] rounded-sm" type="text" placeholder={userInfo?.displayName} />
                                </div>
                                <div className="inputGroup flex flex-col">
                                    <label className="my-[15px]">Email</label>
                                    <input className="bg-[#233a50] text-[#abb7c4] px-[15px] py-[10px] rounded-sm" type="email" placeholder={userInfo?.email} />
                                </div>
                                <div className="inputGroup flex flex-col">
                                    <label className="my-[15px]">FirstName</label>
                                    <input className="bg-[#233a50] text-[#abb7c4] px-[15px] py-[10px] rounded-sm" type="text" placeholder={userInfo?.displayName?.split(" ")[0]} />
                                </div>
                                <div className="inputGroup flex flex-col">
                                    <label className="my-[15px]">LastName</label>
                                    <input className="bg-[#233a50] text-[#abb7c4] px-[15px] py-[10px] rounded-sm" type="text" placeholder={userInfo?.displayName?.split(" ")[1]} />
                                </div>
                            </div>
                            <div className="form pt-[40px] mt-[40px] border-t border-[#233a50]">
                                <h3>02.CHANGE PASSWORD</h3>
                                <div className="inputGroup flex flex-col">
                                    <label className="my-[15px]">Old password</label>
                                    <input className="bg-[#233a50] text-[#abb7c4] px-[15px] py-[10px] rounded-sm" type="text" placeholder={userInfo?.displayName} />
                                </div>
                                <div className="inputGroup flex flex-col">
                                    <label className="my-[15px]">new password</label>
                                    <input className="bg-[#233a50] text-[#abb7c4] px-[15px] py-[10px] rounded-sm" type="email" placeholder={userInfo?.email} />
                                </div>
                                <div className="inputGroup flex flex-col">
                                    <label className="my-[15px]">Confirm new password</label>
                                    <input className="bg-[#233a50] text-[#abb7c4] px-[15px] py-[10px] rounded-sm" type="text" placeholder={userInfo?.displayName?.split(" ")[0]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (currentPage == "favMovies") {
            return (
                <div className="favMovies w-[90%] md:w-3/6">
                    <h1>favorite movies</h1>
                </div>
            )
        }
    }

    async function handelUserData() {
        const docRef = doc(database, "Users", userInfo.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.data() === undefined) {
            await setDoc(doc(database, "Users", userInfo.uid), {
                watchLater: [],
                fav: []
            });
            console.log("done")

        } else {
            setUserFav(docSnap.data().fav)
            setUserLater(docSnap.data().watchLater)
        }
    }


    return (
        <section className="Profile py-[100px] relative">
            <div className="overlay absolute top-0 z-[-1] h-[400px] overflow-hidden">
                <Image src={img} height={"100%"} width={"100%"} className="object-contain" />
            </div>
            <div className="container mx-auto pt-[85px] flex justify-evenly ">
                <div className="profileCard w-2/4 md:w-1/6 rounded sticky top-[100px] h-full bg-[#020d18] border-4 border-[#0f2133] flex flex-col items-center">
                    <img src={userPhoto} width={100} height={100} alt="UserIMG" className="w-[100px] rounded-full h-[100px] object-cover" />
                    <button className="relative w-[120px] h-[40px] my-[20px] bg-[#dd003f] rounded-lg font-semibold cursor-pointer">
                        <input type={"file"} accept="image/*" className="button left-0 top-0 h-full  w-full absolute cursor-pointer opacity-0" name={"Change Avatar"} id="file" onChange={() => {
                            changePhoto()

                        }} />
                        Change Photo
                    </button>
                    <p onClick={() => {
                        setUserPhoto(img2)

                    }}>change</p>
                    <div className="details w-full">
                        <ul className="border-b-2 border-t-2 border-[#0f2133] py-12 px-6">
                            <h2 className="text-sm text-gray-600 font-bold">Account details</h2>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all" onClick={() => {
                                setCurrentPage("profileInfo")

                            }}>Profile</li>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all" onClick={() => {
                                setCurrentPage("favMovies")
                            }}>Favorite movies</li>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all">Rated movies</li>
                        </ul>
                    </div>

                    <div className="others w-full">
                        <ul className="border-b-2 border-t-2 border-[#0f2133] py-12 px-6">
                            <h2 className="text-sm text-gray-600 font-bold">others</h2>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all">change password</li>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all" onClick={() => {
                                signOut(auth).then(() => {
                                    console.log("ana tl3t bra")
                                    setLogState(false)
                                    setUserInfo({})
                                }).catch((error) => {
                                    console.log("ana lsa gwa haha")
                                });

                            }}>log out</li>

                        </ul>
                    </div>

                </div>

                {handelCurrentPage()}

            </div>
        </section>
    )
}