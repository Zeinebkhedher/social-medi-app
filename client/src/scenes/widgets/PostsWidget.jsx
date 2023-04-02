import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import Poste from "./Poste";


const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    // const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const posts = [
        {
            _id: 1,
            userId: 1,
            firstName: "John",
            lastName: "Doe",
            description: "This is my first post",
            location: "New York",
            picturePath: "post1.jpg",
            userPicturePath: "p1.jpg",
            likes: 10,
            comments: ["bbbbbb", "aaaaaaaaa"]
        },
        {
            _id: 2,
            userId: 2,
            firstName: "Jane",
            lastName: "Doe",
            description: "This is my second post",
            location: "Los Angeles",
            picturePath: "post2.jpg",
            userPicturePath: "p2.jpg",
            likes: 15,
            comments: ["bbbbbb", "aaaaaaaaa"]
        },
        {
            _id: 2,
            userId: 2,
            firstName: "Jane",
            lastName: "Doe",
            description: "This is my second post",
            location: "Los Angeles",
            picturePath: "post3.jpg",
            userPicturePath: "p3.jpg",
            likes: 15,
            comments: ["bbbbbb", "aaaaaaaaa"]
        },
        {
            _id: 2,
            userId: 2,
            firstName: "Jane",
            lastName: "Doe",
            description: "This is my second post",
            location: "Los Angeles",
            picturePath: "post2.jpg",
            userPicturePath: "p2.jpg",
            likes: 15,
            comments: ["bbbbbb", "aaaaaaaaa"]
        },

    ];

    /* const getPosts = async () => {
       const response = await fetch("http://localhost:3001/posts", {
         method: "GET",
         headers: { Authorization: `Bearer ${token}` },
       });
       const data = await response.json();
       dispatch(setPosts({ posts: data }));
     };
   
     const getUserPosts = async () => {
       const response = await fetch(
         `http://localhost:3001/posts/${userId}/posts`,
         {
           method: "GET",
           headers: { Authorization: `Bearer ${token}` },
         }
       );
       const data = await response.json();
       dispatch(setPosts({ posts: data }));
     };
   
     useEffect(() => {
       if (isProfile) {
         getUserPosts();
       } else {
         getPosts();
       }
     }, []);*/ // eslint-disable-line react-hooks/exhaustive-deps
    //"posts.map()" est utilisé pour parcourir le tableau de "posts" retourné par le "useSelector"
    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <Poste
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;