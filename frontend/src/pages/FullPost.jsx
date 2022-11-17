import React from "react";
import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { Post } from "../components";
import axios from "../axios";
import { useTranslation } from 'react-i18next';

export const FullPost = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/articles/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert(`${t('Error when receiving the article')}`)

      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        name={data.name}
        photoUrl={data.photoUrl ? `http://localhost:5000${data.photoUrl}` : ''}
        account={data.account}
        createdAt={data.createdAt}
        isFullPost
      >
        <ReactMarkdown children={data.textInfo} />
      </Post>

    </>
  );
};
