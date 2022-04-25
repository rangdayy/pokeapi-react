import React, { useContext } from 'react';

import { languageOptions } from '../languages/languages';
import { LanguageContext } from '../containers/language';
import { Box, TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  // set selected language by calling context method
  const handleLanguageChange = e => userLanguageChange(e.target.value);

  return (
    <Box sx={{ display: 'flex', pb: 2 }} justifyContent="right">
      <TextField
        id="outlined-select-currency"
        select
        label="language"
        value={userLanguage}
        onChange={handleLanguageChange}
        size="small"
      >
        {Object.entries(languageOptions).map(([id, name]) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};