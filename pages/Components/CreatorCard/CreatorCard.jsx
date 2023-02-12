import Image from "next/image"
import person from '../../../IMG/Person.svg'

function CreatorCard () {
    return (
        <div className="creatorCard p-5 lg:w-1/3 md:w-1/2 w-full">
            <div className="card  bg-[#251163] p-3 rounded-xl w-full flex">
                <Image src={person}/>
                <div className="details ml-5 flex flex-col justify-between">
                    <h4>Eka Prakasa</h4>
                    <p>13.2K</p>
                </div>
                
            </div>
        </div>
    )
}

export default CreatorCard