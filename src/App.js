// DEPENDENCIES
import { Routes, Route } from "react-router-dom";

// COMPONENTS
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import Edit from "./Pages/Edit";
import New from "./Pages/New";
import Reload from "./Pages/Reload";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/transactions" element={ <Index />} />
          <Route path="/transactions/new" element={ <New />} />
          <Route path="/transactions/:index" element={ <Show />} />
          <Route path="/transactions/:index/edit" element={ <Edit />} />
          <Route path="*" element={ <Reload />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
