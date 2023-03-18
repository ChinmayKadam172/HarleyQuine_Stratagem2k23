import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Token.css';

export default function Token() {
    const [token,setToken] = useState();
    const [data,setData] = useState();
    const {patient} = useAuth();

    useEffect(() => {
        axios.get('http://localhost:5001/getToken')
        .then(response => {
        // handle success
        console.log(response.data);
        setToken(response.data.token)
        })
        .catch(error => {
        // handle error
        console.error(error);
        });

        axios.get('/getPatient', {
            params: {
              uid: patient
            }
          })
          .then(response => {
            // handle success
            console.log(response.data);
            setData(response.data)
          })
          .catch(error => {
            // handle error
            console.error(error);
          });
        

    }, [])
    

  return (
    <div className='body-token'>
    <div className='token-heading'>Token Portal</div>
    <div className='token-number'>
        Token Number : {token}<br></br>
        Patient ID : {patient}
    </div>
    </div>
  )
}
