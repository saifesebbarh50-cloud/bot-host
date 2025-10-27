import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register(){
  const nav = useNavigate();
  const [username,setUsername]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit = async (e)=>{ e.preventDefault(); try{ await axios.post('/auth/register',{ username, email, password }); nav('/dashboard'); }catch(e){ alert('Register failed'); } };
  return (
    <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <div style={{textAlign:'center',marginBottom:20}}><div className='logo'>Saif Hosting</div><div style={{opacity:0.8}}>Discord Bot Hosting</div></div>
      <form onSubmit={submit} style={{width:360}} className='card'>
        <input className='input' placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} /><br/><br/>
        <input className='input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
        <input className='input' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <button className='btn' type='submit'>Create account</button>
      </form>
    </div>
  );
}
