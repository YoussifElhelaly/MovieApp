import Image from "next/image";
import img1 from '../../../IMG/image5.png'
import eth from '../../../IMG/ETH.png'


function StoreCard() {
    return (
        <div className="storeCard xl:w-1/4 md:w-1/3 sm:w-1/2 w-full p-3">
            <div className="box bg-white p-3 rounded-xl ">
                <Image src={img1} className="w-full"/>
                <h3 className="text-black text-2xl my-3 font-semibold">ArtCrypto</h3>
                <p className="flex text-[#815EE3] -ml-3 text-md font-bold"><Image src={eth} className="w-10"/> 0.25 ETH</p>
                <div className="stats flex justify-between border-t-2 pt-3">
                    <div className="time px-3 bg-gray-400 rounded-full text-[#1C51FE]">3h 25m 3s</div>
                    <div className="buy text-[#1C51FE] font-bold">Place a bid</div>
                </div>
            </div>
        </div>
    )
}

export default StoreCard