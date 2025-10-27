import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [bots,setBots]=useState([]);
  useEffect(()=>{ async function f(){ try{ const res=await axios.get('/api/list'); if(res.data.ok) setBots(res.data.bots); }catch(e){ console.log('err',e); } } f(); },[]);
  return (
    <div>
      <div className='header'><div className='logo'>Saif Hosting</div><div></div></div>
      <div className='container'>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2>Your Bot Servers</h2>
          <Link to='/create' className='btn'>+ Create Server</Link>
        </div>
        <div style={{marginTop:20}}>
          {bots.length===0 ? <div className='card'>No servers yet</div> : bots.map(b=> <div key={b._id} className='card'><b>{b.name}</b> <div>Runtime: {b.runtime} | CPU: {b.cpuShares}</div></div>)}
        </div>
      </div>
    </div>
  );
}
