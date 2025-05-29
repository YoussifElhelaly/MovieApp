import KindCard from "../KindCard/KindCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";
import Link from "next/link";


function Kind(props) {


    const [movies, SetMovies] = useState([])
    const [cate , SetCate] = useState("popular")
    const [isLoading , setisLoading] = useState(false)

    useEffect(()=> {
        setisLoading(false)
        fetch(`https://api.themoviedb.org/3/${props.kind}/${cate}?api_key=122131e3599c6bef391494f36765eaa0&language=en-US&page=1`)
        .then((res) => res.json())
        .then(async (data) => await SetMovies(data.results))
    
    } , [cate , props])


    useEffect(()=> {
        if(movies?.length !== 0) {
            setisLoading(true)
        } 
    } , [movies])

    return (
        <section className="create">
            <div className="container mx-auto p-5 lg:p-20">
                <div className="head flex items-center justify-between">
                    <h3 className="text-2xl font-bold my-5">{props.kind}</h3>
                    <Link href={`../${props.kind}`} className="text-sm font-semibold hover:text-[#dcf836] transition-all">View All <i class="fa-solid fa-chevron-right"></i></Link>
                </div>
                <ul className="flex">
                    <li onClick={()=> {SetCate("popular")
                        // setisLoading(false)
                        }} className="mr-2 md:mr-5 font-semibold text-sm text-[#dcf836] hover:text-[#dcf836] transition-all cursor-pointer">#popular</li>
                    <li onClick={()=> {props.which ? SetCate("upcoming") : SetCate("airing_today")
                        // setisLoading(false)
                        }} className="mr-2 md:mr-5 font-semibold text-sm hover:text-[#dcf836] transition-all cursor-pointer">#coming soon</li>
                    <li onClick={()=> {
                        SetCate("top_rated") 
                        // setisLoading(false)
                        }} className="mr-2 md:mr-5 font-semibold text-sm hover:text-[#dcf836] transition-all cursor-pointer">#top rated</li>
                    <li onClick={()=>{ 
                        props.which ? SetCate("now_playing") : SetCate("on_the_air") 
                        // setisLoading(false)
                }} className="mr-2 md:mr-5 font-semibold text-sm hover:text-[#dcf836] transition-all cursor-pointer">#most viewed</li>
                </ul>
                <div className="box py-5">
                <Swiper 
                spaceBetween={20}
                navigation={true} 
                modules={[Navigation, Pagination]} 
                loop={true}
                className="!px-8"
                breakpoints={
                {1300 : {slidesPerView : 6} , 920 :{slidesPerView:4} , 768 :{slidesPerView:3} , 340 :{slidesPerView:1.5}}}
                >
                    {movies?.map((movie)=>{
                        return(
                            <SwiperSlide>
                                <KindCard kind={props.kind} movie={movie} loading= {isLoading}/>
                            </SwiperSlide>
                        )   
                    })}
                </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Kind