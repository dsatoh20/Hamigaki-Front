import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import KeyIcon from '@mui/icons-material/Key';

export default function PasswordMeterInput({value, onChange}) {
  const minLength = 12;

  // パスワードの強さに応じて色を変える
  const getProgressColor = () => {
    if (value.length < 3) return 'error';
    if (value.length < 6) return 'warning';
    if (value.length < 10) return 'info';
    return 'success';
  };

  return (
    <Stack spacing={1}>
      <TextField
        type="password"
        placeholder=" Password"
        variant="outlined"
        InputProps={{
          startAdornment: <KeyIcon sx={{ mr: 1 }} />,
        }}
        value={value}
        onChange={onChange}
        required
      />
      <LinearProgress
        variant="determinate"
        value={Math.min((value.length * 100) / minLength, 100)}
        color={getProgressColor()}
      />
      <Typography
        variant="caption"
        align="right"
        color={getProgressColor()}
      >
        {value.length < 3 && 'Very weak'}
        {value.length >= 3 && value.length < 6 && 'Weak'}
        {value.length >= 6 && value.length < 10 && 'Strong'}
        {value.length >= 10 && 'Very strong'}
      </Typography>
    </Stack>
  );
}
