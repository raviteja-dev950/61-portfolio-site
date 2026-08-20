import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  useEffect(() => {
    api.get("/portfolio/profile").then(res => setProfile(res.data));
    api.get("/portfolio/projects").then(res => setProjects(res.data));
    api.get("/portfolio/stats").then(res => setStats(res.data));
  }, []);

  const sendContact = async () => {
    if (!name || !email || !message) {
      setContactMsg("Fill all fields!");
      return;
    }
    try {
      const res = await api.post("/portfolio/contact", { name, email, message });
      setContactMsg(res.data.message);
      setName(""); setEmail(""); setMessage("");
      setTimeout(() => setContactMsg(""), 4000);
    } catch {
      setContactMsg("Failed to send!");
    }
  };

  if (!profile) return <div style={{color:"white", padding:20}}>Loading 61...</div>;

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", fontFamily:"Segoe UI, sans-serif", scrollBehavior:"smooth"}}>
      {/* Header */}
      <header style={{padding:"20px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #222", position:"sticky", top:0, background:"#0a0a0a", zIndex:100}}>
        <div style={{fontWeight:"bold", fontSize:22}}><span style={{color:"#00ff88"}}>Ravi</span>.dev</div>
        <div style={{display:"flex", gap:20, fontSize:14, alignItems:"center"}}>
          <a href="#projects" style={{color:"#aaa", textDecoration:"none", cursor:"pointer"}}>Projects</a>
          <a href="#skills" style={{color:"#aaa", textDecoration:"none", cursor:"pointer"}}>Skills</a>
          <a href="#contact" style={{color:"#aaa", textDecoration:"none", cursor:"pointer"}}>Contact</a>
          <span style={{background:"#00ff88", color:"black", padding:"4px 12px", borderRadius:20, fontWeight:"bold"}}>61/100</span>
        </div>
      </header>

      {/* Hero */}
      <section style={{padding:"80px 40px", display:"flex", gap:60, flexWrap:"wrap", alignItems:"center", maxWidth:1200, margin:"0 auto"}}>
        <div style={{flex:1, minWidth:300}}>
          <div style={{color:"#00ff88", fontSize:14, letterSpacing:2, marginBottom:15}}>JAVA FULL STACK DEVELOPER</div>
          <h1 style={{fontSize:56, fontWeight:800, lineHeight:1.1, margin:"0 0 20px 0"}}>{profile.name}<br/><span style={{color:"#555"}}>{profile.role}</span></h1>
          <p style={{color:"#999", fontSize:18, lineHeight:1.6, maxWidth:500}}>{profile.about}</p>
          
          <div style={{display:"flex", gap:15, marginTop:30}}>
            <button style={{background:"#00ff88", color:"black", border:"none", padding:"12px 28px", borderRadius:30, fontWeight:"bold", cursor:"pointer"}} onClick={() => window.open(`https://github.com/${profile.github}`)}>GitHub</button>
            <button style={{background:"transparent", color:"white", border:"1px solid #333", padding:"12px 28px", borderRadius:30, cursor:"pointer"}} onClick={() => document.getElementById('contact').scrollIntoView({behavior:"smooth"})}>Contact Me</button>
          </div>

          {stats && (
            <div style={{display:"flex", gap:40, marginTop:40}}>
              <div><div style={{fontSize:28, fontWeight:"bold"}}>{stats.totalProjects}</div><div style={{color:"#666", fontSize:12}}>PROJECTS</div></div>
              <div><div style={{fontSize:28, fontWeight:"bold"}}>{stats.tierProgress}</div><div style={{color:"#666", fontSize:12}}>TIER 6</div></div>
              <div><div style={{fontSize:28, fontWeight:"bold"}}>{stats.completed}</div><div style={{color:"#666", fontSize:12}}>COMPLETED</div></div>
            </div>
          )}
        </div>

        <div id="skills" style={{flex:"0 0 320px", background:"#111", border:"1px solid #222", borderRadius:20, padding:30}}>
          <div style={{width:80, height:80, background:"linear-gradient(135deg,#00ff88,#00d4ff)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, fontWeight:"bold", color:"black"}}>RT</div>
          <h3 style={{margin:"20px 0 5px 0"}}>{profile.name}</h3>
          <div style={{color:"#00ff88", fontSize:14}}>{profile.role}</div>
          <div style={{color:"#666", fontSize:13, marginTop:15}}>📍 {profile.location}</div>
          <div style={{color:"#666", fontSize:13}}>✉️ {profile.email}</div>
          <div style={{color:"#666", fontSize:13}}>🔗 {profile.github}</div>
          <div style={{marginTop:20, paddingTop:20, borderTop:"1px solid #222"}}>
            <div style={{color:"#00ff88", fontSize:12, marginBottom:10, letterSpacing:1}}>SKILLS</div>
            <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
              {profile.skills?.map((s,i) => (
                <span key={i} style={{background:"#222", padding:"5px 12px", borderRadius:20, fontSize:12}}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{padding:"60px 40px", maxWidth:1200, margin:"0 auto"}}>
        <h2 style={{fontSize:36, fontWeight:800, marginBottom:10}}>Featured Projects</h2>
        <p style={{color:"#666", marginBottom:30}}>Latest 3 from 100 Projects Challenge</p>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20}}>
          {projects.map(p => (
            <div key={p.id} style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:24}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:15}}>
                <span style={{background:"#00ff88", color:"black", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:"bold"}}>#{p.id}</span>
                <span style={{color: p.status==="Completed"?"#00ff88":"#ffaa00", fontSize:12}}>{p.status}</span>
              </div>
              <h3 style={{margin:"0 0 8px 0", fontSize:18}}>{p.title}</h3>
              <div style={{color:"#666", fontSize:13, marginBottom:15}}>{p.tech}</div>
              <button onClick={() => window.open(p.link)} style={{background:"#222", color:"white", border:"none", padding:"8px 16px", borderRadius:20, fontSize:12, cursor:"pointer"}}>View on GitHub →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{padding:"60px 40px", maxWidth:800, margin:"0 auto"}}>
        <div style={{background:"#111", border:"1px solid #222", borderRadius:20, padding:40}}>
          <h2 style={{fontSize:32, fontWeight:800, margin:"0 0 10px 0"}}>Let's Work Together</h2>
          <p style={{color:"#666", marginBottom:30}}>Have a project idea? Contact me!</p>
          
          <div style={{display:"flex", flexDirection:"column", gap:15}}>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" style={{background:"#0a0a0a", border:"1px solid #333", padding:"14px 18px", borderRadius:12, color:"white", outline:"none"}}/>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your Email" style={{background:"#0a0a0a", border:"1px solid #333", padding:"14px 18px", borderRadius:12, color:"white", outline:"none"}}/>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Your Message" rows={4} style={{background:"#0a0a0a", border:"1px solid #333", padding:"14px 18px", borderRadius:12, color:"white", outline:"none", resize:"none"}}/>
            <button onClick={sendContact} style={{background:"#00ff88", color:"black", border:"none", padding:"14px", borderRadius:12, fontWeight:"bold", cursor:"pointer", fontSize:16}}>Send Message 🚀</button>
            {contactMsg && <div style={{background:"#00ff8820", color:"#00ff88", padding:"12px", borderRadius:10, textAlign:"center", fontSize:14}}>{contactMsg}</div>}
          </div>
        </div>
      </section>

      <footer style={{textAlign:"center", padding:30, color:"#444", fontSize:13, borderTop:"1px solid #111", marginTop:40}}>
        © 2026 Ravi Teja • 61/100 Projects • Built with React + Spring Boot • Tier 6
      </footer>
    </div>
  );
}