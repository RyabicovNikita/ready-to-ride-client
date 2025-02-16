import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Main } from "./components/Main/Main";
import { Footer } from "./components";
// import { RoutesContainer } from "./routes";

function App() {
  // const [margin, setMargin] = useState(0);
  // useEffect(() => {
  //   const handleResize = ({ target }) => {
  //     if (target.innerWidth <= 1920) return;
  //     setMargin(target.innerWidth - 1920);
  //   };
  //   window.addEventListener("resize", handleResize);
  // }, []);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
