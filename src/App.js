import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Noticias from './components/Noticias'
import Section from './components/Section'

export default function App() {
  return (
    <div>
      <Header/>
      <Noticias/>
      <Section/>
      <Footer/>
    </div>
  )
}