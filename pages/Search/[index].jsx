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
        <div className="parent flex flex-wrap gap-5 py-[70px]">
            {
                result?.map((movie) => {
                    return (
                        <KindCard movie={movie} loading={true} />
                    )
                })}
        </div>
    )
}