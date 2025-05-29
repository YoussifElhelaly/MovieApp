import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import KindCard from "../Components/KindCard/KindCard"

export default function Search() {

    const router = useRouter()
    const movieId = router.query

    const [result, setResult] = useState([])


    useEffect(() => {
        fetch(` 
            https://api.themoviedb.org/3/search/multi?api_key=122131e3599c6bef391494f36765eaa0&language=en-US&query=${movieId?.index}&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => setResult(data.results))
    }, [movieId])
    return (
        <div className="container  mx-auto px-20 max-md:px-4 pt-20">

        <div className="parent grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 py-[50px] max-md:py-[10px]">
            {
                    result?.map((movie) => {
                    console.log(movie)
                    return (
                        <KindCard kind={movie.media_type == "movie" ? "movie" : "tv"} movie={movie} loading={true} />
                    )
                })}
        </div>
    </div>
    )
}