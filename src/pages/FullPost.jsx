import React, { useEffect, useState } from "react";
import axios from '../axios.js';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { Link, useParams } from "react-router-dom";

export const FullPost = () => {
  const [data, setData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const { id } = useParams(); 

  useEffect(() => {
    setIsLoading(true); 
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data); 
        setIsLoading(false); 
      })
      .catch(err => {
        console.error("Ошибка при загрузке данных:", err);
        setIsLoading(false); 
      });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} />; 
  }

  if (!data) {
    return <p>Пост не найден</p>; 
  }

  return (
    <>
      <Link to="/" className="link">🔙</Link>

      <Post
        id={data._id} 
        title={data.title} 
        imageUrl={`http://localhost:4444${data.imageUrl}`} 
        user={data.user} 
        createdAt={new Date(data.createdAt).toLocaleDateString()} 
        viewsCount={data.viewsCount} 
        commentsCount={data.commentsCount} 
        tags={data.tags || []} 
        isFullPost>
        <p>{data.text}</p>
      </Post>

      <CommentsBlock
        items={data.comments || []} 
        isLoading={false}
      >
        <Index /> {/* Компонент добавления комментария */}
      </CommentsBlock>
    </>
  );
};
