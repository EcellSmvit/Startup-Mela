import './App.css'
import EventSection from './Pagesection/EventSection'
import FooterSection from './Pagesection/FooterSection'
// import RandomShapeCard from './Components/Imagecard'
import HeroSection from './Pagesection/HeroSection'
import Horizontalpage from './Pagesection/Horizontalpage'
import LoadingSection from './Pagesection/LoadingSection'
import NextSection from './Pagesection/NextSection'

function App() {
  
  return (
   <div>
    <LoadingSection/>
      <HeroSection/>    
      <NextSection/>
      {/* <RandomShapeCard/> */}
      <Horizontalpage/>
      <EventSection/>
      <FooterSection/>
   </div>
  )
}

export default App
