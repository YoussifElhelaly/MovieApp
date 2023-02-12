import CreatorCard from "../CreatorCard/CreatorCard"

function Creator() {
    return(
        <section className="creator">
            <div className="container mx-auto lg:p-20">
                <h3 className="text-4xl font-bold">Creator of The Week</h3>
                <div className="box flex flex-wrap">
                    <CreatorCard/>
                    <CreatorCard/>
                    <CreatorCard/>
                    <CreatorCard/>
                    <CreatorCard/>
                    <CreatorCard/>
                </div>
                <div className="button text-center">
                    <button className="mt-12 bg-gradient-to-r from-[#8D1CFE] to-[#0038ED] px-6 py-3 rounded-full text-[18px]">Watch Videos</button>
                </div>
            </div>
        </section>
    )
}

export default Creator