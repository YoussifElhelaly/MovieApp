import { Skeleton } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
// import poster from '../../../IMG/Poster1.jpg'
import styles from '../../../styles/KindCard.module.css'


function KindCard(props) {

    return(
        <div className="KindCard mb-5">
            {props.loading ?
            <div className={`${styles.card} card bg-[#251163] rounded-xl w-full h-full`}>
                <div className={`${styles.poster} poster relative rounded-xl h-full`}>
                    <h3 className={`${styles.kind}`}>{props.kind}</h3>
                    <div className={styles.more}>
                            <Link className="bg-[#dd003f] px-3 rounded-full py-1 font-semibold text-lg" href={`/${props.kind}/Details/${props.movie.id}`} >More Details</Link>
                        </div>
                    <img src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`} alt="Movie Poster" className="min-h-[312px] h-full"/>
                    <div className="info absolute bottom-3 left-0 ml-2">
                        <h4 className="text-sm font-bold">{props.movie.original_title}</h4>
                        <p className="text-2xl">{props.movie.vote_average}<span className="text-lg">/10</span></p>
                    </div>
                </div>
            </div>
            :   <Skeleton sx={{ bgcolor: '#acacac94' }} variant="rectangular" width={210} height={300} />
        }
            
        </div>
    )
}

export default KindCard