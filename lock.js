(function(){'use strict';
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('./sw.js').catch(function(){});});}
var normal=['零','一','二','三','四','五','六','七','八','九'];
var formal=['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
var numerals=Math.random()<0.5?normal:formal;
var answer='';
if(window.crypto&&window.crypto.getRandomValues){var values=new Uint8Array(7); window.crypto.getRandomValues(values); answer=Array.from(values,function(n){return String(n%10);}).join('');} else {answer=Array.from({length:7},function(){return String(Math.floor(Math.random()*10));}).join('');}
document.getElementById('hint').textContent=answer.split('').map(function(n){return numerals[Number(n)];}).join('  ');
var input=document.getElementById('answer'), button=document.getElementById('unlock'), result=document.getElementById('result');
function unlock(){var value=(input.value||'').replace(/\D/g,'').slice(0,7); input.value=value; if(value===answer){result.textContent='EXFIL SUCCESS / 撤离成功'; result.classList.remove('bad'); sessionStorage.setItem('op_clear','1'); setTimeout(function(){location.href='./ops.html';},650); return;} result.textContent='密钥拒绝'; result.classList.add('bad'); input.value=''; input.focus();}
input.addEventListener('input',function(){input.value=input.value.replace(/\D/g,'').slice(0,7);}); button.addEventListener('click',unlock); input.addEventListener('keydown',function(e){if(e.key==='Enter')unlock();}); input.focus();
})();
