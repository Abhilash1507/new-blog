import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import {React,useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import BlogSection from '../Components/BlogSection';
import MostPopular from '../Components/MostPopular';
import Spinner from '../Components/Spinner';
import Trending from '../Components/Trending';
import { db } from '../Firebase';

const Home = ({setActive,user}) => {
  const [loading,setLoading] = useState(true);
  const [blogs,setBlogs] = useState([]);
  const [trendBlogs,setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () =>{
        const blogRef = collection(db,"blogs");
        const trendQuery = query(blogRef,where("trending" ,"==" ,"yes"));
        const querySnapshot = await getDocs(trendQuery);
        let trendBlogs = [];
        querySnapshot.forEach((doc)=>{
           trendBlogs.push({id: doc.id, ...doc.data()})
        })
        setTrendBlogs(trendBlogs);
  }

  useEffect(() => {
    getTrendingBlogs();
    const unSubscribe = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        console.log(snapshot);
        snapshot.docs.forEach((doc) => {
         
          list.push({ id: doc.id, ...doc.data() });
        });
          setBlogs(list);
          setLoading(false);
          setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unSubscribe();
      getTrendingBlogs();
    };
  }, []);

  if(loading){
    return <Spinner/>
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="container-fluid pb-4 pt-4 padding">
    <div className="container padding">
      <div className="row mx-0">
        <Trending blogs={trendBlogs} />
      
        <div className="col-md-8">
         <BlogSection blogs={blogs} user={user} handleDelete={handleDelete}/>
         
        </div>
        <div className="col-md-3">
          <MostPopular blogs={blogs} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home