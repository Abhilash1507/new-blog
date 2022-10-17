import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../Firebase";

const SignIn = ({ setActive, setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
    const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        setUser(user);
        setActive("home");
        
      } catch (error) {
        console.log(error)
      }
     
          
    }
    navigate("/");
  };

  const signInWithGoogle = async () => {
     await signInWithPopup(auth, provider);
    setActive("home");
    navigate("/");
  };
   

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-7 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 ">
                    Log in
                  </p>
                  <form onSubmit={handleSubmit} class="mx-1 mx-md-4">
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
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
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-danger btn-lg">
                        Log in
                      </button>
                    </div>
                  </form>
                  <p>
                    Don't have an Account...?{" "}
                    <Link to={"/signup"} style={{ textDecoration: "none" }}>
                      {" "}
                      <span>sign up</span>
                    </Link>
                  </p>
                  <h5>OR</h5>
                  <div className="form-check d-flex justify-content-center mb-5 mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-lg "
                      onClick={signInWithGoogle}
                    >
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

export default SignIn;
