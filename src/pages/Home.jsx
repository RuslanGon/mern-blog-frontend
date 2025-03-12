import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/post.js';

export const Home = () => {
  const dispatch = useDispatch();
  
  // Получаем данные о постах и тегах из состояния
  const posts = useSelector(state => state.posts.posts);  
  const tags = useSelector(state => state.posts.tags);  
  
  // Проверяем, загружаются ли посты и теги
  const isPostLoading = posts?.status === 'loading';  
  const isTagsLoading = tags?.status === 'loading';  

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {(isPostLoading ? [...Array(5)] : posts?.items || []).map((obj, index) => (
            
            <Post
            key={obj?._id || index} 
            id={obj?._id || index}
            title={obj?.title || "Загружается..."} 
            imageUrl={obj?.imageUrl || 'https://via.placeholder.com/150'}  // Добавьте дефолтное изображение на случай, если отсутствует
            user={{
              avatarUrl: obj?.user?.avatarUrl || 'https://via.placeholder.com/150',  // Добавьте дефолтное изображение для аватара
              fullName: obj?.user?.fullName || 'Неизвестный',  // Добавьте дефолтное имя
            }}
            createdAt={obj?.createdAt || "Загружается..."}  
            viewsCount={obj?.viewsCount ?? 0}  
            commentsCount={obj?.commentsCount ?? 0}  
            tags={Array.isArray(obj?.tags) ? obj.tags : []}  
            isEditable
          />
          ))}
        </Grid>
        <Grid item xs={4}>
          <TagsBlock items={tags.items || []} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Когда отображаются три и более строки, аватар не выравнивается по верхнему краю. Вам следует установить свойство, чтобы выровнять аватар по верхнему краю.',
              },
            ]}
            isLoading={false}  
          />
        </Grid>
      </Grid>
    </>
  );
};
