import {React,useState,useEffect} from 'react';
import './App.css';
import './style.scss'
import Home from './pages/Home';
import Details from './pages/Detail';
import AddEditBlog from './pages/AddEditBlog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import {Routes,Route, useNavigate, Navigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { auth } from './Firebase';
import { signOut } from 'firebase/auth';

function App() {

  const [active,setActive] = useState("home");
  const [user,setUser]= useState(null);
  const navigate = useNavigate()

  useEffect(()=>{
    
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(null)
      }

    })

  },[])

  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      setUser(null);
      setActive('signin')
      navigate('/Signin')
    })
  }

  return (
    <div className="App">
      <Header active = {active} setActive={setActive} user={user} handleLogout= {handleLogout}/>
    <ToastContainer/>
    <Routes>
       <Route exact path='/' element={<Home setActive={setActive} user={user} />} />
       <Route exact path='/detail/:id' element={<Details setActive={setActive}/>}/>
       <Route exact path='/create' element={user?.uid ? <AddEditBlog user={user}/> :<Navigate to='/'/>}/>
       <Route exact path='/update/:id' element={user?.uid ? <AddEditBlog user={user}/> :<Navigate to='/' setActive={setActive}/>}/>
       <Route exact path='/about' element={<About/>}/>
       <Route exact path='/signUp' element={<SignUp setActive={setActive}/>}/>
       <Route exact path='/signin' element={<SignIn setActive={setActive}/>}/>
       <Route exact path='*' element={<NotFound/>}/>
     </Routes>
     
   
    </div>
  );
}

export default App;

