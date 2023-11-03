import { useState, useEffect } from 'react'
import axios from 'axios'
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
  const [classTemp, setClassTemp] = useState("")

  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [pais, setPais] = useState("")
  const [temperatura, setTemperatura] = useState("")
  const [descricao, setDescricao] = useState("")
  const [longitude, setLongitude] = useState("")

  const apiKeyLoc = 'aBpNERBRfAGtpLcbaGFmO6cFsjcHlOsK';

  const apiKeyTem = '529da1a067e842b47730c617e0f33da5'

  const [time, setTime] = useState(new Date());

  const updateTimeClass = () => {
    if (horas < 6 || horas >= 18) {
      setClassHoras('horaNoturna');
    } else {
      setClassHoras('horaDiurna');
    }
  }

  const updateTempClass = () => {
    const temp = parseFloat(temperatura.replace('°C', ''));

    if (temp < 0) {
      setClassTemp('abaixoZero')
    } else if (temp < 10) {
      setClassTemp('abaixoDez')
    } else if (temp < 16) {
      setClassTemp('maiorDez')
    } else if (temp < 25) {
      setClassTemp('maiorDezesseis')
    } else if (temp < 35) {
      setClassTemp('maiorVinteecinco')
    } else if (temp < 40) {
      setClassTemp('maiorTrintaecinco')
    } else {
      setClassTemp('maiorQuarenta')
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation, showError);
  }, []);

  const getLocation = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    axios
      .get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKeyLoc}&location=${latitude},${longitude}`)
      .then((locationResponse) => {
        const city = locationResponse.data.results[0].locations[0].adminArea5;
        const state = locationResponse.data.results[0].locations[0].adminArea3;
        const country = locationResponse.data.results[0].locations[0].adminArea1;
        setCidade(city)
        setEstado(state)
        setPais(country)

        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyTem}`)
          .then((response) => {
            const tempKelvin = response.data.main.temp;
            const tempCelsius = tempKelvin - 273.15;
            const weatherDescription = response.data.weather[0].description;

            setTemperatura(`${tempCelsius.toFixed(0)}°C`);
            setDescricao(weatherDescription);
          })
          .catch((error) => {
            console.error('Erro ao obter informações de clima:', error);
          });
      })
      .catch((locationError) => {
        console.error('Erro ao obter informações de localização:', locationError);
      });
  };

  const showError = (error) => {
    console.log(error.message);
  };

  useEffect(() => {
    const locationInterval = setInterval(() => {
      getLocation(); 
    }, 300000);

    return () => {
      clearInterval(locationInterval);
    };
  }, [])

  useEffect(() => {
    const temperatureInterval = setInterval(() => {
      getLocation(); 
    }, 300000);

    return () => {
      clearInterval(temperatureInterval);
    };
  }, []);

  useEffect(() => {
    updateTimeClass();
  
    if (temperatura !== "") {
      updateTempClass();
    }
  }, [temperatura]);

  return (
    <div className="body">
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
              {pais !== 'BR' ? `${cidade} - ${estado} - ${pais}` : `${cidade} - ${estado}`}
            </div>
          </marquee>
        </div>
        <div className={`clima ${classTemp}`}>
          {temperatura}
        </div>
        <div className="imagem">
          <img/>
        </div>
      </section>
      <Footer/>
    </div>
  )
}