import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
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