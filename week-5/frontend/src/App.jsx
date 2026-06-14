import { useState } from 'react'
import { useEffect } from 'react';
import AddUser from './components/AddUser';
import Card from './components/Card';
import './App.css'
import './index.css'

function App() {
  const [ userData, setUserData ] = useState([]);
  
  useEffect(()=>{
      const fetchUsers = async()=>{
          try{
              const response = await fetch('http://localhost:3000/user/showall');
              const data = await response.json();
              setUserData(data);
          }
          catch(error){
              console.error(error);
          }
      }
      fetchUsers();

      const intervalId = setInterval(fetchUsers, 3000);
  }, []);


  return (
    <div>
      <AddUser/>
      <div className='container'>{
        userData.map((user)=>{
            return <Card key={user._id} user={user}/>
        })}
      </div>
    </div>
  )
}

export default App
