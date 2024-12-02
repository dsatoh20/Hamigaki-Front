import * as React from 'react';
import {TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchUserInput() {
  return (
    
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        sx={{width: '100%', borderRadius: 1, bgcolor: '#FFFFF0'}}
        disableClearable
        options={allUsers.map((option) => option.username)} // fetchしたuserリスト
        renderInput={(params) => (
            <TextField
                {...params}
                label="Search user"
                placeholder="type username"
                slotProps={{
                input: {
                    ...params.InputProps,
                    type: 'search',
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{paddingBottom: '10px'}}/>
                        </InputAdornment>
                    )
                },
                }}
                color="primary"
            />
        )}
      />
    
  );
}

// ハードコーディング
const allUsers = [
  { username: 'testuser', email: 'test@test.com' },
  { username: 'public', email: 'public@public.com' },
];
