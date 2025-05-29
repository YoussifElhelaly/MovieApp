import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'
import KindCard from '../Components/KindCard/KindCard'



export default function () {

    const [MovieList , SetMovieList] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [sort , SetSort] = useState("popular")
    let pages = []
    let totalPage

    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/tv/${sort}?api_key=122131e3599c6bef391494f36765eaa0&language=en-US&page=${currentPage}`)
        .then((res) => res.json())
        .then((data) => SetMovieList(data))
    } ,[sort , currentPage])
    
    totalPage = MovieList.total_pages

    for(let i = currentPage ; i <= currentPage+5 ;i++) {
        pages.push(i)
    }

    if(currentPage !== 1) {
        pages.unshift(currentPage - 1)
    }
    console.log(pages)

    return(
        <>
            <section className={`${styles.home} home h-1/4 py-16`}>
                <div className="container text-center mx-auto xl:p-20 px-2 py-10 w-full h-full ">
                    <h1 className='text-5xl font-bold'>TV LISTING</h1>
                </div>
            </section>
            <div className="container mx-auto p-20">
                <div className="info flex justify-between items-center border-[0.5px] border-l-0 border-r-0 mb-5">
                    <h3>Found <span>{MovieList?.total_results} movies</span> in total</h3>
                    <div className="sort flex items-center">
                        <label className='pr-5 py-1 border-r-[0.5px] capitalize'>Sort by:</label>
                        <select onChange={(e) => {SetSort(e.target.value)}} title='sort' className={`text-md font-bold bg-[#020d18] pl-5`}>
                            <option value="popular">
                                Popularity
                            </option>
                            <option value="top_rated">
                                top rated
                            </option>
                            <option value="upcoming">
                                Comming Soon
                            </option>
                            <option value="now_playing">
                                Now Playing
                            </option>
                        </select>
                    </div>
                </div>
                <div className="parent grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 py-[50px] max-md:py-[10px]">
                    {MovieList?.results?.map((movie)=>{
                        return(
                            <KindCard kind="tv" movie={movie} loading={true}/>
                            )
                        })}
                </div>
                <div className="pages border-[0.5px] text-right border-l-0 border-r-0 mr-auto">
                    <ul className='flex justify-end'>
                        <p className='mr-5'>page {currentPage} of 500</p>    
                        {pages.map((p ,index)=> {
                            let className =  false
                            if (p === currentPage) {
                                className = true
                            }
                            if(p < 500) {
                                return(
                                    <li className={`text-[${className ? "#dcf836" :  "#4280bf"}] hover:text-[#dcf836] mx-2 cursor-pointer`} onClick={()=>{setCurrentPage(p)}}>{p}</li>
                                )
                            }
                        })}
                        <li className={`text-[${currentPage === 500 ? "#dcf836" :  "#4280bf"}] hover:text-[#dcf836] mx-2 cursor-pointer`} onClick={() => {setCurrentPage(500)}}>{500}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}