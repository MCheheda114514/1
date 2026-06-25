(function(){'use strict';
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('./sw.js').catch(function(){});});}
document.getElementById('back').addEventListener('click',function(){location.href='./index.html';});
document.getElementById('secret').addEventListener('click',function(){sessionStorage.setItem('op_diag','1'); location.href='./lock.html';});
})();
