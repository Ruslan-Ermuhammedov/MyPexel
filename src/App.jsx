import { createContext, useEffect, useReducer, useState } from 'react'
import Home from './pages/Home/Home'
import AdminPage from './pages/AdminPage/AdminPage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DateilImage from './pages/DeteilImage/DateilImage'
import { Route, Routes } from 'react-router-dom'
import Navbar from './loyaut/Navbar/Navbar'
import Modal from './loyaut/Navbar/Modal'

export const StateContext = createContext();

function App() {
  const [categoriesImg, setCategoriesImg] = useState([]);
  const [productsImg, setProductsImg] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || "");
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [gender, setGender] = useState(localStorage.getItem('gender') || "");
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [quary, setQuary] = useState("");
  const [basketId, setBasketId] = useState(localStorage.getItem('basketId') || "")
  const [update, setUpdate] = useState(0)
  const [apiLenght, setApiLenght] = useState(0)
  const [Name, setName] = useState(localStorage.getItem('Name') || "")
  const [deteilChildId, setDeilChildId] = useState(0)
  const [changeDefault, setChangeDefault] = useState("")
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("gender", gender);
    localStorage.setItem("basketId", basketId);
    localStorage.setItem("Name", Name);

  }, [token, role, gender, basketId, Name]);

  // const DeleteBtn = () => {
  //   // Lokal ma'lumotlarni tozalash
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   localStorage.removeItem("gender");
  //   localStorage.removeItem("basketId");
  //   localStorage.removeItem("Name");
  //   setToken("");
  //   setRole("");
  //   setGender("");
  //   setBasketId("");
  //   setName("");

  // };


  return (
    <StateContext.Provider value={{
      categoriesImg, setCategoriesImg,
      productsImg, setProductsImg, role, setRole, token, setToken,
      gender, setGender, show, setShow, url, setUrl, quary,
      setQuary, basketId, setBasketId, update, setUpdate,
      apiLenght, setApiLenght, Name, setName, deteilChildId,
      setDeilChildId, changeDefault, setChangeDefault
    }}>

      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/POqFOyIASNkdNNUFqI6pgDR0CCqYPAM7ZYZcwUccCMCK74gbVyfmDFCrjuPyMWgxwCEuJWeNYXDPeRhRguI2KDn2wk9lGyNDkeua4Fz4AL8I49jlt6UtD2CvfnGuk5Zu1lHCEmskaK+hpB9SnBm+cINoGT98fmHxBi9ROWeTNH5w1maOrGlHk/J6z960/tgv8A4ak62c+yPhDqHNZRaNDucoYTNBzNkbSOT0j7/tD5Qc6As/UJ/M3wMOzlhh0HM6pjh0HM6pjdBoeQP5Y7WY/5QYaNkjKWnaK++J2vLCRoKb1D3QonJ+YfVjeFsUsZS0H5F+UKpLUZADsEOzlhkrktMbIE8BDuXyKtBylv7JHiY2wtBTE7XljycgrSfU8V+cO7P+z6ccCUU6qtrzAwrrpGqFfO2E3Hf4Q7pzFLsHIKVQM8wkEA9EDXvJ+EWCy8k7JL/BoILbLyJp2GBAgosifLF5QcQ71wOd9idW0w7FDHIEQcKwKb4ECIC3TnApvgQIgKBvjtDHIEB274QUwIEGhSuuDQIEAYjs864KtI7AgDUjpWsCBBk0mrdKmmsqdtCKjGu1T7ULJMpAgRoLK1YGvsgQIg7dgtwjM6oECKDIa/OOtAgQBcYECBAf/AdminPage'  // Corrected path attribute
            element={<AdminPage />}
          />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/basket' element={<Basket />} /> */}
          <Route path='/register' element={<Register />} />
          <Route path='/modal' element={<Modal />} />
          <Route path='/deteil/:id' element={<DateilImage />} />
        </Routes>
      </>
    </StateContext.Provider>
  );
}

export default App;