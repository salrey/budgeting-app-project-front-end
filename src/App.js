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
import { useState } from "react";

const App = () => {
  //useState at the parent level to capture updates on the total balance
  const [update, setUpdate] = useState()
  
  return (
    <div className="App">
      <NavBar update={update}/>
      <main>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/transactions" element={ <Index parentCallBack={setUpdate} />} />
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
