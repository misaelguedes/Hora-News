import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {

  const data = new Date()
  const ano = data.getFullYear()
  const mes = data.getMonth()
  const diaMes = data.getDate()
  const diaSem = data.getDay()
  const horas = data.getHours()
  const minutos = data.getMinutes()
  const segundos = data.getSeconds()

  return (
    <div>
      <Header/>
      <section>
        <div className="data">
          <marquee>
            <div className="dia">

            </div>
          </marquee>
        </div>
        <div className="hora">
          {horas < 10 ? `0${horas}` : horas} : {minutos < 10 ? `0${minutos}` : minutos} : {segundos < 10 ? `0${segundos}` : segundos}
        </div>
        <div className="local">
          <marquee direction="right" scrollamount="4">
            <div className="localizacao">
        
            </div>
          </marquee>
        </div>
        <div className="clima">

        </div>
        <div className="imagem">
          <img/>
        </div>
      </section>
      <Footer/>
    </div>
  )
}