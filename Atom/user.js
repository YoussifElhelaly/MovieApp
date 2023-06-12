// // console.log(auth.currentUser)

// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { atom } from "recoil";

// const auth = getAuth()

let User = {}

// onAuthStateChanged(auth , (user) => {
//     if(user) {
//         User = user
//         console.log(User)
//     }
// })

const UserInfo = atom({
    key: 'UserInfo',
    default: User,
});

export default UserInfo