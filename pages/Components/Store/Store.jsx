import StoreCard from "../StoreCard/StoreCard"

function Store() {
    return(
        <section className="store">
            <div className="container mx-auto lg:p-20 py-20 px-5">
                <h2 className="text-5xl font-semibold">Super Hot Drop</h2> 
                <ul className="flex md:flex-row flex-col my-5 flex-wrap">
                    <li className="mr-5 bg-gradient-to-r from-[#8D1CFE] to-[#0038ED] px-6 py-3 my-3 rounded-full text-[18px]">Hope Ape</li>
                    <li className="mr-5 bg-[#39324D] px-6 py-3 my-3 rounded-full text-[18px]">Abstract</li>
                    <li className="mr-5 bg-[#39324D] px-6 py-3 my-3 rounded-full text-[18px]">MongKey</li>
                    <li className="mr-5 bg-[#39324D] px-6 py-3 my-3 rounded-full text-[18px]">Cars</li>
                    <li className="mr-5 bg-[#39324D] px-6 py-3 my-3 rounded-full text-[18px]">Art</li>
                </ul>
            <div className="collection flex flex-wrap">
                <StoreCard/>
                <StoreCard/>
                <StoreCard/>
                <StoreCard/>
                <StoreCard/>
                <StoreCard/>
                <StoreCard/>
            </div>
            <div className="more text-center">
                <button className=" mt-12 bg-gradient-to-r from-[#8D1CFE] to-[#0038ED] px-6 py-3 rounded-full text-[18px]">View More</button>
            </div>
            </div>
        </section>
    )
}

export default Store