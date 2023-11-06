import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'

import madrugadaLimpa from '../../Hora-do-Dia/src/assets/madrugada-limpa.png'
import madrugadaNublada from '../../Hora-do-Dia/src/assets/madrugada-nublada.png'
import madrugadaPoucasNuvens from '../../Hora-do-Dia/src/assets/madrugada-poucas-nuvens.png'
import madrugadaChuvosa from '../../Hora-do-Dia/src/assets/madrugada-chuvosa.png'
import madrugadaNeblina from '../../Hora-do-Dia/src/assets/madrugada-neblina.png'
import madrugadaTrovoada from '../../Hora-do-Dia/src/assets/madrugada-trovoada.png'
import madrugadaNeve from '../../Hora-do-Dia/src/assets/madrugada-neve.png'
import amanhecerCeuLimpo from '../../Hora-do-Dia/src/assets/amanhecer-ceu-limpo.png'
import amanhecerNublado from '../../Hora-do-Dia/src/assets/amanhecer-nublado.png'
import amanhecerPoucasNuvens from '../../Hora-do-Dia/src/assets/amanhecer-poucas-nuvens.png'
import amanhecerChuvoso from '../../Hora-do-Dia/src/assets/amanhecer-chuvoso.png'
import amanhecerNeblina from '../../Hora-do-Dia/src/assets/amanhecer-neblina.png'
import amanhecerTrovoada from '../../Hora-do-Dia/src/assets/amanhecer-trovoada.png'
import amanhecerNeve from '../../Hora-do-Dia/src/assets/amanhecer-neve.png'
import manhaLimpa from '../../Hora-do-Dia/src/assets/manha-limpa.png'
import manhaNublada from '../../Hora-do-Dia/src/assets/manha-nublada.png'
import manhaPoucasNuvens from '../../Hora-do-Dia/src/assets/manha-poucas-nuvens.png'
import manhaChuvosa from '../../Hora-do-Dia/src/assets/manha-chuvosa.png'
import manhaNeblina from '../../Hora-do-Dia/src/assets/manha-neblina.png'
import manhaTrovoada from '../../Hora-do-Dia/src/assets/manha-trovoada.png'
import manhaNeve from '../../Hora-do-Dia/src/assets/manha-neve.png'
import tardeLimpa from '../../Hora-do-Dia/src/assets/tarde-limpa.png'
import tardeNublada from '../../Hora-do-Dia/src/assets/tarde-nublada.png'
import tardePoucasNuvens from '../../Hora-do-Dia/src/assets/tarde-poucas-nuvens.png'
import tardeChuvosa from '../../Hora-do-Dia/src/assets/tarde-chuvosa.png'
import tardeNeblina from '../../Hora-do-Dia/src/assets/tarde-neblina.png'
import tardeTrovoada from '../../Hora-do-Dia/src/assets/tarde-trovoada.png'
import tardeNeve from '../../Hora-do-Dia/src/assets/tarde-neve.png'
import fimTardeLimpo from '../../Hora-do-Dia/src/assets/fim-de-tarde-limpo.png'
import fimTardeNublado from '../../Hora-do-Dia/src/assets/fim-de-tarde-nublado.png'
import fimTardePoucasNuvens from '../../Hora-do-Dia/src/assets/fim-de-tarde-poucas-nuvens.png'
import fimTardeChuvoso from '../../Hora-do-Dia/src/assets/fim-de-tarde-chuvoso.png'
import fimTardeNeblina from '../../Hora-do-Dia/src/assets/fim-de-tarde-neblina.png'
import fimTardeTrovoada from '../../Hora-do-Dia/src/assets/fim-de-tarde-trovoada.png'
import fimTardeNeve from '../../Hora-do-Dia/src/assets/fim-de-tarde-neve.png'
import noiteLimpa from '../../Hora-do-Dia/src/assets/noite-limpa.png'
import noiteNublada from '../../Hora-do-Dia/src/assets/noite-nublada.png'
import noitePoucasNuvens from '../../Hora-do-Dia/src/assets/noite-poucas-nuvens.png'
import noiteChuvosa from '../../Hora-do-Dia/src/assets/noite-chuvosa.png'
import noiteNeblina from '../../Hora-do-Dia/src/assets/noite-neblina.png'
import noiteTrovoada from '../../Hora-do-Dia/src/assets/noite-trovoada.png'
import noiteNeve from '../../Hora-do-Dia/src/assets/noite-neve.png'

