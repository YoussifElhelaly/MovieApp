import Kind from "./Components/Kind/Kind";
import HomeSliderCard from "./Components/HomeSliderCard/HomeSliderCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import { useRecoilValue } from "recoil";
import UserInfo from "../Atom/user";
export default function Home() {

  const [SliderHomeMovies, SetSliderHomemovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const userInfo = useRecoilValue(UserInfo)
  const [thumbsSwiper, setThumbsSwiper] = useState({});



  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=122131e3599c6bef391494f36765eaa0&language=en-US&page=1")
      .then((res) => res.json())
      .then((data) => (SetSliderHomemovies(data.results)))
    // .then(() => setIsLoading(true))


  }, [])

  useEffect(() => {
    if (SliderHomeMovies.length !== 0) {
      setIsLoading(true)
    }
  }, [SliderHomeMovies])

  return (
    <>
      <section className={`${styles.home} home h-screen py-16`}>
        <div className="container mx-auto xl:p-20 px-2 py-10 flex h-full items-center ">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper" loop={true}>
            {SliderHomeMovies.slice(0, 3).map((movie) => {
              return (
                <SwiperSlide>
                  <HomeSliderCard movie={movie} loading={isLoading} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </section>


      <Kind kind="movie" which={true} />
      <Kind kind="tv" which={false} />
      {/* <Store/>
      <Creator/> */}
    </>
  )
}
