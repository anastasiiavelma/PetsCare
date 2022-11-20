import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import { useSelector } from 'react-redux';
import { selectIsAuth } from "../../redux/slices/auth";
import styles from './AddPost.module.scss';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { useTranslation } from 'react-i18next';

export const AddPost = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [textInfo, setTextInfo] = React.useState('');
  const [name, setName] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState('');
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setPhotoUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert(`${t('An error occured while downloading the file')}`);
    }
  };

  const onClickRemoveImage = () => {
    setPhotoUrl('');
  };

  const onChange = React.useCallback((value) => {
    setTextInfo(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        name, photoUrl, textInfo,
      };
      const { data } = isEditing ? await axios.patch(`/articles/${id}`, fields) : await axios.post('/articles', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/articles/${_id}`);
    } catch (err) {
      console.warn(err);
      alert(`${t('Error when creating article')}`);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/articles/${id}`).then(({ data }) => {
        setName(data.name);
        setTextInfo(data.textInfo);
        setPhotoUrl(data.photoUrl);
      }).catch(err => {
        console.warn(err);
        alert(`${t('Error when receiving article')}`);
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: `${t('Enter text...')}`,
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>

      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {photoUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          {t('Delete')}
        </Button>
      )}
      {photoUrl && (
        <img className={styles.image} src={`http://localhost:5000${photoUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder={t('Article title')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <SimpleMDE className={styles.editor} value={textInfo} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? `${t('Save')}` : `${t('Create')}`}
        </Button>
        <a href="/">
          <Button size="large">{t('Cancel')}</Button>
        </a>
      </div>
    </Paper>
  );
};
