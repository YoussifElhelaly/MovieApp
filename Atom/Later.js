import { atom } from "recoil";

let watchLater = []


const Later = atom({
    key: 'Later',
    default: watchLater,
});

export default Later