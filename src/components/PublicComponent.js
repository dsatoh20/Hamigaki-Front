import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';


const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';
const token = localStorage.getItem('authToken');

export default function PublicBooleanField({id, publicStat}) {

    
    const [pub, setPub] = useState(publicStat);
    const handleCheck = (event) => {
        setPub(event.target.checked);
    };
    useEffect(() => {
        fetch(`${apiBaseUrl}/api/calenders/${id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ public: pub }),
          })
          .then(response => response.json())
          .then(data => {
            if (data) {
              console.log('Succeed', data);
              pub ? alert('友だちと共有します'): alert('共有を停止します');
              } else {
                console.log('Canceled')
              }
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }, [pub, id]);


    return (
        <>
            <Checkbox 
                checked={pub} 
                onChange={handleCheck}
                icon={<PublicOffIcon sx={{ color: "primary.dark"}}/>}
                checkedIcon={<PublicIcon sx={{ color: "text.primary"}}/>}
                sx={{
                     position: "absolute",
                     top:0,
                     right:0
                    }}
            />
        </>
    );
};