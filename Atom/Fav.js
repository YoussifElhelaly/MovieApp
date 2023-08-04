import { atom } from "recoil";

let userFav = []


const Fav = atom({
    key: 'Fav',
    default: userFav,
});

export default Fav