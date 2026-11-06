(() => {
  const en = document.documentElement.lang === 'en';
  const root = document.documentElement;
  const background = document.createElement('div');
  background.className = 'circuit-background';
  background.setAttribute('role','region');background.setAttribute('aria-label',en?'Research circuit':'リサーチ・サーキット');
  const track = 'M180 200 C140 120 300 70 430 145 L660 240 Q740 270 800 180 Q870 85 980 155 L1120 310 Q1150 360 1070 410 L865 520 Q810 550 880 615 L1005 720 Q1070 785 950 815 L710 800 Q640 790 650 720 L675 610 Q680 560 610 550 L420 555 Q350 555 315 490 L180 300 Q150 255 180 200 Z';
  const car = `<g class="circuit-car" style="offset-path:path('${track}')" fill="none" stroke="#b4efff" stroke-width="1.6" stroke-linejoin="round"><g class="circuit-car-outline"><path d="M28 -17V17H23V-17ZM-29 -16V16H-24V-16ZM23 -3L6 -5L-3 -11L-19 -9L-23 -5V5L-19 9L-3 11L6 5L23 3Z"/><rect x="10" y="-18" width="9" height="7" rx="1"/><rect x="10" y="11" width="9" height="7" rx="1"/><rect x="-22" y="-18" width="11" height="8" rx="1"/><rect x="-22" y="10" width="11" height="8" rx="1"/><path d="M13 -11L8 -5M13 11L8 5M-15 -10L-10 -6M-15 10L-10 6M-5 -4H3Q8 0 3 4H-5ZM-21 0H-9"/></g></g>`;
  const circuitSvg = `<svg viewBox="85 30 1120 850" preserveAspectRatio="xMidYMid meet"><g fill="none" stroke-linejoin="round"><path d="${track}" stroke="#719bf4" stroke-width="76" opacity=".3"/><path d="${track}" stroke="#456ac7" stroke-width="68"/><path d="${track}" stroke="#d9e8ff" stroke-width="68" stroke-dasharray="14 14"/><path d="${track}" stroke="#080f23" stroke-width="54"/><path d="${track}" stroke="#6486c2" stroke-width="1" stroke-dasharray="5 12" opacity=".5"/><path d="M187 205L207 234 M181 214L201 243 M175 223L195 252" stroke="#dceaff" stroke-width="3"/><path d="M220 310L345 485Q370 520 420 520L560 520" stroke="#89b3ff" stroke-width="2" stroke-dasharray="6 6"/></g><g fill="#b8d4ff" font-family="monospace" font-size="15" letter-spacing="2"><text x="205" y="70">PATIENT</text><text x="825" y="65">CLINICAL TEAM</text><text x="935" y="555">ROBOTICS</text><text x="720" y="870">DATA</text><text x="100" y="505">HOSPITAL</text><text x="300" y="495" font-size="12">PIT LANE</text></g>${car}</svg>`;
  background.innerHTML = circuitSvg;
  background.setAttribute('aria-hidden','true');background.removeAttribute('role');background.removeAttribute('aria-label');
  document.body.prepend(background);
  const lines = [
    ['HUMAN','#b5c5ff','M0 29 L35 29 Q45 29 55 20 L85 20 Q95 20 105 29 L160 29 Q175 29 190 12 L230 12 Q245 12 260 24 L320 24 L360 16 L420 16'],
    ['ROBOTICS','#8bd5ff','M0 30 L40 30 L40 19 L100 19 L100 30 L175 30 L175 10 L245 10 L245 26 L320 26 L320 16 L420 16'],
    ['DATA','#88b0ff','M0 28 L28 28 L40 21 L54 26 L68 12 L80 30 L100 20 L120 25 L150 19 L172 24 L190 8 L205 29 L222 17 L245 24 L270 13 L290 22 L320 16 L350 22 L380 12 L420 16']
  ];
  const waves = (mini=false) => lines.map(([name,color,d],i) => {
    const scroll = `<g class="wave-scroll" style="--wave-duration:${[5,6.5,4.5][i]}s"><path d="${d}"/><path d="${d}" transform="translate(420 0)"/></g><path class="monitor-sweep" d="M407 1V39"/>`;
    return mini
      ? `<span style="--trace:${color}">${name}<svg viewBox="0 0 420 40" preserveAspectRatio="none" aria-hidden="true">${scroll}</svg></span>`
      : `<div class="telemetry-row" style="--trace:${color}"><b>${name}<small>${['COORDINATION','ASSISTANCE','INSIGHT'][i]}</small></b><svg viewBox="0 0 420 40" preserveAspectRatio="none" aria-hidden="true">${scroll}</svg></div>`;
  }).join('');
  const mini = document.createElement('div');mini.className='mini-telemetry';mini.setAttribute('aria-hidden','true');mini.innerHTML='<small>COORDINATION</small>'+waves(true);
  document.querySelector('.orbital-diagram')?.append(mini);
  const diagram = document.querySelector('.orbital-diagram');
  const originalLabel = diagram?.getAttribute('aria-label');
  const deck = document.createElement('section');deck.className='circuit-deck';deck.id='research-circuit';deck.hidden=true;deck.setAttribute('aria-label',en?'Behind the circuit':'サーキットに込めた研究の視点');
  deck.innerHTML=`<div><p class="eyebrow">BEHIND THE CIRCUIT</p><h2>${en?'Different roles.<br>One shared purpose.':'異なる役割を、<br>ひとつの価値へ。'}</h2><p>${en?'Motorsport performance is shaped by people, machines, data and decisions. This original circuit reflects a similar interest in healthcare: how different roles and systems work together.':'モータースポーツを支えるのは、人、マシン、データ、そして戦略。その協調への関心を、医療の研究領域で描いたオリジナルのサーキットです。'}</p><p>${en?'For patients, healthcare professionals and hospital operations. The aim is to create value through coordination.':'患者価値、医療従事者の支援、病院経営・運営の改善へ。個々の技術だけでなく、それらがつながる仕組みを考えています。'}</p></div><div class="circuit-telemetry"><p class="eyebrow">TELEMETRY / COORDINATION</p>${waves()}<p class="circuit-note">${en?'Illustrative signals showing coordination between people, robotics and data. These are not measurements or live research data.':'人・ロボット・データの協調を表すイメージ図です。波形は演出用で、実測値や研究データではありません。'}</p></div>`;
  document.querySelector('.fields')?.after(deck);
  const wall=document.createElement('div');wall.className='pitwall-console';wall.innerHTML=`<div class="pitwall-console-top"><span class="pitwall-wordmark">PIT WALL</span><span class="pitwall-pill">RESEARCH CONTROL</span></div><div class="pitwall-console-bottom"><span>${en?'PROGRAMME & PUBLICATION STATUS':'研究プログラム・論文のステータス'}</span><span>02 CHANNELS <i></i></span></div>`;document.querySelector('.news-grid')?.before(wall);
  document.querySelectorAll('.news-card').forEach((card,i)=>{
    const status=document.createElement('div');status.className='pitwall-status';status.innerHTML=`<span class="pit-channel">${i===0?'01':'02'}</span><span class="pit-channel-info"><small>${i===0?'RESEARCH PROGRAMME':'PUBLICATION'}</small><strong>${i===0?'SELECTED':'PUBLISHED'}</strong></span><span class="pit-flag">${i===0?'FUNDING':'PAPER'}</span>`;card.prepend(status);
    const board=document.createElement('div');board.className='pitwall-board';board.innerHTML=`<div><span>${i===0?'PROGRAMME':'ROLE'}</span><b>${i===0?'JST FOREST':(en?'CORRESPONDING AUTHOR':'責任著者')}</b></div><div><span>${i===0?'ANNOUNCED':'PUBLISHED'}</span><b>${i===0?'27 OCT 2026':'15 OCT 2026'}</b></div><div class="pitwall-progress"><span>${i===0?'SELECTION CONFIRMED':'PUBLICATION CONFIRMED'}</span><div>${'<i></i>'.repeat(18)}</div></div>`;card.querySelector('.news-footer')?.before(board);
  });
  // Locate each named checkpoint on the actual centreline, and follow the car's CSS position.
  const ns='http://www.w3.org/2000/svg';
  const checkpoints=[];
  const makeSvg=(name,attrs)=>{const el=document.createElementNS(ns,name);Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,String(value)));return el;};
  document.querySelectorAll('.circuit-background>svg').forEach(svg=>{
    const road=svg.querySelector('path');const length=road.getTotalLength();
    Array.from(svg.querySelectorAll('text')).filter(text=>['PATIENT','CLINICAL TEAM','ROBOTICS','DATA','HOSPITAL'].includes(text.textContent)).forEach(text=>{
      const x=Number(text.getAttribute('x')),y=Number(text.getAttribute('y'));
      text.setAttribute('font-size','24');text.setAttribute('font-weight','650');
      const width=text.getComputedTextLength()||text.textContent.length*16;const targetX=x+width/2,targetY=y-8;
      let best={distance:Infinity,fraction:0,point:null};
      for(let step=0;step<800;step++){const fraction=step/800,point=road.getPointAtLength(length*fraction),distance=(point.x-targetX)**2+(point.y-targetY)**2;if(distance<best.distance)best={distance,fraction,point};}
      const group=makeSvg('g',{'class':'circuit-checkpoint','data-checkpoint':text.textContent});
      text.parentNode.insertBefore(group,text);
      const plate=makeSvg('rect',{x:x-10,y:y-24,width:width+20,height:33,rx:4,'class':'checkpoint-plate'});
      const link=makeSvg('path',{d:`M${best.point.x} ${best.point.y}L${targetX} ${y+11}`,'class':'checkpoint-connector'});
      const ring=makeSvg('circle',{cx:best.point.x,cy:best.point.y,r:32,'class':'checkpoint-ring'});
      const pulse=makeSvg('circle',{cx:best.point.x,cy:best.point.y,r:36,'class':'checkpoint-pulse'});
      group.append(link,ring,pulse,plate,text);
      checkpoints.push({group,fraction:best.fraction,name:text.textContent,point:best.point,original:{x,y},text,plate,link,width});
    });
  });
  const passing=document.createElement('div');passing.className='circuit-passing';passing.setAttribute('aria-hidden','true');passing.innerHTML='<span>ON TRACK</span><strong>RESEARCH CIRCUIT</strong>';passing.classList.add('circuit-toggle-status');document.body.append(passing);
  // Cut a soft protective window behind each visible text line and photograph.
  // The track remains a backdrop; no dedicated section or change to page typography.
  const scene=background.querySelector('svg');
  const defs=makeSvg('defs',{}),mask=makeSvg('mask',{id:'circuit-reading-mask',maskUnits:'userSpaceOnUse',x:-500,y:-500,width:2500,height:2000});
  const white=makeSvg('rect',{x:-500,y:-500,width:2500,height:2000,fill:'white'});mask.append(white);const fade=makeSvg('filter',{id:'circuit-reading-fade',x:'-30%',y:'-30%',width:'160%',height:'160%'});fade.append(makeSvg('feGaussianBlur',{stdDeviation:5}));defs.append(fade,mask);const clearances=makeSvg('g',{filter:'url(#circuit-reading-fade)'});mask.append(clearances);
  const art=makeSvg('g',{mask:'url(#circuit-reading-mask)'});while(scene.firstChild)art.append(scene.firstChild);scene.append(defs,art);
  let layoutFrame=0,readingZones=[];
  const overlaps=(a,b,gap=0)=>a.left<b.right+gap&&a.right>b.left-gap&&a.top<b.bottom+gap&&a.bottom>b.top-gap;
  const updateReadingMask=()=>{
    layoutFrame=0;if(!root.classList.contains('circuit-mode'))return;
    const matrix=scene.getScreenCTM();if(!matrix)return;const inverse=matrix.inverse();
    const local=(x,y)=>new DOMPoint(x,y).matrixTransform(inverse);
    const screen=(x,y)=>new DOMPoint(x,y).matrixTransform(matrix);
    const protectedRects=[];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode,parent=node.parentElement;
      if(!node.textContent.trim()||!parent||parent.closest('.circuit-background,script,style,svg,.circuit-floating-status'))continue;
      const bounds=parent.getBoundingClientRect();if(bounds.bottom<0||bounds.top>innerHeight||bounds.width===0||bounds.height===0)continue;
      const style=getComputedStyle(parent);if(style.visibility==='hidden'||style.display==='none')continue;
      const range=document.createRange();range.selectNodeContents(node);
      Array.from(range.getClientRects()).forEach(rect=>{if(rect.width&&rect.height&&rect.bottom>0&&rect.top<innerHeight)protectedRects.push({left:rect.left-9,right:rect.right+9,top:rect.top-7,bottom:rect.bottom+7});});
    }
    document.querySelectorAll('img,.visual-shell,.circuit-toggle,.news-card,.circuit-deck,.pitwall-console').forEach(el=>{
      const rect=el.getBoundingClientRect();if(rect.width&&rect.height&&rect.bottom>0&&rect.top<innerHeight)protectedRects.push({left:rect.left-10,right:rect.right+10,top:rect.top-10,bottom:rect.bottom+10});
    });
    clearances.replaceChildren();
    protectedRects.forEach(rect=>{const a=local(rect.left,rect.top),b=local(rect.right,rect.bottom);clearances.append(makeSvg('rect',{x:a.x,y:a.y,width:b.x-a.x,height:b.y-a.y,rx:5,fill:'black'}));});
    readingZones=protectedRects;
    const placed=[];
    checkpoints.forEach(checkpoint=>{
      const {group,text,plate,link,point,original,width}=checkpoint;
      const candidates=[original];
      [65,105,150,205].forEach(radius=>{for(let i=0;i<12;i++){const angle=i*Math.PI/6;candidates.push({x:point.x+Math.cos(angle)*radius-width/2,y:point.y+Math.sin(angle)*radius});}});
      let chosen=null;
      for(const candidate of candidates){
        const a=screen(candidate.x-12,candidate.y-27),b=screen(candidate.x+width+12,candidate.y+12);
        const box={left:a.x,right:b.x,top:a.y,bottom:b.y};
        if(box.left<16||box.right>document.documentElement.clientWidth-16||box.top<16||box.bottom>innerHeight-76)continue;
        if(protectedRects.some(rect=>overlaps(box,rect,5))||placed.some(rect=>overlaps(box,rect,10)))continue;
        chosen={...candidate,box};break;
      }
      group.classList.toggle('checkpoint-obscured',!chosen);
      if(!chosen)return;
      text.setAttribute('x',chosen.x);text.setAttribute('y',chosen.y);
      plate.setAttribute('x',chosen.x-10);plate.setAttribute('y',chosen.y-26);plate.setAttribute('height',38);
      link.setAttribute('d',`M${point.x} ${point.y}L${chosen.x+width/2} ${chosen.y+12}`);
      placed.push(chosen.box);
    });
  };
  const queueReadingMask=()=>{if(!layoutFrame)layoutFrame=requestAnimationFrame(updateReadingMask);};
  window.addEventListener('scroll',queueReadingMask,{passive:true});window.addEventListener('resize',queueReadingMask);
  const racingCar=background.querySelector('.circuit-car');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let drivingTime=0,nextSpin=12000,lastDrivingFrame=0,spinning=false;
  const finishSpin=()=>{racingCar.classList.remove('is-spinning');spinning=false;};
  racingCar.querySelector('.circuit-car-outline').addEventListener('animationend',event=>{if(event.animationName==='circuit-recover')finishSpin();});
  reducedMotion.addEventListener('change',event=>{if(event.matches)finishSpin();});
  const updateDriving=time=>{
    const elapsed=lastDrivingFrame?Math.min(time-lastDrivingFrame,100):0;lastDrivingFrame=time;
    if(root.classList.contains('motion-paused')||document.hidden||reducedMotion.matches)return;
    if(!spinning)drivingTime+=elapsed;
    if(drivingTime<nextSpin||spinning)return;
    // Wait for an open part of the background so the playful moment stays visible.
    const rect=racingCar.getBoundingClientRect();
    const space={left:rect.left-25,right:rect.right+25,top:rect.top-25,bottom:rect.bottom+65};
    if(space.top<12||space.bottom>innerHeight-85||space.left<10||space.right>innerWidth-10)return;
    if(readingZones.some(zone=>overlaps(space,zone)))return;
    spinning=true;racingCar.dataset.recoveries=String(Number(racingCar.dataset.recoveries||0)+1);racingCar.classList.add('is-spinning');nextSpin=drivingTime+90000;
  };
  let checkpointFrame=0,lastCheckpointUpdate=0;
  const updateCheckpoints=time=>{
    if(!root.classList.contains('circuit-mode'))return;
    updateDriving(time);
    if(time-lastCheckpointUpdate>60&&!document.hidden){
      lastCheckpointUpdate=time;
      const fraction=parseFloat(getComputedStyle(background.querySelector('.circuit-car')).offsetDistance)/100;
      let current='';
      checkpoints.forEach(({group,fraction:position,name})=>{
        const delta=(fraction-position+1.012)%1;
        const active=delta<.077;
        if(group.classList.contains('is-passing')!==active)group.classList.toggle('is-passing',active);
        if(active)current=name;
      });
      const label=spinning?'RECOVERING ↗':(current||'RESEARCH CIRCUIT');passing.classList.toggle('is-recovering',spinning);
      if(passing.querySelector('strong').textContent!==label)passing.querySelector('strong').textContent=label;
      passing.classList.toggle('is-passing',Boolean(current));
    }
    checkpointFrame=requestAnimationFrame(updateCheckpoints);
  };
  const toggle=document.createElement('button');toggle.type='button';toggle.className='circuit-toggle';toggle.setAttribute('aria-controls','research-circuit');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-pressed','false');
  const icon='<svg viewBox="0 0 40 26" aria-hidden="true"><path d="M5 8 Q2 2 11 3 L21 8 Q25 10 28 5 Q32 1 36 8 L37 14 Q38 17 31 19 L23 23 Q18 25 17 20 L16 15 L9 17 Q5 18 3 14 Z"/></svg>';
  const label=document.createElement('span');toggle.innerHTML=icon;toggle.append(label,passing);
  const setMode=on=>{root.classList.toggle('circuit-mode',on);lastDrivingFrame=0;if(!on)finishSpin();cancelAnimationFrame(checkpointFrame);if(on)checkpointFrame=requestAnimationFrame(updateCheckpoints);deck.hidden=!on;background.inert=!on;passing.hidden=!on;if(on)queueReadingMask();toggle.setAttribute('aria-expanded',String(on));toggle.setAttribute('aria-pressed',String(on));label.textContent=on?'EXIT CIRCUIT ×':'DISCOVER THE CIRCUIT ↗';toggle.setAttribute('aria-label',en?(on?'Exit circuit mode':'Discover the circuit: reveal three research-inspired details'):(on?'サーキットモードを終了':'サーキットを発見：３つの研究の仕掛けを表示'));if(diagram)diagram.setAttribute('aria-label',on?(en?'Illustrative telemetry of human, robotics and data coordination':'人・ロボット・データの協調を表すテレメトリー概念図'):originalLabel);};
  toggle.addEventListener('click',()=>setMode(!root.classList.contains('circuit-mode')));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root.classList.contains('circuit-mode')){setMode(false);toggle.focus();}});
  document.body.append(toggle);setMode(false);
})();
