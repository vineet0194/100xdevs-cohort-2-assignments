import { useState } from 'react'
import Card from './components/Card'
import OldCard from './components/OldCard';
import CardMaker from './components/CardMaker';
import './App.css'

function App() {
  const [ userData, setUserData ] = useState([
    {
      "name": "Vineet",
      "description": "Full stack developer",
      "interests": ["gaming", "coding"],
      "socials": {
        "instagram": "link---",
        "twitter": "link---"
      }
    }
  ]);

  return (
    <div>
      <CardMaker userData={userData}></CardMaker>
    </div>
  )
}

export default App
