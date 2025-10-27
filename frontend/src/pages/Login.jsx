import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const handleLocal = async (e)=>{
    e.preventDefault();
    try{ await axios.post('/auth/login',{ email, password }); nav('/dashboard'); }catch(e){ alert('Login failed'); }
  };
  return (
    <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <div style={{textAlign:'center',marginBottom:20}}>
        <div className='logo'>Saif Hosting</div>
        <div style={{opacity:0.8}}>Discord Bot Hosting</div>
      </div>

      <form onSubmit={handleLocal} style={{width:360}} className='card'>
        <input className='input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
        <input className='input' type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <button className='btn' type='submit'>Login (Email)</button>
      </form>

      <div style={{marginTop:12}}>
        <a href='/auth/discord' className='btn'>Login with Discord</a>
      </div>

      <div style={{marginTop:12}}><a href='/register'>Register</a></div>
    </div>
  );
}
