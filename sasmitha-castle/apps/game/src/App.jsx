import React, { useEffect, useMemo, useState } from "react";
import { Crown, Heart, LockKeyhole, LogIn, LogOut, Mail, Sparkles, Trophy, Volume2, WandSparkles } from "lucide-react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "./firebase.js";
import { LEVELS, TILE_TYPES, BOARD_SIZE } from "@sasmitha/shared";

const makeBoard = () => Array.from({length:BOARD_SIZE},()=>Array.from({length:BOARD_SIZE},()=>TILE_TYPES[Math.floor(Math.random()*TILE_TYPES.length)]));
const initialBoard = () => {
  let b=makeBoard();
  for(let r=0;r<BOARD_SIZE;r++) for(let c=0;c<BOARD_SIZE;c++) {
    while((c>=2&&b[r][c]===b[r][c-1]&&b[r][c]===b[r][c-2])||(r>=2&&b[r][c]===b[r-1][c]&&b[r][c]===b[r-2][c])) b[r][c]=TILE_TYPES[Math.floor(Math.random()*TILE_TYPES.length)];
  }
  return b;
};
function findMatches(board) {
  const hits=new Set();
  for(let r=0;r<BOARD_SIZE;r++) for(let c=0;c<BOARD_SIZE;c++) {
    const v=board[r][c]; if(!v) continue;
    if(c<BOARD_SIZE-2&&v===board[r][c+1]&&v===board[r][c+2]) { for(let k=0;k<3;k++) hits.add(`${r},${c+k}`); }
    if(r<BOARD_SIZE-2&&v===board[r+1][c]&&v===board[r+2][c]) { for(let k=0;k<3;k++) hits.add(`${r+k},${c}`); }
  }
  return hits;
}
function dropMatches(board) {
  let next=board.map(row=>row.slice()), hits=findMatches(next), count=0;
  while(hits.size&&count<8) {
    count+=1;
    hits.forEach(key=>{const [r,c]=key.split(",").map(Number);next[r][c]=null;});
    for(let c=0;c<BOARD_SIZE;c++){
      const vals=[]; for(let r=BOARD_SIZE-1;r>=0;r--) if(next[r][c]) vals.push(next[r][c]);
      for(let r=BOARD_SIZE-1;r>=0;r--) next[r][c]=vals[BOARD_SIZE-1-r]||TILE_TYPES[Math.floor(Math.random()*TILE_TYPES.length)];
    }
    hits=findMatches(next);
  }
  return {board:next,cleared:count};
}
export default function App(){
 const [user,setUser]=useState(null),[authReady,setAuthReady]=useState(!firebaseConfigured);
 const [mode,setMode]=useState("login"),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[authError,setAuthError]=useState("");
 const [level,setLevel]=useState(1),[score,setScore]=useState(0),[moves,setMoves]=useState(18),[board,setBoard]=useState(initialBoard),[selected,setSelected]=useState(null),[message,setMessage]=useState("Match jewels to bring magic back to the kingdom.");
 const [sound,setSound]=useState(true),[saved,setSaved]=useState(false);
 const current=LEVELS[level-1];
 useEffect(()=>{if(!auth)return;return onAuthStateChanged(auth,async u=>{setUser(u);setAuthReady(true);if(u&&db){try{const s=await getDoc(doc(db,"players",u.uid));if(s.exists()){const d=s.data();setLevel(Math.min(10,d.level||1));setScore(d.score||0);setSaved(true);}}catch(e){console.error(e);}}});},[]);
 async function saveProgress(nextScore=score,nextLevel=level){
  if(!user||!db)return;
  try{await setDoc(doc(db,"players",user.uid),{email:user.email,score:nextScore,level:nextLevel,updatedAt:serverTimestamp()},{merge:true});setSaved(true);}catch(e){setMessage("Cloud save failed. Check your Firebase Firestore rules.");}
 }
 async function submitAuth(e){e.preventDefault();setAuthError("");if(!firebaseConfigured){setAuthError("Firebase is not configured yet. Add VITE_FIREBASE_* values in apps/game/.env.local.");return;}
  try{if(mode==="register")await createUserWithEmailAndPassword(auth,email,password);else await signInWithEmailAndPassword(auth,email,password);}catch(err){setAuthError(err.message.replace("Firebase: ",""));}}
 function startLevel(n){setLevel(n);setMoves(LEVELS[n-1].moves);setScore(0);setBoard(initialBoard());setSelected(null);setMessage("Find matches of 3 or more magical gems.");}
 function clickTile(r,c){
  if(moves<=0)return;
  if(!selected){setSelected([r,c]);return;}
  const [sr,sc]=selected;
  if(sr===r&&sc===c){setSelected(null);return;}
  if(Math.abs(sr-r)+Math.abs(sc-c)!==1){setSelected([r,c]);return;}
  let next=board.map(row=>row.slice());[next[sr][sc],next[r][c]]=[next[r][c],next[sr][sc]];
  const hits=findMatches(next);
  if(!hits.size){setSelected(null);setMessage("Try a different neighbouring gem ✨");return;}
  const result=dropMatches(next), earned=result.cleared*90+Math.max(0,result.cleared-1)*35;
  const newScore=score+earned,newMoves=moves-1;
  setBoard(result.board);setScore(newScore);setMoves(newMoves);setSelected(null);
  if(newScore>=current.target){const nl=Math.min(10,Math.max(level+1,level));setMessage("✨ Level complete! The castle shines brighter!");saveProgress(newScore,nl);}
  else if(newMoves===0){setMessage("Out of moves! Try this level again.");saveProgress(newScore,level);}
  else setMessage(`Wonderful! +${earned} magic points.`);
 }
 async function nextLevel(){if(level<10)startLevel(level+1);else setMessage("You restored Sasmitha's Royal Castle! 👑");}
 if(!authReady)return <div className="loading"><div className="crest">👑</div><h1>SASMITHA CASTLE</h1><p>Opening the kingdom…</p></div>;
 if(!user)return <main className="auth-screen"><div className="auth-art"><div className="stars">✦　✧　✦　✧</div><div className="castle-scene"><div className="moon">☾</div><div className="tower t1">♜</div><div className="tower t2">♜</div><div className="castle-main">🏰</div><div className="sparkle s1">✧</div><div className="sparkle s2">✦</div></div><div className="hero-copy"><span className="eyebrow">A LITTLE MAGIC. A GREAT ADVENTURE.</span><h1>SASMITHA<br/><em>CASTLE</em></h1><p>Match magical gems. Unlock enchanted lands.<br/>Help the young prince restore his kingdom.</p><div className="hero-pills"><span>✦ 10 magical levels</span><span>♛ Royal adventure</span></div></div></div><section className="auth-card"><div className="mini-crest">👑</div><span className="eyebrow">WELCOME, ADVENTURER</span><h2>{mode==="login"?"Enter the Kingdom":"Join the Kingdom"}</h2><p className="muted">Sign in to save your royal journey.</p><form onSubmit={submitAuth}><label>Email address</label><div className="input-wrap"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></div><label>Password</label><div className="input-wrap"><LockKeyhole size={17}/><input type="password" minLength="6" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" required/></div>{authError&&<div className="error">{authError}</div>}<button className="primary full" type="submit"><LogIn size={17}/>{mode==="login"?"Enter the Castle":"Create Account"} <span>→</span></button></form><div className="switch-mode">{mode==="login"?"New to the kingdom?":"Already have an account?"} <button onClick={()=>{setMode(mode==="login"?"register":"login");setAuthError("");}}>{mode==="login"?"Create account":"Sign in"}</button></div><div className="secure-note"><LockKeyhole size={14}/> Your progress is saved to your account.</div>{!firebaseConfigured&&<div className="setup-note">Demo preview: configure Firebase environment variables to enable registration and login.</div>}</section><footer className="page-foot">MADE WITH MAGIC <span>✦</span> SASMITHA CASTLE</footer></main>;
 return <main className="game-page"><header className="topbar"><div className="brand-mark">👑</div><div className="brand"><b>SASMITHA <span>CASTLE</span></b><small>THE ROYAL GEM QUEST</small></div><div className="top-actions"><span className="player-chip">✦ {user.email?.split("@")[0]}</span><button className="icon-btn" onClick={()=>setSound(!sound)} title="Sound setting"><Volume2 size={18}/></button><button className="icon-btn" onClick={()=>signOut(auth)} title="Sign out"><LogOut size={18}/></button></div></header><section className="game-layout"><aside className="side-panel"><div className="side-title"><Crown size={18}/> YOUR KINGDOM</div><div className="prince-card"><div className="prince-art">🤴</div><div><b>Prince Sasmitha</b><small>Guardian of the Gems</small></div><span className="online-dot"/></div><div className="castle-card"><div className="castle-sky"><div className="castle-moon">☾</div><div className="castle-emoji">🏰</div><div className="castle-hill">✿　♧　✿　♧</div></div><div className="castle-caption"><span>YOUR CASTLE</span><b>{current.name}</b><small>Restore the magic one match at a time.</small></div></div><div className="level-list-title">YOUR JOURNEY <span>{level}/10</span></div><div className="level-list">{LEVELS.map(l=><button key={l.id} className={`level-item ${l.id===level?"active":""} ${l.id>level?"locked":""}`} onClick={()=>l.id<=level&&startLevel(l.id)}><span className="level-icon">{l.id>level?"🔒":l.castle}</span><span><b>{String(l.id).padStart(2,"0")} · {l.name}</b><small>{l.id<level?"✦ Completed":l.id===level?"▶ Playing":"Complete previous level"}</small></span>{l.id<level&&<span className="check">✓</span>}</button>)}</div></aside><section className="play-panel"><div className="welcome-row"><div><span className="eyebrow">WELCOME BACK, ROYAL HERO</span><h1>Let the magic <em>begin.</em></h1><p>Match 3 or more gems to reach your level goal.</p></div><div className="daily-badge"><Sparkles size={19}/><span>MAGIC<br/><b>QUEST</b></span></div></div><div className="stats-row"><div className="stat-card"><span>✦ SCORE</span><b>{score.toLocaleString()}</b><small>Target: {current.target.toLocaleString()}</small><div className="progress"><i style={{width:`${Math.min(100,score/current.target*100)}%`}}/></div></div><div className="stat-card"><span>♟ MOVES LEFT</span><b>{moves}</b><small>Make each move count</small></div><div className="stat-card"><span>♛ LEVEL</span><b>{String(level).padStart(2,"0")}<small className="of-ten"> / 10</small></b><small>{current.name}</small></div></div><div className="board-shell"><div className="board-heading"><div><span className="eyebrow">ENCHANTED PUZZLE</span><h2>{current.castle} {current.name}</h2></div><span className="goal-pill"><Trophy size={15}/> {current.target} points</span></div><div className="board" role="grid" aria-label="Match three puzzle board">{board.map((row,r)=>row.map((tile,c)=><button key={`${r}-${c}`} aria-label={`Row ${r+1}, column ${c+1}, ${tile||"empty"}`} className={`tile ${selected?.[0]===r&&selected?.[1]===c?"selected":""}`} onClick={()=>clickTile(r,c)}>{tile}</button>))}</div><div className="message"><WandSparkles size={17}/><span>{message}</span></div><div className="board-buttons"><button className="secondary" onClick={()=>startLevel(level)}>↻ Restart Level</button>{score>=current.target&&<button className="primary" onClick={nextLevel}>Next Level →</button>}</div></div><div className="tip"><Heart size={16}/><span><b>Royal tip:</b> Look for three matching gems in a row or column. Bigger cascades bring extra magic!</span></div></section></section><footer className="game-footer"><span>© SASMITHA CASTLE</span><span>BUILT WITH ♥ AND A LITTLE MAGIC</span><span>{saved?"☁ Progress saved":"◈ Progress saves when signed in"}</span></footer></main>;
}