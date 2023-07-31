import { useEffect } from "react";
import axios from 'axios'
const Comments = ({id,createdAt,postId, authorized,commenter,author,content,onCommentDelete }) => {

const data= {id,author,postId}

async function handleDelete() {
    try {
     const data2 =  await axios.delete(`/place/comments/${id}/delete`, { data });
     onCommentDelete(id); 
      console.log('Comment deleted successfully.');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }


    return ( <>
    <div className="w-100 px-6"> 
    <div className="flex mb-2 relative ">
<div className="relative grid grid-cols-1 gap-4 p-4 w-9/12 border rounded-lg bg-white shadow-lg">
    <div className="relative flex gap-4">
        <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy"/>
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
                <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{commenter}</p>
{ authorized && 
                <button className="fa-solid fa-trash text-gray-500 text-xl bg-white"  onClick={()=>handleDelete()}> </button>
}
           
            </div>
            <p className="text-gray-400 text-sm">{createdAt}</p>
        </div>
    </div>
    <p className="-mt-8  px-4 text-gray-500 text-2xl ">{content}</p>    
</div>



</div>
</div>
    
    </>  );
}
 
export default Comments;