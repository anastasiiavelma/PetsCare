import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Grid from '@mui/material/Grid'

import { Post } from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/slices/posts'
import { selectIsAuth } from '../redux/slices/auth'
import 'react-tabs/style/react-tabs.css'
import { t } from 'i18next'

export const Home = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)
  const isAuth = useSelector(selectIsAuth)

  const isPostsLoading = posts.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>{t('Articles')}</Tab>
        </TabList>

        <TabPanel>
          <Grid container spacing={4}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl ? `http://localhost:5000${obj.imageUrl}` : ''}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    isEditable={isAuth}
                  />
                )
              )}
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </TabPanel>
      </Tabs>
    </>
  )
}
