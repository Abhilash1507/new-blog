import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { React, useState, useEffect } from "react";
import { storage } from "../Firebase";
import { toast } from "react-toastify";


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

const AddEditBlog = () => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress,setProgress] = useState(null);

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
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload successfull");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleChange = () => {};
  const handleTrending = () => {};
  const onCategoryChange = () => {};
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">create blog</div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form action="">
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
                    onChange={handleChange}
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
                <button className="btn btn-add" type="submit">submit</button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
