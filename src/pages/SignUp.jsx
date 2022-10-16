import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../Firebase";




const SignUp = ({setActive}) => {
   
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== repeatPassword){

          return toast.error("password mismatch")
        } 
        if(password === repeatPassword){
           const {user} = await createUserWithEmailAndPassword(auth,email,password);
       
             await updateProfile(user, {displayName:`${firstName} ${lastName}`});  
           
             setActive('home')
                  
     }
     navigate('/')
    

  }

  const signInWithGoogle = async () =>{
     try{
      await signInWithPopup(auth,provider)
      setActive('home');
      navigate('/')  

     }catch (error){
     
     }
     
    }
       

   return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card-body p-md-">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 ">
                    Sign up
                  </p>
                  <form onSubmit={handleSubmit} class="mx-1 mx-md-4">
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          placeholder="First Name"
                          name="firstName"
                          autoComplete="firstName"
                          required
                          value={firstName}
                          onChange={event =>setFirstName(event.target.value)}

                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          placeholder="Last Name"
                          name="lastName"
                          autoComplete="lastName"
                          value={lastName}
                          onChange={event => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          placeholder="Email"
                          required
                          
                          value={email}
                          onChange={event => setEmail(event.target.value)}
                          
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          placeholder="Password"
                          required
                          value={password}
                          minLength="8"
                          onChange={event => setPassword(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4cd"
                          className="form-control"
                          placeholder="Repeat-Password"
                          value={repeatPassword}
                          minLength="8"
                          onChange={event => setRepeatPassword(event.target.value)}
                         
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Register
                      </button>
                    </div>
                  </form>
                  <p>Already have an Account...? <Link to={'/signin'} style={{textDecoration: 'none'}}> <span >sign in</span></Link></p>
                  <h5>OR</h5>
                  <div className="form-check d-flex justify-content-center mb-5">
                    <button type="button" className="btn btn-outline-danger btn-lg" onClick={signInWithGoogle}>
                      <i className="fab fa-google me-2"></i>
                      CONTINUE WITH GOOGLE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
