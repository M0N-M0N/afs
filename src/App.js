import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

// import routing pages
import Home from "./comps/Home";
import Login from "./comps/Login";
import OrgEvents from "./comps/OrgEvents";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')

  return (
    <div className="App">
        <div className="content">
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                    <Route path="/" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
                    <Route path="/events" element={<OrgEvents setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
                </Routes>
            </BrowserRouter>
            {/*<OrgEvents />*/}
        </div>

    </div>
  );
}

export default App;
