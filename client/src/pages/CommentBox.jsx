import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from '../UserContext'

const CommentBox = ({ placeId, onAddNewComment,commentsLength }) => {
  const { user, setUser } = useContext(UserContext);
  const [content, setContent] = useState('');

  const data = { placeId, content, user};

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await axios.post(`/${placeId}/comments`, data);
   
    

     
    // Clear the comment box after submission
    setContent('');
    


    // Notify the parent component (PlaceSinglePage) that a new comment has been added
    onAddNewComment(res.data);
  };

  return (
    <div className="bg-gray-200">
      <form className="mb-4" onSubmit={handleClick}>
        <div>
          <textarea
            value={content}
            name="comments"
            id="comments"
            style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex ml-auto" > Submit Comment </button>
      </form>
    </div>
  );
};

export default CommentBox;
