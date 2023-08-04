import { useRecoilState, useRecoilValue } from "recoil"
import LoginState from "../../../Atom/loginState"
import Swal from "sweetalert2"
import Later from "../../../Atom/Later"
import { useEffect } from "react"

function WatchLaterBTN(props) {

    const logState = useRecoilValue(LoginState)
    const [watchLater, setWatchLater] = useRecoilState(Later)

    function HandleClick() {
        if (logState === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login !'
            })
        }
        if (logState === true) {
            setWatchLater((old) => [...old, props.id.index])
        }
    }

    function updateListDatabase() {
        
    }

    return (
        <button className="block bg-[#dd003f] font-bold text-md  w-full my-2 py-3 rounded" onClick={() => HandleClick()}>Watch later</button>
    )
}

export default WatchLaterBTN