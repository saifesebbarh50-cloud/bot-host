import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateServer(){
  const nav = useNavigate();
  const [name,setName]=useState(''); const [runtime,setRuntime]=useState('node'); const [cpu,setCpu]=useState(50); const [memory,setMemory]=useState(256);
  const submit = async (e)=>{ e.preventDefault(); try{ const res = await axios.post('/api/create',{ name, runtime, cpu, memoryMB: memory }); if(res.data.ok) nav('/dashboard'); }catch(e){ alert('Create failed: '+(e.response?.data?.error||e.message)); } };
  return (
    <div className='container'>
      <h2>Create Bot Server</h2>
      <form onSubmit={submit} className='card' style={{maxWidth:600}}>
        <label>Server name</label>
        <input className='input' value={name} onChange={e=>setName(e.target.value)} required />
        <label>Runtime</label>
        <select className='input' value={runtime} onChange={e=>setRuntime(e.target.value)}>
          <option value='node'>Node.js</option>
          <option value='python'>Python</option>
        </select>
        <label>CPU shares (default 50)</label>
        <input className='input' type='number' value={cpu} onChange={e=>setCpu(e.target.value)} />
        <label>Memory (MB)</label>
        <input className='input' type='number' value={memory} onChange={e=>setMemory(e.target.value)} />
        <div style={{marginTop:12,display:'flex',gap:8,alignItems:'center'}}>
          <button className='btn' type='submit'>Create</button>
          <a className='btn' href='/dashboard'>Cancel</a>
        </div>
      </form>
      <div style={{marginTop:20}} className='card'>
        <h3>Upload bot files</h3>
        <p>After creating a server, you can upload a ZIP or files to its directory using the back-end upload endpoint.</p>
      </div>
    </div>
  );
}