export default function App() {

  const data = new Date()
  const ano = data.getFullYear()
  const mes = data.getMonth()
  const diaMes = data.getDate()
  const diaSem = data.getDay()
  const horas = data.getHours()
  const minutos = data.getMinutes()
  const segundos = data.getSeconds()

  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const diaSemana = diasSemana[diaSem]
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const nomeMes = meses[mes]

  const [classHoras, setClassHoras] = useState("")
  const [classTemp, setClassTemp] = useState("")
  const [classBody, setClassBody] = useState("")

  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [pais, setPais] = useState("")
  const [temperatura, setTemperatura] = useState("")
  const [descricao, setDescricao] = useState("")
  const [imagem, setImagem] = useState()

  const apiKeyLoc = 'aBpNERBRfAGtpLcbaGFmO6cFsjcHlOsK';

  const apiKeyTem = '529da1a067e842b47730c617e0f33da5';

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

  const updateImagem = () => {
    if (horas >= 0 && horas < 6) {
      if (descricao.includes('clear')) {
        setImagem(madrugadaLimpa)
        setClassBody('madrugadaLimpa')
      } else if (descricao.includes('overcast') || descricao.includes('broken')) {
        setImagem(madrugadaNublada)
        setClassBody('madrugadaNublada')
      } else if (descricao.includes('clouds')) {
        setImagem(madrugadaPoucasNuvens)
        setClassBody('madrugadaPoucasNuvens')
      } else if (descricao.includes('rain') || descricao.includes('drizzl')) {
        setImagem(madrugadaChuvosa)
        setClassBody('madrugadaChuvosa')
      } else if (descricao.includes('mist') || descricao.includes('fog') || descricao.includes('haze')) {
        setImagem(madrugadaNeblina)
        setClassBody('madrugadaNeblina')
      } else if (descricao.includes('thunderstorm')) {
        setImagem(madrugadaTrovoada)
        setClassBody('madrugadaTrovoada')
      } else if (descricao.includes('snow')) {
        setImagem(madrugadaNeve)
        setClassBody('madrugadaNeve')
      }
    } else if (horas >= 6 && horas < 7) {
      if (descricao.includes('clear')) {
        setImagem(amanhecerCeuLimpo)
        setClassBody('amanhecerCeuLimpo')
      } else if (descricao.includes('overcast') || descricao.includes('broken')) {
        setImagem(amanhecerNublado)
        setClassBody('amanhecerNublado')
      } else if (descricao.includes('clouds')) {
        setImagem(amanhecerPoucasNuvens)
        setClassBody('amanhecerPoucasNuvens')
      } else if (descricao.includes('rain') || descricao.includes('drizzl')) {
        setImagem(amanhecerChuvoso)
        setClassBody('amanhecerChuvoso')
      } else if (descricao.includes('mist') || descricao.includes('fog') || descricao.includes('haze')) {
        setImagem(amanhecerNeblina)
        setClassBody('amanhecerNeblina')
      } else if (descricao.includes('thunderstorm')) {
        setImagem(amanhecerTrovoada)
        setClassBody('amanhecerTrovoada')
      } else if (descricao.includes('snow')) {
        setImagem(amanhecerNeve)
        setClassBody('amanhecerNeve')
      }
    } else if (horas >= 7 && horas < 12) {
      if (descricao.includes('clear')) {
        setImagem(manhaLimpa)
        setClassBody('manhaLimpa')
      } else if (descricao.includes('overcast') || descricao.includes('broken')) {
        setImagem(manhaNublada)
        setClassBody('manhaNublada')
      } else if (descricao.includes('clouds')) {
        setImagem(manhaPoucasNuvens)
        setClassBody('manhaPoucasNuvens')
      } else if (descricao.includes('rain') || descricao.includes('drizzl')) {
        setImagem(manhaChuvosa)
        setClassBody('manhaChuvosa')
      } else if (descricao.includes('mist') || descricao.includes('fog') || descricao.includes('haze')) {
        setImagem(manhaNeblina)
        setClassBody('manhaNeblina')
      } else if (descricao.includes('thunderstorm')) {
        setImagem(manhaTrovoada)
        setClassBody('manhaTrovoada')
      } else if (descricao.includes('snow')) {
        setImagem(manhaNeve)
        setClassBody('manhaNeve')
      }
    } else if (horas >= 12 && horas < 17) {
      if (descricao.includes('clear')) {
        setImagem(tardeLimpa)
        setClassBody('tardeLimpa')
      } else if (descricao.includes('overcast') || descricao.includes('broken')) {
        setImagem(tardeNublada)
        setClassBody('tardeNublada')
      } else if (descricao.includes('clouds')) {
        setImagem(tardePoucasNuvens)
        setClassBody('tardePoucasNuvens')
      } else if (descricao.includes('rain') || descricao.includes('drizzl')) {
        setImagem(tardeChuvosa)
        setClassBody('tardeChuvosa')
      } else if (descricao.includes('mist') || descricao.includes('fog') || descricao.includes('haze')) {
        setImagem(tardeNeblina)
        setClassBody('tardeNeblina')
      } else if (descricao.includes('thunderstorm')) {
        setImagem(tardeTrovoada)
        setClassBody('tardeTrovoada')
      } else if (descricao.includes('snow')) {
        setImagem(tardeNeve)
        setClassBody('tardeNeve')
      }
    } else if (horas >= 17 && horas < 18) {
      if (descricao.includes('clear')) {
        setImagem(fimTardeLimpo)
        setClassBody('fimTardeLimpo')
      } else if (descricao.includes('overcast') || descricao.includes('broken')) {
        setImagem(fimTardeNublado)
        setClassBody('fimTardeNublado')
      } else if (descricao.includes('clouds')) {
        setImagem(fimTardePoucasNuvens)
        setClassBody('fimTardePoucasNuvens')
      } else if (descricao.includes('rain') || descricao.includes('drizzl')) {
        setImagem(fimTardeChuvoso)
        setClassBody('fimTardeChuvoso')
      } else if (descricao.includes('mist') || descricao.includes('fog') || descricao.includes('haze')) {
        setImagem(fimTardeNeblina)
        setClassBody('fimTardeNeblina')
      } else if (descricao.includes('thunderstorm')) {
        setImagem(fimTardeTrovoada)
        setClassBody('fimTardeTrovoada')
      } else if (descricao.includes('snow')) {
        setImagem(fimTardeNeve)
        setClassBody('fimTardeNeve')
      }
    } else {
      if (descricao.includes('clear')) {
        setImagem(noiteLimpa)
        setClassBody('noiteLimpa')
      } else if (descricao.includes('overcast') || descricao.includes('broken')) {
        setImagem(noiteNublada)
        setClassBody('noiteNublada')
      } else if (descricao.includes('clouds')) {
        setImagem(noitePoucasNuvens)
        setClassBody('noitePoucasNuvens')
      } else if (descricao.includes('rain') || descricao.includes('drizzl')) {
        setImagem(noiteChuvosa)
        setClassBody('noiteChuvosa')
      } else if (descricao.includes('mist') || descricao.includes('fog') || descricao.includes('haze')) {
        setImagem(noiteNeblina)
        setClassBody('noiteNeblina')
      } else if (descricao.includes('thunderstorm')) {
        setImagem(noiteTrovoada)
        setClassBody('noiteTrovoada')
      } else if (descricao.includes('snow')) {
        setImagem(noiteNeve)
        setClassBody('noiteNeve')
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getLocationAndUpdateWeather = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position && position.coords) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          axios
            .get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKeyLoc}&location=${latitude},${longitude}`)
            .then((locationResponse) => {
              const city = locationResponse.data.results[0].locations[0].adminArea5;
              const state = locationResponse.data.results[0].locations[0].adminArea3;
              const country = locationResponse.data.results[0].locations[0].adminArea1;
              setCidade(city);
              setEstado(state);
              setPais(country);
            })
            .catch((locationError) => {
              console.error('Erro ao obter informações de localização:', locationError);
            });

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
        }
      });
    } else {
      console.error("Geolocalização não está disponível.");
    }
  };

  useEffect(() => {
    const updateLocationAndTemperature = () => {
      getLocationAndUpdateWeather();
      updateTimeClass();

      const locationAndTemperatureInterval = setInterval(() => {
        getLocationAndUpdateWeather();
        updateTimeClass();
      }, 300000);

      return () => {
        clearInterval(locationAndTemperatureInterval);
      };
    };

    updateLocationAndTemperature();
  }, []);

  useEffect(() => {
    updateTempClass();
  
    if (temperatura !== "") {
      updateTempClass();

      const updateTempClassInterval = setInterval(() => {
        updateTempClass();
      }, 300000);

      return () => {
        clearInterval(updateTempClassInterval);
      };
    }
  }, [temperatura]);

  useEffect(() => {
    updateImagem();

    if (descricao !== "") {
      updateImagem();

      const updateImagemInterval = setInterval(() => {
        updateImagem();
      }, 300000);

      return () => {
        clearInterval(updateImagemInterval);
      };
    }
  }, [descricao])

  return (
    <div className={classBody}>
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
          <img src={imagem} alt="Imagem do dia"/>
        </div>
      </section>
      <Footer/>
    </div>
  )
}