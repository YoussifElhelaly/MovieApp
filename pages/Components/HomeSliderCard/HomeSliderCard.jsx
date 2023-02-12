import Image from 'next/image'
import Link from 'next/link'
import poster from '../../../IMG/poster1.jpg'
import GlobalStyle from '../../../styles/Main.module.css'
import { Skeleton } from '@mui/material';

export default function HomeSliderCard(props) {
    return(
        <div className="HomeSliderCard flex lg:justify-between w-full items-center px-5 xl:px-20 lg:flex-row flex-col-reverse">
            <div className="MovieDetails w-5/6 md:w-4/6 xl:w-3/6">
                {/* <ul className="cate flex mb-5">
                    <li className='mr-2 font-bold text-xs bg-blue-500 py-1 px-3 rounded-sm'>SCI-fi</li>
                    <li className='mr-2 font-bold text-xs bg-blue-500 py-1 px-3 rounded-sm'>Action</li>
                    <li className='mr-2 font-bold text-xs bg-blue-500 py-1 px-3 rounded-sm'>Advanture</li>
                </ul> */}
                {
                    props.loading
                    ?
                    <h2 className="MovieName text-3xl md:text-3xl lg:text-5xl xl:text-7xl font-bold">{props.movie.original_title} <span className="year text-3xl xl:text-5xl font-normal text-gray-400">{props.movie.release_date.split("-")[0]
                    }</span></h2>
                    :<Skeleton className="mb-4" sx={{ bgcolor: '#acacac94' }} variant="rectangle" width={"100%"} height={120} />
                }
                {
                    props.loading
                    ?<ul className={`actions flex my-5 flex-wrap`}>
                        <li className='mr-4 text-[#dd003f] font-bold xl:text-xl mb-5'><i class="fa-solid fa-play inline-block border  lg:px-4 lg:py-2 py-2 px-3 text-center mr-4 rounded-full border-[#dd003f] lg:text-xl"></i>Watch trailer</li>
                        <li className='mr-4 text-[#dd003f] font-bold xl:text-xl mb-5'><i class="fa-regular fa-heart inline-block border  lg:px-3 lg:py-2 py-2 px-2 text-center mr-4 rounded-full border-[#dd003f] lg:text-xl"></i>add to favorite</li>
                        <li className='mr-4 text-[#dd003f] font-bold xl:text-xl mb-5'><i class="fa-solid fa-share inline-block border  lg:px-3 lg:py-2 py-2 px-2 text-center mr-4 rounded-full border-[#dd003f] lg:text-xl"></i>share</li>
                    </ul>
                    :<Skeleton className="mb-4" sx={{ bgcolor: '#acacac94' }} variant="rectangle" width={"100%"} height={50} />
                }
                {
                    props.loading 
                    ?<ul className='info flex'>
                        <li className='mr-6 text-2xl'><i class="fa-solid fa-star text-yellow-500 mr-2"></i>{props.movie.vote_average}<span className='text-lg ml-1'>/10</span></li>
                        <li className='mr-6 text-xl text-gray-400 capitalize'>Release: {props.movie.release_date}</li>
                    </ul>
                    :<Skeleton className="mb-4" sx={{ bgcolor: '#acacac94' }} variant="rectangle" width={250} height={15} />
                }
                {
                    props.loading
                    ? <Link href={`../../MovieDetails/${props.movie.id}`} className={`${GlobalStyle.button}`}>More Details</Link>
                    : <Skeleton sx={{ bgcolor: '#acacac94' }} variant="rectangle" width={150} height={40} />
                }
            </div>
            <div className="MovieImage md:w-2/4 lg:w-2/6 xl:w-1/4 my-2">
                { props.loading ?
                <img src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`} width="270" height="400"/>
                : <Skeleton sx={{ bgcolor: '#acacac94' }} variant="rectangle" width={270} height={400} />
                }
            </div>
        </div>
    )
}