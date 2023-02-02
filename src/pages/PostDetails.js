import React, { useState, useEffect } from 'react'
import { getDocs, collection, deleteDoc, doc, addDoc,getDoc, updateDoc  } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";

function PostDetails() {

    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    let { postId } = useParams();
    const docRef = doc(db, "posts", postId);

    let navigate = useNavigate();
    
    const updatePost = async () => {
        await updateDoc(docRef, {
          title : title,
          postText : postText
        });
        navigate("/");
      };

     useEffect(() => {
         const getPosts = async () => {
            const doc = await getDoc(docRef);
            setTitle(doc.data().title)
            setPostText(doc.data().postText)
            
         };
    
         getPosts();
    }, []);

  return (
    <div className="createPostPage">
    <div className="cpContainer">
      <h1>Modify A Post</h1>
      <div className="inputGp">
        <label> Title:</label>
        <input
          placeholder="Title..."
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="inputGp">
        <label> Post:</label>
        <textarea
          placeholder="Post..."
          value={postText}
          onChange={(event) => {
            setPostText(event.target.value);
          }}
        />
      </div>
      <button onClick={updatePost}> Update Post</button>
    </div>
  </div>
  )
}

export default PostDetails