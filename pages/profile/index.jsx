import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRecoilState, useRecoilValue } from "recoil";
import LoginState from "../../Atom/loginState";
import UserInfo from "../../Atom/user";
import FirebaseApp from "../../FirebaseConfig";
import { useEffect } from "react";
// import {storage} from "./firebase"
export default function Profile() {

    const auth = getAuth()
    const user = auth.currentUser
    const storage = getStorage(FirebaseApp)
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)
    const [logState, setLogState] = useRecoilState(LoginState)
    // let userInfo = {}
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
                })

        }
        )
    }
    return (
        <section className="Profile">
            <div className="container mx-auto pt-[85px] flex justify-evenly ">
                <div className="profileCard w-2/4 md:w-1/6 rounded sticky top-[100px] h-full bg-[#020d18] border-4 border-[#0f2133] flex flex-col items-center">
                    <img src={userInfo?.photoURL} alt="UserIMG" className="w-[100px] rounded-full h-[100px] object-cover" />
                    <button className="relative w-[120px] h-[40px] my-[20px] bg-[#dd003f] rounded-lg font-semibold cursor-pointer">
                        <input type={"file"} accept="image/*" className="button left-0 top-0 h-full  w-full absolute cursor-pointer opacity-0" name={"Change Avatar"} id="file" onChange={() => { changePhoto() }} />
                        Change Photo
                    </button>
                    <div className="details w-full">
                        <ul className="border-b-2 border-t-2 border-[#0f2133] py-12 px-6">
                            <h2 className="text-sm text-gray-600 font-bold">Account details</h2>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all">Profile</li>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all">Favorite movies</li>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all">Rated movies</li>
                        </ul>
                    </div>

                    <div className="others w-full">
                        <ul className="border-b-2 border-t-2 border-[#0f2133] py-12 px-6">
                            <h2 className="text-sm text-gray-600 font-bold">others</h2>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all">change password</li>
                            <li className="mt-5 font-bold hover:text-[#dcf836] cursor-pointer transition-all" onClick={() => {
                                signOut(auth)
                            }}>log out</li>

                        </ul>
                    </div>

                </div>
                <div className="info w-[90%] md:w-3/6 ">
                    <h2 className="text-4xl font-bold">{`${userInfo?.displayName}'s profile`}</h2>
                    <div className="detailsCard bg-[#0b1a2a] border-[#0f2133] border-4 p-5">
                        <h3>01.profile Details</h3>
                        <div className="info">
                            <div className="form">
                                <label></label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}