import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/post.js';

export const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);  // Получаем посты
  const tags = useSelector(state => state.posts.tags);  // Получаем теги
  const isPostLoading = posts.status === 'loading';  // Проверка статуса загрузки постов

  useEffect(() => {
    dispatch(fetchPosts());  // Загружаем посты при монтировании компонента
  }, [dispatch]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => (
            <Post
              key={index}  
              id={obj ? obj._id : index}  
              title={obj ? obj.title : "Загружается..."}  
              imageUrl={obj ? obj.imageUrl : "https://via.placeholder.com/150"}  
              user={{
                avatarUrl: obj ? obj.user.avatarUrl : "https://via.placeholder.com/50",  
                fullName: obj ? obj.user.fullName : "Загружается...",  
              }}
              createdAt={obj ? obj.createdAt : 'Загружается...'}  
              viewsCount={obj ? obj.viewsCount : 0}  
              commentsCount={obj ? obj.commentsCount : 0} 
              tags={obj ? obj.tags : []}  
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={false} />
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
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
