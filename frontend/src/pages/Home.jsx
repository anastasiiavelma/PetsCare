import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Grid from '@mui/material/Grid';

import { Post } from "../components";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';
import { selectIsAuth } from "../redux/slices/auth";
import 'react-tabs/style/react-tabs.css';
import { useTranslation } from 'react-i18next';
import background from "../assets/backCat1.jpg";


export const Home = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);
  const isAuth = useSelector(selectIsAuth);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [])



  return (
    < >
      <Tabs>
        <TabPanel>
          <Grid container spacing={4}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? <Post key={index} isLoading={true} /> : (
                <Post
                  id={obj._id}
                  name={obj.name}
                  photoUrl={obj.photoUrl ? `http://localhost:5000${obj.photoUrl}` : ''}
                  account={obj.account}
                  createdAt={obj.createdAt}
                  isEditable={isAuth}
                />
              ))}
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </TabPanel>

      </Tabs>
    </>
  );
};
