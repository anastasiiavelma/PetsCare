import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Post } from '../components/Post'
import axios from '../axios'
import { t } from 'i18next'

export const FullPost = () => {
  const [data, setData] = React.useState()
  const [isLoading, setLoading] = React.useState(true)
  const { id } = useParams()

  React.useEffect(() => {
    axios
      .get(`/articles/${id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert(`${t('Error when receiving the article')}`)
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        name={data.name}
        photoUrl={data.photoUrl ? `http://localhost:5000${data.photoUrl}` : ''}
        account={data.account}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        isFullPost>
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown children={data.textInfo} />
      </Post>
    </>
  )
}
