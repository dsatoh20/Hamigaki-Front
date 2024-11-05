import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Stack, Divider, styled, Paper } from '@mui/material';
import Login from '../Login';
import SignUp from '../SignUp';
import { useUser } from '../AuthWrapper';
import { handleLogout } from './usercomponents/LogoutFunc';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function MenuAppBar() {
  console.log('MenuBarが動いてます')
  const user = useUser();
  const { fetchUserInfo } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [haveAccount, setHaveAccount] = React.useState(true); // アカウントを持っているか？デフォルトはTrue
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  
  React.useEffect(() => {
    if (user.user === null) {
      setIsLoggedin(false);
    };
  }, [user])

  const handleChange = (event) => {
    if (event.target.checked === false) { // とりあえずログアウトにチェックされたら、ログアウト
      handleLogout(setIsLoggedin, fetchUserInfo); // handleLogoutにsetIsLoggedinを渡す
    } else if (user.user === null) { // ログアウトの時のみ実行
      alert('ユーザー情報入力よろしく');
    } else if (user.user !== null) {
      setIsLoggedin(event.target.checked); // ログイン時のみ更新
      console.log("ログイン中: ", user, user.id)
    }
  };

  const handleHaveAccount = (event) => {
    setHaveAccount(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isLoggedin}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={isLoggedin ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static" sx={{bgcolor: "primary.dark"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Box height='32px'><img src={`${process.env.PUBLIC_URL}/logo192.png`} alt='logo' height='100%' /></Box>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hamigaki🦷Calender
          </Typography>
          {isLoggedin && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {console.log("ユーザーは", user.user, user.user === null)}
      {user.user === null && (
        <Stack 
          divider={<Divider orientation="vertical" />}
          spacing={2}
          sx={{ 
            justifyContent: 'center',
            width: '300px',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 2,
            bgcolor: 'primary.main',
            border: 3,
            borderColor: 'primary.main',
           }}
        >
          <Item><Typography variant='body1'>{haveAccount ? "Login" : "SignUp"}</Typography></Item>
          <Item>
            {haveAccount ? (
              <Login setAuth={setIsLoggedin} />
            ): (<SignUp setHaveAccount={setHaveAccount} />)}
          </Item>
          <Item>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Switch
                    checked={haveAccount}
                    onChange={handleHaveAccount}
                    aria-label="login switch"
                  />
                }
                label={haveAccount ? "Don't have an account?" : 'Already have an account?'}/>
            </FormGroup>
          </Item>
        </Stack>
      )}
    </Box>
  );
}
