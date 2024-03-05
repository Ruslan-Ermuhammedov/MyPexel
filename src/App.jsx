import { createContext, useEffect, useReducer, useState } from 'react'
import Home from './pages/Home/Home'
import AdminPage from './pages/AdminPage/AdminPage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DateilImage from './pages/DeteilImage/DateilImage'
import { Route, Routes } from 'react-router-dom'
import Navbar from './loyaut/Navbar/Navbar'
import Modal from './loyaut/Navbar/Modal'
import LoginAuthForm from './pages/Login/LoginAuthForm'
import AdminPageDanate from './pages/AdminPage/AdminPageDanate'
import ProtectedRoutes from './pages/Login/ProtectedRoutes'
import Tekshiruv from './pages/DeteilImage/Tekshiruv'
import AboutUs from './loyaut/AboutUs/AboutUs'
import ContactUs from './loyaut/ContactUs/ContactUs'
import PrivacyPolicy from './loyaut/PrivacyPolicy/PrivacyPolicy'
import Faq from './loyaut/Faq/Faq'
import TermsService from './loyaut/TermsService/TermsService'
export const StateContext = createContext();

function App() {
  const [categoriesImg, setCategoriesImg] = useState([]);
  const [productsImg, setProductsImg] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || "");
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [gender, setGender] = useState(localStorage.getItem('gender') || "");
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");
  const [quary, setQuary] = useState("");
  const [basketId, setBasketId] = useState(localStorage.getItem('basketId') || 0)
  const [update, setUpdate] = useState(0)
  const [apiLenght, setApiLenght] = useState(0)
  const [Name, setName] = useState(localStorage.getItem('Name') || "")
  const [deteilChildId, setDeilChildId] = useState(0)
  const [changeDefault, setChangeDefault] = useState("")
  const [inputt, setInputt] = useState(false)
  const [basketErrModal, setBasketErrModal] = useState(false)

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("gender", gender);
    localStorage.setItem("basketId", basketId);
    localStorage.setItem("Name", Name);

  }, [token, role, gender, basketId, Name]);
  // setApiLenght
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
      gender, setGender, show, setShow, url, setUrl, url2, setUrl2, quary,
      setQuary, basketId, setBasketId, update, setUpdate,
      apiLenght, setApiLenght, Name, setName, deteilChildId,
      setDeilChildId, changeDefault, setChangeDefault,
      inputt, setInputt,basketErrModal, setBasketErrModal 
    }}>

      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path='/AdminPage'  // Corrected path attribute
              element={<AdminPage />}
            />
            <Route path='/AdminDonatePage' element={<AdminPageDanate />} />
          </Route>
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/basket' element={<Basket />} /> */}
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/login' element={<LoginAuthForm />} />
          <Route path='/tekshir' element={<Tekshiruv />} />
          <Route path='/modal' element={<Modal />} />
          
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/contactUs' element={<ContactUs />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/termsService' element={<TermsService />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/deteil/:id' element={<DateilImage />} />
        </Routes>
      </>
    </StateContext.Provider>
  );
}

export default App;