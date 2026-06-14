import { useState, useEffect } from 'react'

import '../App.css'
import '../index.css'

export default function AddUser(){

    async function addUser(){
        const name = document.querySelector('#name').value;
        const description = document.querySelector('#desc').value;
        const intrs = document.querySelector('#intrs').value;
        const interests = intrs.split(' ').slice(0,3);
        if (interests.length == 0)
            alert("no interests?")
        const social1_name = document.querySelector('#social1-name').value;
        const social1_link = document.querySelector('#social1-link').value;
        const social2_name = document.querySelector('#social2-name').value;
        const social2_link = document.querySelector('#social2-link').value;
        const social3_name = document.querySelector('#social3-name').value;
        const social3_link = document.querySelector('#social3-link').value;

        const payload = {
            name,
            description,
            interests,
            socials:{
                [social1_name]: social1_link,
                [social2_name]: social2_link,
                [social3_name]: social3_link,
            }
        };

        try{
            const response = await fetch('http://localhost:3000/user/add', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            alert(data.message);
        }
        catch(e){
            console.log(e.message);
        }
    }

    return(
        <div className='input'>
            <h2 className='headings'>Add User</h2>
            <div className='subinput'>
                <input id='name' className='inputBox' type={"text"} placeholder={'Name'} required></input>
                <input required id='desc' className='inputBox' type={"text"} placeholder={'Description'}></input>
                <input required id='intrs' className='inputBox' type={"text"} placeholder={'Interests (space separated)'}></input>
            </div>
            <div className='subinput'>
                <input required id='social1-name' className='inputBox' type={"text"} placeholder={'Social-1 Name'}></input>
                <input required id='social1-link' className='inputBox' type={"text"} placeholder={'Social-1 Link'}></input>
            </div>
            <div className='subinput'>
                <input required id='social2-name' className='inputBox' type={"text"} placeholder={'Social-2 Name'}></input>
                <input required id='social2-link' className='inputBox' type={"text"} placeholder={'Social-2 Link'}></input>
            </div>
            <div className='subinput'>
                <input required id='social3-name' className='inputBox' type={"text"} placeholder={'Social-3 Name'}></input>
                <input required id='social3-link' className='inputBox' type={"text"} placeholder={'Social-3 Link'}></input>
            </div>
            <div className='centerItems'>
                <button className='btn' onClick={addUser}>Add User</button>
            </div>
        </div>
    )
}