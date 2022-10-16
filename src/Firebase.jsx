import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import {getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDNcHLNnoNyrWIwOUHJl43N0OZQejdVGxQ",
    authDomain: "react-blog-c173f.firebaseapp.com",
    projectId: "react-blog-c173f",
    storageBucket: "react-blog-c173f.appspot.com",
    messagingSenderId: "313563412678",
    appId: "1:313563412678:web:4dcd19355aec0d9e25bfc7",
    measurementId: "G-BPB8B72KQ6"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const provider = new GoogleAuthProvider(app)

  export {auth,db,storage,provider,signInWithPopup}
