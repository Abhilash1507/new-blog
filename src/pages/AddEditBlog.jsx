import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { React, useState, useEffect } from "react";
import { db, storage } from "../Firebase";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate,useParams} from "react-router-dom";


const initialState = {
  title: "",
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [

  "fashion",
  "Technology",
  "food",
  "Travel",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = ({user,setActive}) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress,setProgress] = useState(null);

  const {id} = useParams();  
  const navigate = useNavigate();

  const { title, category, trending, description } = form;
     useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
           
              break;
            case "running":
   
              break;
            default:
              break;
          }
        },
        (error) => {
      
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image uploading successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);
  
  useEffect(()=>{
    id && getBlogDetail();
  },[id])

  const getBlogDetail = async () =>{
     const docRef = doc(db,"blogs",id);
     const snapshot = await getDoc(docRef);
     if( snapshot.exists()){
      setForm({...snapshot.data()})
     }
     setActive(null)
  }
   
  const handleChange = (event) => {
       event.preventDefault();
       setForm({...form,[event.target.name]:event.target.value})
  };
  const handleTrending = (event) => {
          event.preventDefault();
          setForm({...form, trending: event.target.value})
  };
  const onCategoryChange = (event) => {
       event.preventDefault();
       setForm({...form,category:event.target.value})
  };
  
  const handleSubmit = async (event) =>{
     event.preventDefault();
     if (category  && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
      
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
      
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    
     navigate('/')
  }
   
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-4">{id ? "Update Blog":"Create Blog"}</div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                 <select
                 value={category} 
                 onChange={onCategoryChange}
                 className="catg-dropdown">
               <option value="">Please select category</option>
                {categoryOption.map((option,index)=>(
                   <option value={option || ""} key={index}>
                       {option}
                   </option>
                   
                ))}
                  
              
                 </select>
              </div>
              <div className="col-12 py3">
                <textarea className="form-control description-box" 
                placeholder="Description" value={description} name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
              </div>
               <div className="mb-3">
                <input type="file" className="form-control" onChange={(event)=> setFile(event.target.files[0]) } />
               </div>
               <div className="col-12 py-3 text-center">
                <button className="btn btn-add"  disabled={progress !== null && progress < 100} type="submit">{id ? "Update Blog":"Create Blog"}</button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
