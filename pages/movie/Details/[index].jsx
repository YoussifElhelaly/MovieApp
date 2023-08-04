import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "../../Components/navbar/navbar"
import styles from '../../../styles/MovieDetails.module.css'
import Kind from "../../Components/Kind/Kind"
import WatchLaterBTN from "../../Components/WatchLaterBTN/watchLaterBTN"
import FavBTN from "../../Components/FavBTN/FavBTN"


export default function MovieDetails() {

    const router = useRouter()
    const movieId = router.query

    const [movie, SetMovie] = useState([])
    const [credits, SetCredits] = useState([])
    const [review, SetReview] = useState([])



    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId?.index}?api_key=122131e3599c6bef391494f36765eaa0&language=en-US`)
            .then((res) => res.json())
            .then((data) => SetMovie(data))

        fetch(`https://api.themoviedb.org/3/movie/${movieId?.index}/credits?api_key=122131e3599c6bef391494f36765eaa0&language=en-US`)
            .then((res) => res.json())
            .then((data) => SetCredits(data.cast))

        fetch(`https://api.themoviedb.org/3/movie/${movieId?.index}/reviews?api_key=122131e3599c6bef391494f36765eaa0&language=en-US&page=1`)
            .then((res) => res.json())
            .then((data) => SetReview(data.results))



    }, [movieId])

    console.log(review)


    return (
        <>
            <Navbar />
            <section className={`MovieDetails pt-[72px]`}>
                <div className={`${styles.img} img w-full h-[400px] md:h-[500px] relative`}>
                    <div className={`${styles.img} immmg w-full h-full absolute`} style={{ background: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}></div>
                    {/* <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className={`${styles.img} w-full h-full object-cover object-center absolute`}/> */}
                    <div className="container mx-auto xl:px-20 lg:py-40 py-5 md:justify-around relative z-[40] flex lg:justify-evenly md:flex-row flex-col">
                        <div className="poster w-2/4 md:w-1/4 sticky top-[100px] h-full">
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="w-80 rounded-md shadow-md" />
                            <div className="add">
                                <WatchLaterBTN id={movieId} />
                                <FavBTN id={movieId} />
                            </div>
                        </div>
                        <div className="details w-[90%] md:w-[50%]">
                            <h3 className="text-4xl font-bold">{movie.title}<span className="year text-2xl ml-5 font-normal text-gray-400">{movie.release_date?.split("-")[0]}</span></h3>
                            <div className="rate my-5 flex items-center border-[1px] border-gray-400 border-r-0 border-l-0">
                                <i class="fa-solid fa-star text-yellow-500 mr-2 md:text-xl lg:text-4xl "></i>
                                <div className="rating border-r-[1px] pr-1 md:py-5 py-1 border-gray-400">
                                    <h4 className="lg:text-2xl font-">{Math.round(movie.vote_average)}<span>/10</span></h4>
                                    <h5 className="text-[12px] md:text-sm text-blue-500 font-bold">{movie.vote_count} Reviews</h5>
                                </div>
                                <div className="star flex items-center ml-5">
                                    <h4 className="text-sm lg:text-xl font-semibold mr-3">Rate This Movie :</h4>
                                    <span className={`${styles.rate}`}>
                                        <div className={`${styles.starsOuter}`}>
                                            <div className={`${styles.starsInner}`} id='star' style={{ width: movie?.vote_average / 10 * 100 + "%" }}>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <ul className="flex justify-between text-[12px] md:text-sm xl:text-xl font-bold my-10">
                                <li className="cursor-pointer border-b-4  pb-3 text-[#dcf836] border-[#dcf836] transition-all">overview</li>
                                <li className="cursor-pointer hover:border-b-4  pb-3 hover:text-[#dcf836] border-[#dcf836] transition-all">reviews</li>
                                <li className="cursor-pointer hover:border-b-4  pb-3 hover:text-[#dcf836] border-[#dcf836] transition-all">cast& crew</li>
                                <li className="cursor-pointer hover:border-b-4  pb-3 hover:text-[#dcf836] border-[#dcf836] transition-all">media</li>
                                <li className="cursor-pointer hover:border-b-4  pb-3 hover:text-[#dcf836] border-[#dcf836] transition-all">related movies</li>
                            </ul>
                            <div className="overView ">
                                <p>{movie.overview}</p>
                            </div>
                            <div className="cast my-10">
                                <div className="head flex justify-between border-b-2 my-5 py-4">
                                    <h2>Cast</h2>
                                    <span className="text-blue-600">Full Cast {credits?.length}</span>
                                </div>
                                {
                                    credits?.map((actor) => {
                                        return (
                                            <div className="actor flex justify-between mb-5 items-center">
                                                <div className="info flex items-center">
                                                    <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} className="w-[60px] mr-5 h-[60px] object-cover rounded" />
                                                    <h3 className="text-sm">{actor.original_name}</h3>
                                                </div>
                                                <span className="text-sm text-right">{actor.character}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="Review">
                                <div className="head flex justify-between border-b-2 my-5 py-4">
                                    <h2>User reviws</h2>
                                    <span className="text-blue-600">See all {review?.length} Reviews</span>
                                </div>

                                {review?.splice(0, 4).map((re) => {
                                    console.log(re)
                                    let src = re.author_details.avatar_path
                                    if (src === null) {
                                        src = "https://www.gravatar.com/avatar/96c2e0e4ac98450f9e8e3c0a0a40aad8.jpg"
                                    } else if (src.includes("http") === false) {
                                        src = `https://image.tmdb.org/t/p/original${re?.author_details?.avatar_path}`
                                    } else {
                                        src = src.slice(1)

                                    }

                                    return (
                                        <div className="ReviewCard mb-6 border-b-[1px] pb-6 border-gray-500">
                                            <div className="info flex mb-4 items-center">
                                                <div className="img w-[50px] rounded h-[50px] mr-5">
                                                    <img id="userIMG" className="object-cover h-full w-full object-top" src={src} />
                                                </div>
                                                <div className="user">
                                                    <h2>{re?.author}</h2>
                                                    <span className={`${styles.rate}`}>
                                                        <div className={`${styles.starsOuter}`}>
                                                            <div className={`${styles.starsInner}`} id='star' style={{ width: re?.author_details?.rating / 10 * 100 + "%" }}>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <p className="text-gray-400">{((re?.created_at)?.split("T")[0])}</p>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <p className="capitalize text-gray-400 text-[15px]">{re?.content}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <Kind kind="tv" />
                </div>
            </section>
        </>
    )

    // 
}