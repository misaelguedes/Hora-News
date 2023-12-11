import './noticias.css'
import { useEffect, useState } from "react"
import axios from "axios"

export default function Noticias() {

    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=92e4016a883a471b842d4993883b5d85')
        .then((res) => {
            setNoticias(res.data.articles)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className='noticias'>
            <div className='noticias-container'>
                <marquee>
                    {noticias.map((noticia) => (
                        <a key={noticia.id} href={noticia.url} target='blank'>{noticia.title}</a>
                    ))}
                </marquee>
            </div>
        </div>
    )
}