
import './App.css';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>


      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/editor/:roomId' element={<EditorPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
