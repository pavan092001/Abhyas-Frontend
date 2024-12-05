import React from 'react'
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

function InputBox({label,type,...props}) {
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
    
    const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`sm:${props.wd} md:${props.wd}`}>
    <TextField
      label={label}
      type={inputType}
      onChange={props.onChangeField}
      variant="outlined"
      fullWidth
      required
      InputProps={
        type === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
     
    />
    </div>
  )
}

export default InputBox