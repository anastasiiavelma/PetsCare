import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';
import { useTranslation } from 'react-i18next';

export const Post = ({
  id,
  name,
  createdAt,
  photoUrl,
  account,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm(`${t('Are you sure you want to delete post?')}`)) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/articles/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {photoUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={photoUrl}
          alt={name}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...account} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? name : <Link to={`/articles/${id}`}>{name}</Link>}
          </h2>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
