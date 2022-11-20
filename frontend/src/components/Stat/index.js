import { PeopleAltOutlined, TextSnippetOutlined } from "@mui/icons-material";
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { fetchPosts} from "../../redux/slices/posts";
import { fetchAcc } from "../../redux/slices/accounts";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {pink } from "@mui/material/colors";

import { useTranslation } from "react-i18next";


const Stat = (id) => {

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { posts } = useSelector(state => state.posts);
  const { accounts } = useSelector(state => state.accounts);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchAcc());
  }, []);
  return (

    <Box
      sx={{
        marginLeft:'300px',
        marginTop:'60px',
        height:'200px',
        width:'2000px',
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 1,
        textAlign: 'center',
        flexDirection: 'row',
      }}
    >

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">{t('Total Users')}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PeopleAltOutlined sx={{ height: 100, width: 100, opacity: 0.3, mr: 1, color: pink[500] }} />
          <Typography variant="h4">{accounts.items.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">{t('Total Articles')}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextSnippetOutlined sx={{ height: 100, width: 100, opacity: 0.3, mr: 1, color: pink[500] }} />
          <Typography variant="h4">{posts.items.length}</Typography>
        </Box>
      </Paper>

    </Box>
  );
};

export default Stat;