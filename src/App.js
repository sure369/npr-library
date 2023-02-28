import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import Students from "./components/Students";
import Books from "./components/Books";
import StudentDetailPage from "./components/recordDetailpage/StudentDetailPage";
import BookDetailPage from "./components/recordDetailpage/BookDetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/students" element={<Students />} />
          <Route path="/books" element={<Books />} />
          <Route path='/studentdetailpage' element={<StudentDetailPage/>}/>
          <Route path ='/bookdetailpage' element={<BookDetailPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
