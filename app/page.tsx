'use client';
import { useEffect, useRef, useState } from 'react';

const words = [
  ['01','我知道','你总觉得我对她比对你好，\n一直很在意自己在我心里的位置。'],
  ['02','对不起','你没有真切感受到我口中所说的那份重要。\n是我没有做到，把你放在最特别的位置。'],
  ['03','我看见了','小宝贝受的委屈，也看见那些\n一次次落空、被你独自消化的情绪。'],
  ['04','我终于明白','你要的不是空口的安抚，\n而是实实在在、坚定又明确的偏爱。'],
];

function Rose(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current, x=c?.getContext('2d'); if(!c||!x)return;
    let t=0,id=0,mx=0,my=0;
    const ps=Array.from({length:1180},(_,i)=>{const l=i%19,n=Math.floor(i/19);return{l,a:n*.31+l*.73,s:.7+Math.random()*1.6,z:Math.random()*20}});
    const stars=Array.from({length:75},()=>({x:Math.random(),y:Math.random(),s:Math.random()*1.4,p:Math.random()*7}));
    const size=()=>{const d=Math.min(devicePixelRatio,2),r=c.getBoundingClientRect();c.width=r.width*d;c.height=r.height*d;x.setTransform(d,0,0,d,0,0)};
    const move=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};
    const draw=()=>{const w=c.clientWidth,h=c.clientHeight,cx=w/2+mx*28,cy=h*.47+my*18,k=Math.min(w,h)/430;t+=.008;x.clearRect(0,0,w,h);
      stars.forEach(q=>{x.fillStyle=`rgba(255,210,220,${.08+.24*(.5+.5*Math.sin(t*2+q.p))})`;x.beginPath();x.arc(q.x*w,q.y*h,q.s,0,7);x.fill()});
      x.globalCompositeOperation='lighter';ps.forEach(p=>{const r=(10+p.l*6.1+Math.sin(p.a*2.5+p.l*.62+t)* (7+p.l*.7))*k,a=p.a+t*(.12+p.l*.003)+p.l*.18,d=Math.sin(a*1.7+p.l*.52),px=cx+Math.cos(a)*r*(.98+d*.06)+mx*p.l*1.4,py=cy+Math.sin(a)*r*.57+Math.cos(p.a*3-p.l*.23)*7*k+p.l*.9*k-my*p.l*.7;x.shadowColor='rgba(255,35,100,.75)';x.shadowBlur=7+p.l*.3;x.fillStyle=`hsla(${342+p.l*.42},100%,${62+d*10}%,${.27+(19-p.l)*.018+.13*Math.sin(t*3+p.z)})`;x.beginPath();x.arc(px,py,p.s*k*(1+d*.2),0,7);x.fill()});x.globalCompositeOperation='source-over';id=requestAnimationFrame(draw)};
    size();addEventListener('resize',size);addEventListener('pointermove',move);draw();return()=>{cancelAnimationFrame(id);removeEventListener('resize',size);removeEventListener('pointermove',move)}
  },[]);return <canvas ref={ref} className="rose" aria-label="一朵由粒子组成的动态玫瑰"/>;
}

export default function Home(){const[sound,setSound]=useState(false);return <main>
  <section className="hero"><Rose/><div className="grain"/><nav><span className="sigil">Y ♥ U</span><button onClick={()=>setSound(!sound)}>{sound?'SOUND ON':'SOUND OFF'} <i className={sound?'on':''}/></button></nav>
    <div className="heroCopy"><p className="eyebrow">A LETTER FOR MY SPECIAL ONE</p><h1><span>我想把偏爱</span><em>落到行动里</em></h1><p className="intro">不是空口的安抚<br/>是坚定、明确，只属于你的在意</p></div>
    <div className="scroll"><span/>向下，听我说</div><div className="orbit a"/><div className="orbit b"/>
  </section>
  <section className="letter"><header><p>WORDS I OWE YOU</p><h2>有些话，<br/><em>这次认真说。</em></h2></header><div className="chapters">{words.map(([n,h,b])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{b.split('\n').map((v,i)=><span key={i}>{v}<br/></span>)}</p></div></article>)}</div></section>
  <section className="promise"><div className="halo"/><p className="eyebrow">FROM NOW ON</p><h2>以后，不只说爱你。</h2><p>我会用一次次真实的选择和行动，<br/>慢慢弥补，把本该属于你的那份在意补回来。</p><div className="seal"><span>偏爱</span><small>ONLY FOR YOU</small></div><div className="final"><i/>你永远是我最特别的位置<i/></div></section>
  </main>}
