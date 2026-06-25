(function(){'use strict';
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('./sw.js').catch(function(){});});}
function tick(){var el=document.getElementById('clock'); if(!el)return; var d=new Date(); el.textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(function(n){return String(n).padStart(2,'0');}).join(':');}
setInterval(tick,1000); tick();
var input=document.getElementById('code'), button=document.getElementById('enter'), msg=document.getElementById('msg');
function submit(){var code=(input.value||'').trim().toUpperCase(); if(code==='MCJS'){sessionStorage.setItem('op_stage','1'); location.href='./error.html'; return;} msg.textContent='口令无效'; msg.classList.add('bad'); input.select();}
button.addEventListener('click',submit); input.addEventListener('keydown',function(e){if(e.key==='Enter')submit();}); input.focus();
})();
