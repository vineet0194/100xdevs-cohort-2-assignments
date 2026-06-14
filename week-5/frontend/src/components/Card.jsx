import '../App.css'
import '../index.css'
import { memo } from 'react';

export default memo(function Card( {user} ){
    async function deleteUser(){
        const _id = user._id;

        try{
            const response = await fetch('http://localhost:3000/user/delete', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id})
            });
            const data = await response.json();
            alert(data.message);
        }
        catch(e){
            console.log(e.message);
        }
    }

    return (
        <div className='card'>
            <div className='space-between'>
                <h2 className='headings'>{user.name}</h2>
                <a className='btn deleteUserBtn' onClick={deleteUser}>x</a>
            </div>
            <p className='text'>{user.description}</p>
            <div>
                <h3 className='headings'>Interests</h3>
                <div className='text'>
                    <ul style={{
                        'listStyleType': 'none',
                        padding: '0px'
                    }}>
                        {
                            user.interests.map((interest, index)=>{
                                return <li key={index}>{interest}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='text'>
                {
                    Object.entries(user.socials).map((socialItem, index)=>{
                        return <a key={index} target='_blank' className='btn' href={socialItem[1]}>{socialItem[0]}</a>
                    })
                }
            </div>
        </div>
    )
});