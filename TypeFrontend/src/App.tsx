import './App.css'
import EventSection from './Pagesection/EventSection'
// import RandomShapeCard from './Components/Imagecard'
import HeroSection from './Pagesection/HeroSection'
import Horizontalpage from './Pagesection/Horizontalpage'
import NextSection from './Pagesection/NextSection'

function App() {
  
  return (
   <div>
      <HeroSection/>    
      <NextSection/>
      {/* <RandomShapeCard/> */}
      <Horizontalpage/>
      <EventSection/>
   </div>
  )
}

export default App
