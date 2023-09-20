import logo from "./logo.svg";
import "./App.css";
import TopBarNav from "./components/TopBarNav";
import CarouselAnim from "./components/CarouselAnim";

//<CarouselAnim/> to put after <div className="carousel-animation">

function App() {
  return (
    <div className="App">
      <div className="top-bar-container">
        <TopBarNav />
      </div>
      <div className="carousel-container">
        <CarouselAnim />
      </div>
    </div>
  );
}

export default App;
