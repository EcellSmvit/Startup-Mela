import './App.css'
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
   </div>
  )
}

export default App
