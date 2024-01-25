import './section.css'
import {useEffect, useState} from 'react'
import axios from 'axios'

import madrugadaLimpa from '../../assets/madrugada-limpa.png'
import madrugadaNublada from '../../assets/madrugada-nublada.png'
import madrugadaPoucasNuvens from '../../assets/madrugada-poucas-nuvens.png'
import madrugadaChuvosa from '../../assets/madrugada-chuvosa.png'
import madrugadaNeblina from '../../assets/madrugada-neblina.png'
import madrugadaTrovoada from '../../assets/madrugada-trovoada.png'
import madrugadaNeve from '../../assets/madrugada-neve.png'
import amanhecerCeuLimpo from '../../assets/amanhecer-ceu-limpo.png'
import amanhecerNublado from '../../assets/amanhecer-nublado.png'
import amanhecerPoucasNuvens from '../../assets/amanhecer-poucas-nuvens.png'
import amanhecerChuvoso from '../../assets/amanhecer-chuvoso.png'
import amanhecerNeblina from '../../assets/amanhecer-neblina.png'
import amanhecerTrovoada from '../../assets/amanhecer-trovoada.png'
import amanhecerNeve from '../../assets/amanhecer-neve.png'
import manhaLimpa from '../../assets/manha-limpa.png'
import manhaNublada from '../../assets/manha-nublada.png'
import manhaPoucasNuvens from '../../assets/manha-poucas-nuvens.png'
import manhaChuvosa from '../../assets/manha-chuvosa.png'
import manhaNeblina from '../../assets/manha-neblina.png'
import manhaTrovoada from '../../assets/manha-trovoada.png'
import manhaNeve from '../../assets/manha-neve.png'
import tardeLimpa from '../../assets/tarde-limpa.png'
import tardeNublada from '../../assets/tarde-nublada.png'
import tardePoucasNuvens from '../../assets/tarde-poucas-nuvens.png'
import tardeChuvosa from '../../assets/tarde-chuvosa.png'
import tardeNeblina from '../../assets/tarde-neblina.png'
import tardeTrovoada from '../../assets/tarde-trovoada.png'
import tardeNeve from '../../assets/tarde-neve.png'
import fimTardeLimpo from '../../assets/fim-de-tarde-limpo.png'
import fimTardeNublado from '../../assets/fim-de-tarde-nublado.png'
import fimTardePoucasNuvens from '../../assets/fim-de-tarde-poucas-nuvens.png'
import fimTardeChuvoso from '../../assets/fim-de-tarde-chuvoso.png'
import fimTardeNeblina from '../../assets/fim-de-tarde-neblina.png'
import fimTardeTrovoada from '../../assets/fim-de-tarde-trovoada.png'
import fimTardeNeve from '../../assets/fim-de-tarde-neve.png'
import noiteLimpa from '../../assets/noite-limpa.png'
import noiteNublada from '../../assets/noite-nublada.png'
import noitePoucasNuvens from '../../assets/noite-poucas-nuvens.png'
import noiteChuvosa from '../../assets/noite-chuvosa.png'
import noiteNeblina from '../../assets/noite-neblina.png'
import noiteTrovoada from '../../assets/noite-trovoada.png'
import noiteNeve from '../../assets/noite-neve.png'

const apiKeyTem = '529da1a067e842b47730c617e0f33da5';

export default function Section() {

    const data = new Date()
    const ano = data.getFullYear()
    const mes = data.getMonth()
    const diaMes = data.getDate()
    const diaSem = data.getDay()

    const [horas, setHoras] = useState()
    const [minutos, setMinutos] = useState()
    const [segundos, setSegundos] = useState()

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
        if (horas >= 0 && horas < 5) {
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
        } else if (horas >= 5 && horas < 6) {
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
        } else if (horas >= 6 && horas < 12) {
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
        const currentTime = new Date();
        setHoras(currentTime.getHours());
        setMinutos(currentTime.getMinutes());
        setSegundos(currentTime.getSeconds());
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        updateTimeClass();

        if (horas !== '') {
        const updateTimeClassInterval = setInterval(() => {
            updateTimeClass();
        }, 300000);
    
        return () => {
            clearInterval(updateTimeClassInterval);
        };
        }
    }, [horas]);

    const getWeatherData = async (latitude, longitude) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyTem}`
          );
    
          const tempKelvin = response.data.main.temp;
          const tempCelsius = tempKelvin - 273.15;
          const weatherDescription = response.data.weather[0].description;
    
          setTemperatura(`${tempCelsius.toFixed(0)}°C`);
          setDescricao(weatherDescription);
        } catch (error) {
          console.error('Erro ao obter informações de clima:', error);
        }
    };
    
    const getLocationAndUpdateWeather = async () => {
        if ('geolocation' in navigator) {
          try {
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
    
            if (position && position.coords) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
    
              getWeatherData(latitude, longitude);
    
              axios
                .get(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                )
                .then((locationResponse) => {
                  const city = locationResponse.data.address.city;
                  const state = locationResponse.data.address.state;
                  const country = locationResponse.data.address.country_code;
    
                  setCidade(city);
                  setEstado(state);
                  setPais(country);
                })
                .catch((locationError) => {
                  console.error('Erro ao obter informações de localização:', locationError);
                });
            }
                } catch (error) {
                    console.error('Erro ao obter informações de localização:', error);
                }
        } else {
            console.error('Geolocalização não está disponível.');
        }
    };
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            setHoras(currentTime.getHours());
            setMinutos(currentTime.getMinutes());
            setSegundos(currentTime.getSeconds());
        }, 1000);
    
        return () => {
          clearInterval(intervalId);
        };
    }, []);
    
    useEffect(() => {
        updateTimeClass();

        if (horas !== '') {
            const updateTimeClassInterval = setInterval(() => {
            updateTimeClass();
    }, 300000);

        return () => {
        clearInterval(updateTimeClassInterval);
        };
    }
    }, [horas]);
    
    useEffect(() => {
        getLocationAndUpdateWeather();

        const locationAndTemperatureInterval = setInterval(() => {
            getLocationAndUpdateWeather();
        }, 300000);

        return () => {
            clearInterval(locationAndTemperatureInterval);
        };
    }, []);
    
    useEffect(() => {
        updateTempClass();

        if (temperatura !== '') {
            updateTempClass();
        }
    }, [temperatura]);
    
    useEffect(() => {
        updateImagem();

        if (descricao !== '' && horas !== '') {
            updateImagem();
        }
    }, [descricao, horas]);

    return (
        <div className={`container ${classBody}`}>
            <section>
                <div className="data">
                    <marquee>
                        {diaSemana}, {diaMes} de {nomeMes} de {ano}
                    </marquee>
                </div>
                <div className={`hora ${classHoras}`}>
                    {horas < 10 ? `0${horas}` : horas} : {minutos < 10 ? `0${minutos}` : minutos} : {segundos < 10 ? `0${segundos}` : segundos}
                </div>
                <div className="local">
                    <marquee direction="right" scrollamount="4">
                        {pais !== 'br' ? `${cidade} - ${estado} - ${pais.toUpperCase()}` : `${cidade} - ${estado}`}
                    </marquee>
                </div>
                <div className={`clima ${classTemp}`}>
                    {temperatura}
                </div>
                <div className="imagem">
                    <img src={imagem} alt="Imagem do dia"/>
                </div>
            </section>
        </div>
    )
}