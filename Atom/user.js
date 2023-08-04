import { atom } from "recoil";

let User = {}


const UserInfo = atom({
    key: 'UserInfo',
    default: User,
});

export default UserInfo