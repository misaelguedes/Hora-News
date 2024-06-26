import './noticias.css'
import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Noticias() {

    const [noticias, setNoticias] = useState([])
    const [status, setStatus] = useState('noticia-container')

    useEffect(() => {
        axios.get('https://newsdata.io/api/1/news?country=br&apikey=pub_34429d0d3f4f03b10113f804ff3495fd64af7')
        .then((res) => {
            setNoticias(res.data.results)
        })
        .catch((error) => {
            console.log(error)
            setStatus('noticia-container-erro')
        })
    }, [])

    return (
        <div className={status}>
            {
                <marquee>
                    {noticias.map((noticia) => (
                        <span key={noticia.article_id}>
                            <a href={noticia.link} target='blank' rel='noopener noreferrer'>&#9679; {noticia.title}</a>
                        </span>
                    ))}
                </marquee>
            }
        </div>
    )
}