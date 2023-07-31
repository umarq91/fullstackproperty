import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router";
import Comments from "./Comments";
import CommentBox from "./CommentBox";
import { UserContext } from '../UserContext'
import toast, { Toaster } from 'react-hot-toast';


const PlaceSinglePage = () => {
    const {id} = useParams();
    const[showAllPhotos,setShowAllPhotos] = useState(false)
  let authorized = false;

    const [comments, setComments] = useState([]);
    const [place,setPlace] = useState(null)
    const {user,setUser} = useContext(UserContext);
    

    useEffect(() => {
      if (!id) return;
  
      // Fetch place details
      axios.get('places/' + id).then((res) => {
        setPlace(res.data);
      });


    axios.get(`/${id}/comments`).then(resp=>{
       
        setComments(resp.data)

      })

   
    }, [comments]);




    const addNewComment = (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
      toast.success('Comment Added')
    };

    const handleCommentDelete = (deletedCommentId) => {
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== deletedCommentId));
      toast('Comment Deleted!', {
        icon: '🗑️',
      });
    };


    

    if(!place) return '';
    if (showAllPhotos) {
     
      return (

        <div className="absolute inset-0 bg-black text-white  min-h-screen mt-0">
          <div className="bg-black p-8 grid gap-4 flex justify-center ">
            <div>
              <h2 className="text-bold"> Photos of {place.location}</h2>
              <button onClick={()=>setShowAllPhotos(false)} className="flex fixed gap-1 py-2 px-4 top-8 right-16 shadow shadow-black rounded-2xl bg-white text-black"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              
              Close Photos </button>
             

            </div>
        {place?.photos?.length>0 && place.photos.map(photo =>(
          <div>  
            <img src={'http://localhost:4000/uploads/'+photo} />
             </div>
        ))}
          </div>
        </div>
   
   );
  }



    return ( 
      <>        
      
      <div className="mt-8 bg-gray-100">
     <h1 className="font-bold text-black text-6xl">  {place.location} </h1>

     <h1 className="text-lg  mt-2 text-black "> <span className="text-blue-500">Likes({place.likes.length}) </span> <span className="text-red-500">Dislikes({place.dislikes.length}) </span>  </h1>
     <div className="flex"> 
     <div className="text-2xl font-bold mt-4 underline "> {place.city} , {place.country} </div>
      <div className="flex  ml-64 gap-0 pt-4 ">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>

        <a target="_blank" className="block text-blue-600 h-8 mt-1 font-semibold underline" href={'https://www.google.com/maps/?q=' + place.location}>
          Location!
        </a>
      
      </div>
      </div>
    
      <div className="flex gap-16">
      <div className="mt-4 bg-gray-100 -mx-4 py-4">
        <div className="grid gap-2 grid-cols-[2fr_1fr] relative">
          <div>
            {place.photos[0] && (
              <div>
                <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {place.photos[1] && (
              <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos[1]} alt="" />
              )}
            {place.photos[2] && (
              <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="" />
              )}
          </div>
          
        </div>
      </div>

     <div className="mr-4"> 
     <h1 className="mt-4 font-bold text-gray-100 max-w-sm">Full Address: <span className="text-xl"> {place.address} </span></h1>

     
     </div>
      </div>
      <button onClick={()=> setShowAllPhotos(true)} className="absolute bottom-0 text-black bg-gray-300 rounded-2xl h-8  max-w-full right-64  ">Show More Photos</button>
     
    
   



 <div className="mb-20">
              <h1 className="text-4xl font-bold  text-black"> {place.address} </h1>

              <h2 className="mt-4 text-4xl text-black underline font-bold">Description :  </h2>
              <h2 className="mt-2 ml-4 text-2xl text-black">{place.extraInfo}   </h2>
              
 </div>
 <div className="mb-20">
             
              <h2 className="mt-4 text-4xl text-black underline font-bold">Positive Things :  </h2>
              <h2 className="mt-2 ml-4 text-2xl text-black">{place.positiveThings}   </h2>
              
 </div>
 <div className="mb-20">
             
             <h2 className="mt-4 text-4xl text-black underline font-bold">Negative Things :  </h2>
             <h2 className="mt-2 ml-4 text-2xl text-black">{place.negativeThings}   </h2>
             
</div>
<div className="bg-gray-200">
        <div> 

          <div> 
          <h1 className="text-4xl font-bold flex px-4  mb-4"> Comments ({ comments.length})</h1>
              {!user && <p className="text-2xl px-10 mb-4 text-red-500"> Info : only logged in users can comment </p>} 
          </div>

          {user && 
            <CommentBox placeId={id} onAddNewComment={addNewComment} />
          }
          
        
        </div>
        {comments.map((c) => (
          <>
          {user? 
          
          authorized=c.author ===  user._id? authorized=true:false : authorized=false }



       
          <Comments key={c._id}  onCommentDelete={handleCommentDelete} postId={place._id} id={c._id}authorized={authorized}  commenter={c.commenter} createdAt={c.createdAt} content={c.content}  author={c.author}   />
          </>
        ))}
</div>

   
<Toaster/>
    </div>

    

    </>

     );
}
 
export default PlaceSinglePage;