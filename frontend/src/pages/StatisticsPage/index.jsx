import React from 'react'

import Stat from "../../components/Stat";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const StatPage = () => {

  const { t } = useTranslation();
  return (
    <>

      <Typography variant="h3" sx={{paddingBottom: '50px', marginLeft: '470px', fontWeight: '600', color: '#f4b2c4'}}>{t('Statistics')}</Typography>
      <div
        style={{
          display: 'flex',
          background: `#E3C1C1FF`,
          borderRadius: "20px",
          backgroundAttachment: 'fixed',
          minHeight: '50vh'
        }}>

         <Stat />
      </div>
    </>
  )
}

export default StatPage
