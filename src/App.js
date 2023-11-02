import { useState, useEffect } from 'react'
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

  const diasSemana = ['Domingo', 'Segunda-feita', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const diaSemana = diasSemana[diaSem]
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const nomeMes = meses[mes]

  const [classHoras, setClassHoras] = useState("")

  const [time, setTime] = useState(new Date());

  const updateTimeClass = () => {
    if (horas < 6 || horas >= 18) {
      setClassHoras('horaNoturna');
    } else {
      setClassHoras('horaDiurna');
    }
  }

  useEffect(() => {
    updateTimeClass()

    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Header/>
      <section>
        <div className="data">
          <marquee>
            <div>
              {diaSemana}, {diaMes} de {nomeMes} de {ano}
            </div>
          </marquee>
        </div>
        <div className={`hora ${classHoras}`}>
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