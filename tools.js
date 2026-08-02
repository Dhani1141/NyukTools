/* ===================================================================
   NyukTools — Tools Engine (tools.js)
   Semua implementasi tool ada di sini.
   =================================================================== */

// ==================== HELPERS ====================
function copyText(text) {
  navigator.clipboard.writeText(text).then(function(){ showToast('Berhasil disalin! 📋'); }).catch(function(){ showToast('Gagal menyalin.'); });
}
function showToast(msg) {
  var t = document.getElementById('toast'), m = document.getElementById('toastMessage');
  if(!t||!m) return; m.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer); t._timer = setTimeout(function(){ t.classList.remove('show'); }, 2500);
}
function $(id){ return document.getElementById(id); }
function escHTML(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

// ==================== TOOL REGISTRY ====================
var TOOLS = {};

// ── TEXT TOOLS ──────────────────────────────────────────

TOOLS['word-counter'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan atau tempel teks Anda</label><textarea class="tool-textarea" id="wcInput" placeholder="Ketik atau tempel teks di sini..." rows="8"></textarea></div><div class="tool-stats" id="wcStats"><div class="tool-stat"><div class="tool-stat-value" id="wcWords">0</div><div class="tool-stat-name">Kata</div></div><div class="tool-stat"><div class="tool-stat-value" id="wcChars">0</div><div class="tool-stat-name">Karakter</div></div><div class="tool-stat"><div class="tool-stat-value" id="wcSentences">0</div><div class="tool-stat-name">Kalimat</div></div><div class="tool-stat"><div class="tool-stat-value" id="wcParagraphs">0</div><div class="tool-stat-name">Paragraf</div></div><div class="tool-stat"><div class="tool-stat-value" id="wcSpaces">0</div><div class="tool-stat-name">Tanpa Spasi</div></div><div class="tool-stat"><div class="tool-stat-value" id="wcTime">0</div><div class="tool-stat-name">Menit Baca</div></div></div>'; },
  init: function(){
    $('wcInput').addEventListener('input', function(){
      var t = this.value;
      $('wcChars').textContent = t.length;
      $('wcSpaces').textContent = t.replace(/\s/g,'').length;
      var words = t.trim() ? t.trim().split(/\s+/).length : 0;
      $('wcWords').textContent = words;
      $('wcSentences').textContent = t.trim() ? (t.match(/[.!?]+/g)||[]).length || (t.trim()?1:0) : 0;
      $('wcParagraphs').textContent = t.trim() ? t.split(/\n\s*\n/).filter(function(p){return p.trim();}).length || (t.trim()?1:0) : 0;
      $('wcTime').textContent = Math.ceil(words/200) || 0;
    });
  }
};

TOOLS['lorem-ipsum'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Jumlah Paragraf</label><div class="tool-range-row"><input type="range" class="tool-range" id="liCount" min="1" max="20" value="3"><span class="tool-range-val" id="liVal">3</span></div></div><div class="tool-btn-row"><button class="tool-btn primary" id="liGen"><i class="fas fa-play"></i> Generate</button><button class="tool-btn" id="liCopy"><i class="fas fa-copy"></i> Salin</button></div><div class="tool-section" style="margin-top:1rem;"><div class="tool-output" id="liOut"></div></div>'; },
  init: function(){
    var sentences = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.","Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.","Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.","Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.","Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor.","Turpis egestas integer eget aliquet nibh praesent tristique magna.","Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus.","Pellentesque habitant morbi tristique senectus et netus et malesuada fames.","Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam.","Urna porttitor rhoncus dolor purus non enim praesent elementum facilisis.","Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.","Risus quis varius quam quisque id diam vel quam elementum pulvinar.","Odio aenean sed adipiscing diam donec adipiscing tristique risus nec."];
    function gen(n){
      var out=[]; for(var i=0;i<n;i++){
        var len=4+Math.floor(Math.random()*4), p=[];
        for(var j=0;j<len;j++) p.push(sentences[Math.floor(Math.random()*sentences.length)]);
        out.push(p.join(' '));
      } return out.join('\n\n');
    }
    $('liCount').oninput=function(){ $('liVal').textContent=this.value; };
    $('liGen').onclick=function(){ $('liOut').textContent=gen(+$('liCount').value); };
    $('liCopy').onclick=function(){ copyText($('liOut').textContent); };
    $('liGen').click();
  }
};

TOOLS['case-converter'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan Teks</label><textarea class="tool-textarea" id="ccIn" placeholder="Ketik teks di sini..." rows="4"></textarea></div><div class="tool-btn-row"><button class="tool-btn" onclick="ccConvert(\'upper\')">UPPERCASE</button><button class="tool-btn" onclick="ccConvert(\'lower\')">lowercase</button><button class="tool-btn" onclick="ccConvert(\'title\')">Title Case</button><button class="tool-btn" onclick="ccConvert(\'sentence\')">Sentence case</button><button class="tool-btn" onclick="ccConvert(\'camel\')">camelCase</button><button class="tool-btn" onclick="ccConvert(\'snake\')">snake_case</button><button class="tool-btn" onclick="ccConvert(\'kebab\')">kebab-case</button><button class="tool-btn" onclick="ccConvert(\'toggle\')">tOGGLE</button></div><div class="tool-section" style="margin-top:1rem;"><label class="tool-label">Hasil</label><div class="tool-output" id="ccOut"></div></div><div class="tool-btn-row"><button class="tool-btn" onclick="copyText($( \'ccOut\').textContent)"><i class="fas fa-copy"></i> Salin</button></div>'; },
  init: function(){
    window.ccConvert = function(type){
      var t = $('ccIn').value, r='';
      switch(type){
        case 'upper': r=t.toUpperCase(); break;
        case 'lower': r=t.toLowerCase(); break;
        case 'title': r=t.replace(/\w\S*/g,function(w){return w.charAt(0).toUpperCase()+w.substr(1).toLowerCase();}); break;
        case 'sentence': r=t.toLowerCase().replace(/(^\w|\.\s*\w)/g,function(c){return c.toUpperCase();}); break;
        case 'camel': r=t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,function(m,c){return c.toUpperCase();}); break;
        case 'snake': r=t.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,''); break;
        case 'kebab': r=t.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''); break;
        case 'toggle': r=t.split('').map(function(c){return c===c.toUpperCase()?c.toLowerCase():c.toUpperCase();}).join(''); break;
      }
      $('ccOut').textContent=r;
    };
  }
};

TOOLS['text-diff'] = {
  render: function(){ return '<div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Teks Original</label><textarea class="tool-textarea" id="tdA" rows="8" placeholder="Teks pertama..."></textarea></div><div class="tool-section"><label class="tool-label">Teks Perubahan</label><textarea class="tool-textarea" id="tdB" rows="8" placeholder="Teks kedua..."></textarea></div></div><div class="tool-btn-row" style="margin:1rem 0;"><button class="tool-btn primary" id="tdCompare"><i class="fas fa-code-compare"></i> Bandingkan</button></div><div class="tool-output" id="tdOut" style="font-size:.85rem;"></div>'; },
  init: function(){
    $('tdCompare').onclick=function(){
      var a=$('tdA').value.split('\n'), b=$('tdB').value.split('\n'), out=[];
      var max=Math.max(a.length,b.length);
      for(var i=0;i<max;i++){
        if(i>=a.length) out.push('<span style="color:#22c55e;">+ '+escHTML(b[i])+'</span>');
        else if(i>=b.length) out.push('<span style="color:#ef4444;">- '+escHTML(a[i])+'</span>');
        else if(a[i]!==b[i]) out.push('<span style="color:#ef4444;">- '+escHTML(a[i])+'</span>\n<span style="color:#22c55e;">+ '+escHTML(b[i])+'</span>');
        else out.push('  '+escHTML(a[i]));
      }
      $('tdOut').innerHTML=out.join('\n');
    };
  }
};

TOOLS['markdown-preview'] = {
  render: function(){ return '<div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Markdown Input</label><textarea class="tool-textarea" id="mdIn" rows="12" placeholder="# Judul\n\nTulis **markdown** di sini..."></textarea></div><div class="tool-section"><label class="tool-label">Preview</label><div class="md-preview" id="mdOut"></div></div></div>'; },
  init: function(){
    function parseMD(md){
      return md.replace(/^### (.*$)/gm,'<h3>$1</h3>').replace(/^## (.*$)/gm,'<h2>$1</h2>').replace(/^# (.*$)/gm,'<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`(.+?)`/g,'<code>$1</code>')
        .replace(/^\> (.*$)/gm,'<blockquote>$1</blockquote>').replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank">$1</a>')
        .replace(/^- (.*$)/gm,'<li>$1</li>').replace(/(<li>.*<\/li>)/s,'<ul>$1</ul>')
        .replace(/^\d+\. (.*$)/gm,'<li>$1</li>').replace(/\n{2,}/g,'<br><br>').replace(/\n/g,'<br>');
    }
    $('mdIn').addEventListener('input',function(){ $('mdOut').innerHTML=parseMD(this.value); });
    $('mdIn').value="# Selamat Datang\n\nIni adalah **Markdown Preview**.\n\n## Fitur\n- Bold dengan `**text**`\n- Italic dengan `*text*`\n- Link: [NyukTools](https://nyuktools.com)\n\n> Blockquote juga didukung!\n\n### Kode\nGunakan backtick untuk `inline code`.";
    $('mdIn').dispatchEvent(new Event('input'));
  }
};

TOOLS['slug-generator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan Judul / Teks</label><input type="text" class="tool-input" id="sgIn" placeholder="Contoh: Cara Membuat Website Modern"></div><div class="tool-section"><label class="tool-label">URL Slug</label><div class="tool-output" id="sgOut" style="font-size:1.1rem;color:var(--accent);"></div></div><div class="tool-btn-row"><button class="tool-btn" onclick="copyText($(\'sgOut\').textContent)"><i class="fas fa-copy"></i> Salin Slug</button></div>'; },
  init: function(){
    $('sgIn').addEventListener('input',function(){
      $('sgOut').textContent=this.value.toLowerCase().trim().replace(/[^\w\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
    });
  }
};

TOOLS['ai-nickname-generator'] = {
  render: function() {
    return '<div class="tool-section"><label class="tool-label">Nama Panggilan (Maks 1-2 kata)</label><input type="text" class="tool-input" id="nickName" placeholder="Contoh: Kunyuk"></div><div class="tool-section" style="margin-top:1rem;"><label class="tool-label">Tema Kesukaan</label><select class="tool-input" id="nickTheme"><option value="anime">Anime / Wibu</option><option value="dark">Dark / Edgy</option><option value="gaming">Gaming / E-Sports</option><option value="animal">Hewan / Nature</option><option value="hacker">Hacker / Cyber</option></select></div><div class="tool-btn-row"><button class="tool-btn primary" id="generateNickBtn"><i class="fas fa-magic"></i> Generate AI Nickname</button></div><div class="tool-section" style="margin-top:1rem;"><div id="nickOutput" style="display:flex; flex-direction:column; gap:0.5rem;"></div></div>';
  },
  init: function() {
    $('generateNickBtn').onclick = function() {
      var name = $('nickName').value.trim();
      var theme = $('nickTheme').value;
      
      if (!name) {
        showToast('Masukkan nama panggilan dulu!');
        return;
      }
      
      var out = $('nickOutput');
      out.innerHTML = '<div style="color:var(--text-secondary); text-align:center; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> AI sedang meracik...</div>';
      
      // Artificial delay for "AI" generation feel
      setTimeout(function() {
        var results = [];
        var dict = {
          anime: { pre: ["Kyu", "Shi", "Ren", "Zen", "Ken"], post: ["Kun", "Chan", "San", "Sama", "Sen"] },
          dark: { pre: ["El", "Zyn", "Grim", "Noct", "Vex"], post: ["Zol", "X", "Void", "Soul", "Hex"] },
          gaming: { pre: ["Pro", "God", "Rex", "Faze", "Zen"], post: ["Z", "Bot", "X", "Win", "Opie"] },
          animal: { pre: ["Red", "Mad", "Lil", "Big", "Sly"], post: ["Fox", "Wolf", "Yuk", "Bear", "Cat"] },
          hacker: { pre: ["0x", "Sys", "Net", "Neo", "Root"], post: ["Sec", "X", "Exe", "Bin", "Dot"] }
        };
        
        var selected = dict[theme] || dict['gaming'];
        var baseName = name.split(" ")[0]; // Take first word to keep it short
        baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase();
        
        var shuffle = function(arr) { return arr.slice().sort(function(){return 0.5 - Math.random()}); };
        var pres = shuffle(selected.pre);
        var posts = shuffle(selected.post);
        
        // Target: 3 "penyebutan" (syllables/words). Format combinations:
        results.push(pres[0] + " " + baseName + " " + posts[0]); // Prefix + Base + Suffix
        results.push(pres[1] + " " + baseName + " " + posts[1]); // Prefix + Base + Suffix
        results.push(pres[2] + baseName + " " + posts[2]);       // PreBase + Suffix
        results.push(pres[3] + " " + baseName + posts[3]);       // Prefix + BasePost
        results.push(pres[4] + " " + baseName + " " + posts[4]); // Prefix + Base + Suffix
        
        var html = '';
        results.forEach(function(r) {
          html += '<div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:var(--border-radius-sm); border:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center;">' +
                  '<span style="font-weight:600; font-size:1.1rem; color:var(--text-primary); letter-spacing:0.5px;">' + r + '</span>' +
                  '<button class="tool-btn sm" onclick="copyText(\'' + r + '\')"><i class="fas fa-copy"></i> Salin</button>' +
                  '</div>';
        });
        out.innerHTML = html;
        showToast('Nickname berhasil digenerate! 🎉');
      }, 700);
    };
  }
};

// ── IMAGE TOOLS ─────────────────────────────────────────

TOOLS['color-picker'] = {
  render: function(){ return '<div class="tool-section"><div class="tool-color-preview" id="cpPreview" style="background:#10b981;"></div><div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;"><input type="color" class="tool-color-input" id="cpPick" value="#10b981"><input type="text" class="tool-input" id="cpHex" value="#10b981" style="max-width:160px;"></div></div><div class="tool-stats" style="margin-top:1rem;"><div class="tool-stat"><div class="tool-stat-value" id="cpRGB">16, 185, 129</div><div class="tool-stat-name">RGB</div></div><div class="tool-stat"><div class="tool-stat-value" id="cpHSL">160°, 84%, 39%</div><div class="tool-stat-name">HSL</div></div><div class="tool-stat"><div class="tool-stat-value" id="cpHexV">#10b981</div><div class="tool-stat-name">HEX</div></div></div><div class="tool-btn-row" style="margin-top:1rem;"><button class="tool-btn" onclick="copyText($(\'cpHexV\').textContent)"><i class="fas fa-copy"></i> HEX</button><button class="tool-btn" onclick="copyText(\'rgb(\'+$(\'cpRGB\').textContent+\')\')"><i class="fas fa-copy"></i> RGB</button><button class="tool-btn" onclick="copyText(\'hsl(\'+$(\'cpHSL\').textContent+\')\')"><i class="fas fa-copy"></i> HSL</button></div>'; },
  init: function(){
    function update(hex){
      $('cpPreview').style.background=hex; $('cpHex').value=hex; $('cpPick').value=hex; $('cpHexV').textContent=hex;
      var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
      $('cpRGB').textContent=r+', '+g+', '+b;
      var rr=r/255,gg=g/255,bb=b/255,max=Math.max(rr,gg,bb),min=Math.min(rr,gg,bb),h,s,l=(max+min)/2;
      if(max===min){h=s=0;}else{var d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case rr:h=((gg-bb)/d+(gg<bb?6:0))/6;break;case gg:h=((bb-rr)/d+2)/6;break;case bb:h=((rr-gg)/d+4)/6;break;}}
      $('cpHSL').textContent=Math.round(h*360)+'°, '+Math.round(s*100)+'%, '+Math.round(l*100)+'%';
    }
    $('cpPick').oninput=function(){update(this.value);};
    $('cpHex').oninput=function(){if(/^#[0-9a-fA-F]{6}$/.test(this.value))update(this.value);};
  }
};

TOOLS['qr-generator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Teks atau URL</label><input type="text" class="tool-input" id="qrIn" placeholder="https://example.com" value="https://nyuktools.com"></div><div class="tool-btn-row"><button class="tool-btn primary" id="qrGen"><i class="fas fa-qrcode"></i> Generate QR</button></div><div class="tool-section" style="margin-top:1rem;text-align:center;"><div id="qr-output"></div></div>'; },
  init: function(){
    $('qrGen').onclick=function(){
      var val=$('qrIn').value.trim(); if(!val){showToast('Masukkan teks atau URL!');return;}
      $('qr-output').innerHTML='';
      if(typeof QRCode!=='undefined'){new QRCode($('qr-output'),{text:val,width:220,height:220,colorDark:'#10b981',colorLight:'#1a1a1a'});}
      else{$('qr-output').innerHTML='<p style="color:var(--text-secondary);">Library QRCode belum dimuat.</p>';}
    };
    $('qrGen').click();
  }
};

TOOLS['image-compressor'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Upload Gambar (PNG/JPG/WebP)</label><input type="file" class="tool-input" id="icFile" accept="image/*"></div><div class="tool-section"><label class="tool-label">Kualitas Kompresi</label><div class="tool-range-row"><input type="range" class="tool-range" id="icQual" min="10" max="100" value="70"><span class="tool-range-val" id="icQualV">70%</span></div></div><div id="icResult" style="display:none;margin-top:1rem;"><div class="tool-stats"><div class="tool-stat"><div class="tool-stat-value" id="icOrig">-</div><div class="tool-stat-name">Ukuran Asli</div></div><div class="tool-stat"><div class="tool-stat-value" id="icComp">-</div><div class="tool-stat-name">Setelah Kompresi</div></div><div class="tool-stat"><div class="tool-stat-value" id="icSaved">-</div><div class="tool-stat-name">Dihemat</div></div></div><div class="tool-btn-row" style="margin-top:1rem;"><a class="tool-btn primary" id="icDl" download="compressed.jpg"><i class="fas fa-download"></i> Download</a></div></div>'; },
  init: function(){
    $('icQual').oninput=function(){$('icQualV').textContent=this.value+'%';};
    $('icFile').onchange=function(){
      var file=this.files[0]; if(!file) return;
      var reader=new FileReader();
      reader.onload=function(e){
        var img=new Image(); img.onload=function(){
          var c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
          c.getContext('2d').drawImage(img,0,0);
          var q=+$('icQual').value/100;
          var dataUrl=c.toDataURL('image/jpeg',q);
          var origSize=file.size; var compSize=Math.round(dataUrl.length*3/4);
          $('icOrig').textContent=(origSize/1024).toFixed(1)+' KB';
          $('icComp').textContent=(compSize/1024).toFixed(1)+' KB';
          $('icSaved').textContent=Math.round((1-compSize/origSize)*100)+'%';
          $('icDl').href=dataUrl;
          $('icResult').style.display='block';
        };
        img.src=e.target.result;
      };
      reader.readAsDataURL(file);
    };
  }
};

TOOLS['favicon-generator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Upload Gambar untuk Favicon</label><input type="file" class="tool-input" id="fgFile" accept="image/*"></div><div id="fgResult" style="display:none;margin-top:1rem;text-align:center;"><p class="tool-label">Preview Favicon (32x32)</p><canvas id="fgCanvas" width="32" height="32" style="border:1px solid var(--glass-border);border-radius:4px;image-rendering:pixelated;width:64px;height:64px;"></canvas><div class="tool-btn-row" style="justify-content:center;margin-top:1rem;"><a class="tool-btn primary" id="fgDl" download="favicon.png"><i class="fas fa-download"></i> Download Favicon</a></div></div>'; },
  init: function(){
    $('fgFile').onchange=function(){
      var file=this.files[0]; if(!file)return;
      var reader=new FileReader(); reader.onload=function(e){
        var img=new Image(); img.onload=function(){
          var c=$('fgCanvas'), ctx=c.getContext('2d'); ctx.clearRect(0,0,32,32); ctx.drawImage(img,0,0,32,32);
          $('fgDl').href=c.toDataURL('image/png'); $('fgResult').style.display='block';
        }; img.src=e.target.result;
      }; reader.readAsDataURL(file);
    };
  }
};

TOOLS['palette-generator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Warna Dasar</label><div style="display:flex;align-items:center;gap:1rem;"><input type="color" class="tool-color-input" id="pgColor" value="#10b981"><button class="tool-btn primary" id="pgGen"><i class="fas fa-palette"></i> Generate Palet</button><button class="tool-btn" id="pgRand"><i class="fas fa-random"></i> Random</button></div></div><div id="pgOut" style="display:flex;gap:.5rem;margin-top:1rem;flex-wrap:wrap;"></div>'; },
  init: function(){
    function hexToHSL(hex){var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255,max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;if(max===min){h=s=0;}else{var d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0));break;case g:h=((b-r)/d+2);break;case b:h=((r-g)/d+4);break;}h/=6;}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];}
    function hslToHex(h,s,l){s/=100;l/=100;var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,r=0,g=0,b=0;if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}else if(h<180){g=c;b=x;}else if(h<240){g=x;b=c;}else if(h<300){r=x;b=c;}else{r=c;b=x;}return'#'+[r+m,g+m,b+m].map(function(v){return Math.round(v*255).toString(16).padStart(2,'0');}).join('');}
    function gen(){
      var hsl=hexToHSL($('pgColor').value), h=hsl[0], s=hsl[1], l=hsl[2];
      var colors=[hslToHex(h,s,Math.min(l+30,95)),hslToHex(h,s,Math.min(l+15,90)),$('pgColor').value,hslToHex(h,s,Math.max(l-15,10)),hslToHex(h,s,Math.max(l-30,5)),hslToHex((h+30)%360,s,l),hslToHex((h+180)%360,s,l),hslToHex((h+210)%360,s,l)];
      $('pgOut').innerHTML=colors.map(function(c){return '<div style="flex:1;min-width:80px;text-align:center;cursor:pointer;" onclick="copyText(\''+c+'\')"><div style="background:'+c+';height:80px;border-radius:8px;margin-bottom:.5rem;border:1px solid var(--glass-border);"></div><small style="color:var(--text-secondary);font-size:.75rem;">'+c+'</small></div>';}).join('');
    }
    $('pgGen').onclick=gen;
    $('pgRand').onclick=function(){$('pgColor').value='#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');gen();};
    gen();
  }
};

// ── DEV TOOLS ───────────────────────────────────────────

TOOLS['json-formatter'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Input JSON</label><textarea class="tool-textarea" id="jfIn" rows="8" placeholder=\'{"name":"NyukTools","version":1}\'></textarea></div><div class="tool-btn-row"><button class="tool-btn primary" id="jfFormat"><i class="fas fa-align-left"></i> Format</button><button class="tool-btn" id="jfMinify"><i class="fas fa-compress"></i> Minify</button><button class="tool-btn" id="jfValidate"><i class="fas fa-check"></i> Validasi</button><button class="tool-btn" onclick="copyText($(\'jfOut\').textContent)"><i class="fas fa-copy"></i> Salin</button></div><div class="tool-section" style="margin-top:1rem;"><div class="tool-output" id="jfOut"></div></div>'; },
  init: function(){
    $('jfFormat').onclick=function(){try{$('jfOut').textContent=JSON.stringify(JSON.parse($('jfIn').value),null,2);}catch(e){$('jfOut').innerHTML='<span style="color:#ef4444;">❌ JSON Tidak Valid: '+escHTML(e.message)+'</span>';}};
    $('jfMinify').onclick=function(){try{$('jfOut').textContent=JSON.stringify(JSON.parse($('jfIn').value));}catch(e){$('jfOut').innerHTML='<span style="color:#ef4444;">❌ '+escHTML(e.message)+'</span>';}};
    $('jfValidate').onclick=function(){try{JSON.parse($('jfIn').value);$('jfOut').innerHTML='<span style="color:#22c55e;">✅ JSON Valid!</span>';}catch(e){$('jfOut').innerHTML='<span style="color:#ef4444;">❌ '+escHTML(e.message)+'</span>';}};
  }
};

TOOLS['base64-encoder'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Input Teks</label><textarea class="tool-textarea" id="b64In" rows="5" placeholder="Masukkan teks..."></textarea></div><div class="tool-btn-row"><button class="tool-btn primary" id="b64Enc"><i class="fas fa-lock"></i> Encode</button><button class="tool-btn" id="b64Dec"><i class="fas fa-unlock"></i> Decode</button><button class="tool-btn" onclick="copyText($(\'b64Out\').textContent)"><i class="fas fa-copy"></i> Salin</button></div><div class="tool-section" style="margin-top:1rem;"><label class="tool-label">Hasil</label><div class="tool-output" id="b64Out"></div></div>'; },
  init: function(){
    $('b64Enc').onclick=function(){try{$('b64Out').textContent=btoa(unescape(encodeURIComponent($('b64In').value)));}catch(e){$('b64Out').textContent='Error: '+e.message;}};
    $('b64Dec').onclick=function(){try{$('b64Out').textContent=decodeURIComponent(escape(atob($('b64In').value)));}catch(e){$('b64Out').textContent='Error: Input bukan Base64 valid.';}};
  }
};

TOOLS['regex-tester'] = {
  render: function(){ return '<div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Pattern Regex</label><input type="text" class="tool-input" id="rxPattern" placeholder="\\b\\w+@\\w+\\.\\w+\\b"><label class="tool-label" style="margin-top:.75rem;">Flags</label><input type="text" class="tool-input" id="rxFlags" value="gi" placeholder="gi" style="max-width:100px;"></div><div class="tool-section"><label class="tool-label">Test String</label><textarea class="tool-textarea" id="rxStr" rows="5" placeholder="test@email.com hello world user@domain.org"></textarea></div></div><div class="tool-section" style="margin-top:1rem;"><label class="tool-label">Hasil Match</label><div class="tool-output" id="rxOut"></div></div><div class="tool-stats" id="rxStats" style="margin-top:.75rem;"><div class="tool-stat"><div class="tool-stat-value" id="rxCount">0</div><div class="tool-stat-name">Match</div></div></div>'; },
  init: function(){
    function test(){
      try{
        var p=$('rxPattern').value, f=$('rxFlags').value, s=$('rxStr').value;
        if(!p){$('rxOut').textContent='';$('rxCount').textContent='0';return;}
        var rx=new RegExp(p,f), matches=s.match(rx);
        $('rxCount').textContent=matches?matches.length:0;
        $('rxOut').innerHTML=s.replace(rx,'<mark style="background:var(--accent-subtle);color:var(--accent);padding:1px 3px;border-radius:2px;">$&</mark>');
      }catch(e){$('rxOut').innerHTML='<span style="color:#ef4444;">'+escHTML(e.message)+'</span>';$('rxCount').textContent='0';}
    }
    $('rxPattern').oninput=test; $('rxFlags').oninput=test; $('rxStr').oninput=test;
  }
};

TOOLS['css-minifier'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Input CSS</label><textarea class="tool-textarea" id="cssIn" rows="8" placeholder=".container {\n  display: flex;\n  justify-content: center;\n}"></textarea></div><div class="tool-btn-row"><button class="tool-btn primary" id="cssMin"><i class="fas fa-compress"></i> Minify</button><button class="tool-btn" onclick="copyText($(\'cssOut\').textContent)"><i class="fas fa-copy"></i> Salin</button></div><div class="tool-section" style="margin-top:1rem;"><div class="tool-output" id="cssOut"></div></div><div class="tool-stats"><div class="tool-stat"><div class="tool-stat-value" id="cssBefore">-</div><div class="tool-stat-name">Sebelum</div></div><div class="tool-stat"><div class="tool-stat-value" id="cssAfter">-</div><div class="tool-stat-name">Sesudah</div></div><div class="tool-stat"><div class="tool-stat-value" id="cssSaved">-</div><div class="tool-stat-name">Dihemat</div></div></div>'; },
  init: function(){
    $('cssMin').onclick=function(){
      var css=$('cssIn').value, orig=css.length;
      var min=css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').replace(/\s*([{}:;,>~+])\s*/g,'$1').replace(/;}/g,'}').trim();
      $('cssOut').textContent=min; $('cssBefore').textContent=orig+' chars'; $('cssAfter').textContent=min.length+' chars';
      $('cssSaved').textContent=orig?Math.round((1-min.length/orig)*100)+'%':'0%';
    };
  }
};

TOOLS['html-beautifier'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Input HTML</label><textarea class="tool-textarea" id="htIn" rows="8" placeholder="<div><p>Hello</p><span>World</span></div>"></textarea></div><div class="tool-btn-row"><button class="tool-btn primary" id="htBeaut"><i class="fas fa-magic"></i> Beautify</button><button class="tool-btn" onclick="copyText($(\'htOut\').textContent)"><i class="fas fa-copy"></i> Salin</button></div><div class="tool-section" style="margin-top:1rem;"><div class="tool-output" id="htOut"></div></div>'; },
  init: function(){
    $('htBeaut').onclick=function(){
      var html=$('htIn').value, indent=0, out=[];
      html=html.replace(/>\s+</g,'><').trim();
      var tokens=html.split(/(<[^>]+>)/g).filter(Boolean);
      tokens.forEach(function(t){
        if(t.match(/^<\//)){indent=Math.max(0,indent-1);out.push('  '.repeat(indent)+t);}
        else if(t.match(/^<[^/]/)&&!t.match(/\/\s*>$/)){out.push('  '.repeat(indent)+t);indent++;}
        else if(t.match(/\/\s*>$/)){out.push('  '.repeat(indent)+t);}
        else{out.push('  '.repeat(indent)+t);}
      });
      $('htOut').textContent=out.join('\n');
    };
  }
};

TOOLS['jwt-decoder'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan JWT Token</label><textarea class="tool-textarea" id="jwtIn" rows="4" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea></div><div class="tool-btn-row"><button class="tool-btn primary" id="jwtDec"><i class="fas fa-key"></i> Decode</button></div><div class="tool-grid-2" style="margin-top:1rem;"><div class="tool-section"><label class="tool-label">Header</label><div class="tool-output" id="jwtHeader"></div></div><div class="tool-section"><label class="tool-label">Payload</label><div class="tool-output" id="jwtPayload"></div></div></div>'; },
  init: function(){
    $('jwtDec').onclick=function(){
      try{
        var parts=$('jwtIn').value.trim().split('.'); if(parts.length<2) throw new Error('Format JWT tidak valid');
        var header=JSON.parse(atob(parts[0].replace(/-/g,'+').replace(/_/g,'/')));
        var payload=JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
        $('jwtHeader').textContent=JSON.stringify(header,null,2);
        $('jwtPayload').textContent=JSON.stringify(payload,null,2);
      }catch(e){$('jwtHeader').innerHTML='<span style="color:#ef4444;">'+escHTML(e.message)+'</span>';$('jwtPayload').textContent='';}
    };
  }
};

TOOLS['code-diff'] = TOOLS['text-diff']; // Re-use text diff

// ── CONVERTER ───────────────────────────────────────────

TOOLS['unit-converter'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Jenis Satuan</label><select class="tool-select" id="ucType"><option value="length">Panjang</option><option value="weight">Berat</option><option value="temp">Suhu</option><option value="speed">Kecepatan</option><option value="volume">Volume</option></select></div><div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Dari</label><input type="number" class="tool-input" id="ucFrom" value="1"><select class="tool-select" id="ucFromUnit" style="margin-top:.5rem;"></select></div><div class="tool-section"><label class="tool-label">Ke</label><div class="tool-output" id="ucResult" style="font-size:1.5rem;color:var(--accent);min-height:40px;display:flex;align-items:center;"></div><select class="tool-select" id="ucToUnit" style="margin-top:.5rem;"></select></div></div>'; },
  init: function(){
    var units={length:{m:1,km:1000,cm:.01,mm:.001,mi:1609.34,ft:.3048,in:.0254,yd:.9144},weight:{kg:1,g:.001,mg:.000001,lb:.453592,oz:.0283495,ton:1000},temp:{},speed:{ms:1,kmh:.277778,mph:.44704,kn:.514444},volume:{l:1,ml:.001,gal:3.78541,qt:.946353,cup:.236588}};
    function fillUnits(){
      var type=$('ucType').value, opts=type==='temp'?['°C','°F','K']:Object.keys(units[type]);
      [$('ucFromUnit'),$('ucToUnit')].forEach(function(sel,i){sel.innerHTML=opts.map(function(u,j){return '<option value="'+u+'"'+(j===i?' selected':'')+'>'+u+'</option>';}).join('');});
      convert();
    }
    function convert(){
      var type=$('ucType').value, val=parseFloat($('ucFrom').value)||0, from=$('ucFromUnit').value, to=$('ucToUnit').value, result;
      if(type==='temp'){
        var celsius=from==='°C'?val:from==='°F'?(val-32)*5/9:val-273.15;
        result=to==='°C'?celsius:to==='°F'?celsius*9/5+32:celsius+273.15;
      }else{result=val*units[type][from]/units[type][to];}
      $('ucResult').textContent=parseFloat(result.toPrecision(8))+' '+to;
    }
    $('ucType').onchange=fillUnits; $('ucFrom').oninput=convert; $('ucFromUnit').onchange=convert; $('ucToUnit').onchange=convert;
    fillUnits();
  }
};

TOOLS['currency-converter'] = {
  render: function(){ return '<div class="tool-section" style="text-align:center;"><span class="tool-tag">Kurs Statis — untuk referensi</span></div><div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Dari</label><select class="tool-select" id="ccFrom"><option value="IDR">🇮🇩 IDR</option><option value="USD" selected>🇺🇸 USD</option><option value="EUR">🇪🇺 EUR</option><option value="GBP">🇬🇧 GBP</option><option value="JPY">🇯🇵 JPY</option><option value="SGD">🇸🇬 SGD</option><option value="MYR">🇲🇾 MYR</option><option value="CNY">🇨🇳 CNY</option><option value="KRW">🇰🇷 KRW</option><option value="AUD">🇦🇺 AUD</option></select><input type="number" class="tool-input" id="ccVal" value="1" style="margin-top:.5rem;"></div><div class="tool-section"><label class="tool-label">Ke</label><select class="tool-select" id="ccTo"><option value="IDR" selected>🇮🇩 IDR</option><option value="USD">🇺🇸 USD</option><option value="EUR">🇪🇺 EUR</option><option value="GBP">🇬🇧 GBP</option><option value="JPY">🇯🇵 JPY</option><option value="SGD">🇸🇬 SGD</option><option value="MYR">🇲🇾 MYR</option><option value="CNY">🇨🇳 CNY</option><option value="KRW">🇰🇷 KRW</option><option value="AUD">🇦🇺 AUD</option></select><div class="tool-result-box" style="margin-top:.5rem;"><div class="tool-result-big" id="ccResult">-</div></div></div></div>'; },
  init: function(){
    var rates={USD:1,IDR:15800,EUR:.92,GBP:.79,JPY:149.5,SGD:1.34,MYR:4.47,CNY:7.24,KRW:1310,AUD:1.53};
    function convert(){var v=parseFloat($('ccVal').value)||0,from=$('ccFrom').value,to=$('ccTo').value;var usd=v/rates[from];var result=usd*rates[to];$('ccResult').textContent=result.toLocaleString('id-ID',{maximumFractionDigits:2})+' '+to;}
    $('ccVal').oninput=convert;$('ccFrom').onchange=convert;$('ccTo').onchange=convert;convert();
  }
};

TOOLS['number-base'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan Angka</label><input type="text" class="tool-input" id="nbIn" value="255" placeholder="255"></div><div class="tool-section"><label class="tool-label">Basis Input</label><select class="tool-select" id="nbBase"><option value="10">Desimal (10)</option><option value="2">Biner (2)</option><option value="8">Oktal (8)</option><option value="16">Heksadesimal (16)</option></select></div><div class="tool-stats" style="margin-top:1rem;"><div class="tool-stat" onclick="copyText($(\'nbDec\').textContent)" style="cursor:pointer;"><div class="tool-stat-value" id="nbDec">255</div><div class="tool-stat-name">Desimal</div></div><div class="tool-stat" onclick="copyText($(\'nbBin\').textContent)" style="cursor:pointer;"><div class="tool-stat-value" id="nbBin">11111111</div><div class="tool-stat-name">Biner</div></div><div class="tool-stat" onclick="copyText($(\'nbOct\').textContent)" style="cursor:pointer;"><div class="tool-stat-value" id="nbOct">377</div><div class="tool-stat-name">Oktal</div></div><div class="tool-stat" onclick="copyText($(\'nbHex\').textContent)" style="cursor:pointer;"><div class="tool-stat-value" id="nbHex">FF</div><div class="tool-stat-name">Heksadesimal</div></div></div><p style="font-size:.8rem;color:var(--text-muted);margin-top:.75rem;text-align:center;">Klik kartu untuk menyalin</p>'; },
  init: function(){
    function convert(){
      var v=$('nbIn').value.trim(), b=parseInt($('nbBase').value), dec=parseInt(v,b);
      if(isNaN(dec)){$('nbDec').textContent=$('nbBin').textContent=$('nbOct').textContent=$('nbHex').textContent='—';return;}
      $('nbDec').textContent=dec; $('nbBin').textContent=dec.toString(2); $('nbOct').textContent=dec.toString(8); $('nbHex').textContent=dec.toString(16).toUpperCase();
    }
    $('nbIn').oninput=convert; $('nbBase').onchange=convert; convert();
  }
};

TOOLS['timestamp-converter'] = {
  render: function(){ return '<div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Unix Timestamp</label><input type="number" class="tool-input" id="tsUnix" placeholder="1704067200"><button class="tool-btn sm" onclick="$(\'tsUnix\').value=Math.floor(Date.now()/1000);tsConvert(\'unix\');" style="margin-top:.5rem;"><i class="fas fa-clock"></i> Sekarang</button></div><div class="tool-section"><label class="tool-label">Tanggal & Waktu</label><input type="datetime-local" class="tool-input" id="tsDate"></div></div><div class="tool-result-box" style="margin-top:1rem;"><div class="tool-result-big" id="tsResult">-</div><div class="tool-result-label" id="tsLabel">Masukkan timestamp atau tanggal</div></div>'; },
  init: function(){
    window.tsConvert=function(from){
      if(from==='unix'){var ts=parseInt($('tsUnix').value);if(isNaN(ts))return;var d=new Date(ts*1000);$('tsDate').value=d.toISOString().slice(0,16);$('tsResult').textContent=d.toLocaleString('id-ID',{dateStyle:'full',timeStyle:'medium'});$('tsLabel').textContent='Timestamp: '+ts;}
      else{var d=new Date($('tsDate').value);if(isNaN(d))return;var ts=Math.floor(d.getTime()/1000);$('tsUnix').value=ts;$('tsResult').textContent=ts;$('tsLabel').textContent=d.toLocaleString('id-ID',{dateStyle:'full',timeStyle:'medium'});}
    };
    $('tsUnix').oninput=function(){tsConvert('unix');}; $('tsDate').oninput=function(){tsConvert('date');};
    $('tsUnix').value=Math.floor(Date.now()/1000); tsConvert('unix');
  }
};

TOOLS['color-converter'] = TOOLS['color-picker']; // Same functionality

TOOLS['file-size-converter'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan Ukuran</label><div style="display:flex;gap:.5rem;"><input type="number" class="tool-input" id="fsVal" value="1024" style="flex:1;"><select class="tool-select" id="fsUnit" style="max-width:120px;"><option value="0">Bytes</option><option value="1" selected>KB</option><option value="2">MB</option><option value="3">GB</option><option value="4">TB</option><option value="5">PB</option></select></div></div><div class="tool-stats" style="margin-top:1rem;"><div class="tool-stat"><div class="tool-stat-value" id="fsB">-</div><div class="tool-stat-name">Bytes</div></div><div class="tool-stat"><div class="tool-stat-value" id="fsKB">-</div><div class="tool-stat-name">KB</div></div><div class="tool-stat"><div class="tool-stat-value" id="fsMB">-</div><div class="tool-stat-name">MB</div></div><div class="tool-stat"><div class="tool-stat-value" id="fsGB">-</div><div class="tool-stat-name">GB</div></div><div class="tool-stat"><div class="tool-stat-value" id="fsTB">-</div><div class="tool-stat-name">TB</div></div><div class="tool-stat"><div class="tool-stat-value" id="fsPB">-</div><div class="tool-stat-name">PB</div></div></div>'; },
  init: function(){
    var names=['B','KB','MB','GB','TB','PB'], ids=['fsB','fsKB','fsMB','fsGB','fsTB','fsPB'];
    function convert(){
      var val=parseFloat($('fsVal').value)||0, unit=parseInt($('fsUnit').value), bytes=val*Math.pow(1024,unit);
      ids.forEach(function(id,i){var v=bytes/Math.pow(1024,i);$(id).textContent=v>=1?parseFloat(v.toPrecision(6)):v.toExponential(2);});
    }
    $('fsVal').oninput=convert; $('fsUnit').onchange=convert; convert();
  }
};

// ── CALCULATOR ──────────────────────────────────────────

TOOLS['bmi-calculator'] = {
  render: function(){ return '<div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Berat Badan (kg)</label><input type="number" class="tool-input" id="bmiW" placeholder="70" value="70"></div><div class="tool-section"><label class="tool-label">Tinggi Badan (cm)</label><input type="number" class="tool-input" id="bmiH" placeholder="170" value="170"></div></div><div class="tool-btn-row" style="margin-top:1rem;"><button class="tool-btn primary" id="bmiCalc"><i class="fas fa-calculator"></i> Hitung BMI</button></div><div class="tool-result-box"><div class="tool-result-big" id="bmiResult">-</div><div class="tool-result-label" id="bmiCat">Masukkan data Anda</div></div>'; },
  init: function(){
    $('bmiCalc').onclick=function(){
      var w=parseFloat($('bmiW').value), h=parseFloat($('bmiH').value)/100;
      if(!w||!h){showToast('Isi semua field!');return;}
      var bmi=w/(h*h), cat=bmi<18.5?'Berat Badan Kurang':bmi<25?'Normal ✅':bmi<30?'Berat Badan Berlebih':'Obesitas ⚠️';
      $('bmiResult').textContent=bmi.toFixed(1); $('bmiCat').textContent=cat;
      $('bmiResult').style.color=bmi>=18.5&&bmi<25?'var(--accent)':'#f97316';
    };
  }
};

TOOLS['percentage-calculator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Berapa % dari angka?</label><div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;"><input type="number" class="tool-input" id="pcA" placeholder="25" style="max-width:120px;"><span style="color:var(--text-secondary);">% dari</span><input type="number" class="tool-input" id="pcB" placeholder="200" style="max-width:120px;"><span style="color:var(--text-secondary);">=</span><span class="tool-result-big" id="pcR1" style="font-size:1.3rem;">-</span></div></div><hr class="tool-divider"><div class="tool-section"><label class="tool-label">Angka A adalah berapa % dari Angka B?</label><div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;"><input type="number" class="tool-input" id="pcC" placeholder="50" style="max-width:120px;"><span style="color:var(--text-secondary);">dari</span><input type="number" class="tool-input" id="pcD" placeholder="200" style="max-width:120px;"><span style="color:var(--text-secondary);">=</span><span class="tool-result-big" id="pcR2" style="font-size:1.3rem;">-</span></div></div><hr class="tool-divider"><div class="tool-section"><label class="tool-label">Kenaikan/Penurunan Persentase</label><div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;"><span style="color:var(--text-secondary);">Dari</span><input type="number" class="tool-input" id="pcE" placeholder="100" style="max-width:120px;"><span style="color:var(--text-secondary);">ke</span><input type="number" class="tool-input" id="pcF" placeholder="150" style="max-width:120px;"><span style="color:var(--text-secondary);">=</span><span class="tool-result-big" id="pcR3" style="font-size:1.3rem;">-</span></div></div>'; },
  init: function(){
    function calc(){
      var a=parseFloat($('pcA').value),b=parseFloat($('pcB').value);if(!isNaN(a)&&!isNaN(b))$('pcR1').textContent=(a/100*b).toLocaleString('id-ID');
      var c=parseFloat($('pcC').value),d=parseFloat($('pcD').value);if(!isNaN(c)&&!isNaN(d)&&d)$('pcR2').textContent=(c/d*100).toFixed(2)+'%';
      var e=parseFloat($('pcE').value),f=parseFloat($('pcF').value);if(!isNaN(e)&&!isNaN(f)&&e){var ch=((f-e)/e*100);$('pcR3').textContent=(ch>=0?'+':'')+ch.toFixed(2)+'%';}
    }
    ['pcA','pcB','pcC','pcD','pcE','pcF'].forEach(function(id){$(id).oninput=calc;});
  }
};

TOOLS['age-calculator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Tanggal Lahir</label><input type="date" class="tool-input" id="ageDob"></div><div class="tool-btn-row"><button class="tool-btn primary" id="ageCalc"><i class="fas fa-cake-candles"></i> Hitung Umur</button></div><div class="tool-stats" style="margin-top:1rem;"><div class="tool-stat"><div class="tool-stat-value" id="ageY">-</div><div class="tool-stat-name">Tahun</div></div><div class="tool-stat"><div class="tool-stat-value" id="ageM">-</div><div class="tool-stat-name">Bulan</div></div><div class="tool-stat"><div class="tool-stat-value" id="ageD">-</div><div class="tool-stat-name">Hari</div></div><div class="tool-stat"><div class="tool-stat-value" id="ageTD">-</div><div class="tool-stat-name">Total Hari</div></div></div><div class="tool-result-box"><div class="tool-result-label" id="ageNext">-</div></div>'; },
  init: function(){
    $('ageCalc').onclick=function(){
      var dob=new Date($('ageDob').value); if(isNaN(dob)){showToast('Pilih tanggal lahir!');return;}
      var now=new Date(), y=now.getFullYear()-dob.getFullYear(), m=now.getMonth()-dob.getMonth(), d=now.getDate()-dob.getDate();
      if(d<0){m--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}if(m<0){y--;m+=12;}
      $('ageY').textContent=y; $('ageM').textContent=m; $('ageD').textContent=d;
      $('ageTD').textContent=Math.floor((now-dob)/(1000*60*60*24)).toLocaleString('id-ID');
      var next=new Date(now.getFullYear(),dob.getMonth(),dob.getDate());if(next<=now)next.setFullYear(next.getFullYear()+1);
      var daysLeft=Math.ceil((next-now)/(1000*60*60*24));
      $('ageNext').textContent='🎂 Ulang tahun berikutnya dalam '+daysLeft+' hari!';
    };
  }
};

TOOLS['discount-calculator'] = {
  render: function(){ return '<div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Harga Asli (Rp)</label><input type="number" class="tool-input" id="dcPrice" placeholder="500000" value="500000"></div><div class="tool-section"><label class="tool-label">Diskon (%)</label><input type="number" class="tool-input" id="dcDisc" placeholder="25" value="25"></div></div><div class="tool-btn-row" style="margin-top:1rem;"><button class="tool-btn primary" id="dcCalc"><i class="fas fa-tags"></i> Hitung</button></div><div class="tool-stats" style="margin-top:1rem;"><div class="tool-stat"><div class="tool-stat-value" id="dcFinal">-</div><div class="tool-stat-name">Harga Akhir</div></div><div class="tool-stat"><div class="tool-stat-value" id="dcSaved">-</div><div class="tool-stat-name">Hemat</div></div></div>'; },
  init: function(){
    $('dcCalc').onclick=function(){
      var p=parseFloat($('dcPrice').value)||0, d=parseFloat($('dcDisc').value)||0;
      var saved=p*d/100, final_=p-saved;
      $('dcFinal').textContent='Rp '+final_.toLocaleString('id-ID');
      $('dcSaved').textContent='Rp '+saved.toLocaleString('id-ID');
    };
    $('dcCalc').click();
  }
};

TOOLS['tip-calculator'] = {
  render: function(){ return '<div class="tool-grid-2"><div class="tool-section"><label class="tool-label">Total Tagihan</label><input type="number" class="tool-input" id="tipBill" placeholder="200000" value="200000"></div><div class="tool-section"><label class="tool-label">Tip (%)</label><input type="number" class="tool-input" id="tipPct" placeholder="10" value="10"></div></div><div class="tool-section"><label class="tool-label">Jumlah Orang</label><input type="number" class="tool-input" id="tipPpl" placeholder="2" value="2" min="1" style="max-width:150px;"></div><div class="tool-stats" style="margin-top:1rem;"><div class="tool-stat"><div class="tool-stat-value" id="tipAmount">-</div><div class="tool-stat-name">Tip</div></div><div class="tool-stat"><div class="tool-stat-value" id="tipTotal">-</div><div class="tool-stat-name">Total + Tip</div></div><div class="tool-stat"><div class="tool-stat-value" id="tipEach">-</div><div class="tool-stat-name">Per Orang</div></div></div>'; },
  init: function(){
    function calc(){
      var bill=parseFloat($('tipBill').value)||0,pct=parseFloat($('tipPct').value)||0,ppl=parseInt($('tipPpl').value)||1;
      var tip=bill*pct/100,total=bill+tip;
      $('tipAmount').textContent='Rp '+tip.toLocaleString('id-ID');
      $('tipTotal').textContent='Rp '+total.toLocaleString('id-ID');
      $('tipEach').textContent='Rp '+Math.ceil(total/ppl).toLocaleString('id-ID');
    }
    ['tipBill','tipPct','tipPpl'].forEach(function(id){$(id).oninput=calc;});calc();
  }
};

// ── GENERATOR ───────────────────────────────────────────

TOOLS['password-generator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Panjang Password</label><div class="tool-range-row"><input type="range" class="tool-range" id="pwLen" min="8" max="64" value="16"><span class="tool-range-val" id="pwLenV">16</span></div></div><div style="display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;"><label class="tool-checkbox"><input type="checkbox" id="pwUpper" checked> Huruf Besar (A-Z)</label><label class="tool-checkbox"><input type="checkbox" id="pwLower" checked> Huruf Kecil (a-z)</label><label class="tool-checkbox"><input type="checkbox" id="pwNum" checked> Angka (0-9)</label><label class="tool-checkbox"><input type="checkbox" id="pwSym" checked> Simbol (!@#$)</label></div><div class="tool-btn-row"><button class="tool-btn primary" id="pwGen"><i class="fas fa-shield-halved"></i> Generate</button><button class="tool-btn" id="pwCopy"><i class="fas fa-copy"></i> Salin</button></div><div class="tool-output" id="pwOut" style="font-size:1.2rem;margin-top:1rem;text-align:center;letter-spacing:2px;"></div><div class="tool-stats" style="margin-top:.75rem;"><div class="tool-stat"><div class="tool-stat-value" id="pwStrength">-</div><div class="tool-stat-name">Kekuatan</div></div></div>'; },
  init: function(){
    $('pwLen').oninput=function(){$('pwLenV').textContent=this.value;};
    function gen(){
      var len=parseInt($('pwLen').value),chars='';
      if($('pwUpper').checked)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if($('pwLower').checked)chars+='abcdefghijklmnopqrstuvwxyz';
      if($('pwNum').checked)chars+='0123456789';
      if($('pwSym').checked)chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';
      if(!chars){showToast('Pilih minimal satu opsi!');return;}
      var pw='',arr=new Uint32Array(len);crypto.getRandomValues(arr);
      for(var i=0;i<len;i++)pw+=chars[arr[i]%chars.length];
      $('pwOut').textContent=pw;
      var types=($('pwUpper').checked?1:0)+($('pwLower').checked?1:0)+($('pwNum').checked?1:0)+($('pwSym').checked?1:0);
      var str=len>=16&&types>=3?'Sangat Kuat 💪':len>=12&&types>=2?'Kuat ✅':len>=8?'Sedang ⚡':'Lemah ⚠️';
      $('pwStrength').textContent=str;
    }
    $('pwGen').onclick=gen; $('pwCopy').onclick=function(){copyText($('pwOut').textContent);}; gen();
  }
};

TOOLS['uuid-generator'] = {
  render: function(){ return '<div class="tool-btn-row" style="justify-content:center;margin-bottom:1rem;"><button class="tool-btn primary" id="uuidGen"><i class="fas fa-fingerprint"></i> Generate UUID</button><button class="tool-btn" id="uuidBulk"><i class="fas fa-list"></i> Bulk (10)</button></div><div class="tool-output" id="uuidOut" style="font-size:1.1rem;text-align:center;"></div><div class="tool-btn-row" style="margin-top:.75rem;justify-content:center;"><button class="tool-btn" onclick="copyText($(\'uuidOut\').textContent)"><i class="fas fa-copy"></i> Salin</button></div>'; },
  init: function(){
    function uuid(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16);});}
    $('uuidGen').onclick=function(){$('uuidOut').textContent=uuid();};
    $('uuidBulk').onclick=function(){var out=[];for(var i=0;i<10;i++)out.push(uuid());$('uuidOut').textContent=out.join('\n');};
    $('uuidGen').click();
  }
};

TOOLS['hash-generator'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Input Teks</label><textarea class="tool-textarea" id="hashIn" rows="4" placeholder="Masukkan teks untuk di-hash..."></textarea></div><div class="tool-btn-row"><button class="tool-btn primary" onclick="genHash(\'SHA-256\')">SHA-256</button><button class="tool-btn" onclick="genHash(\'SHA-1\')">SHA-1</button><button class="tool-btn" onclick="genHash(\'SHA-512\')">SHA-512</button></div><div class="tool-section" style="margin-top:1rem;"><label class="tool-label">Hash Result</label><div class="tool-output" id="hashOut" style="font-size:.85rem;"></div></div><div class="tool-btn-row"><button class="tool-btn" onclick="copyText($(\'hashOut\').textContent)"><i class="fas fa-copy"></i> Salin</button></div>'; },
  init: function(){
    window.genHash=async function(algo){
      var text=$('hashIn').value; if(!text){showToast('Masukkan teks!');return;}
      try{
        var enc=new TextEncoder().encode(text), buf=await crypto.subtle.digest(algo,enc);
        var arr=Array.from(new Uint8Array(buf));
        $('hashOut').textContent=arr.map(function(b){return b.toString(16).padStart(2,'0');}).join('');
      }catch(e){$('hashOut').textContent='Error: '+e.message;}
    };
  }
};

TOOLS['gradient-generator'] = {
  render: function(){ return '<div class="tool-grid-2"><div><div class="tool-section"><label class="tool-label">Warna 1</label><div style="display:flex;gap:.5rem;align-items:center;"><input type="color" class="tool-color-input" id="gradC1" value="#10b981"><input type="text" class="tool-input" id="gradC1T" value="#10b981" style="max-width:120px;"></div></div><div class="tool-section"><label class="tool-label">Warna 2</label><div style="display:flex;gap:.5rem;align-items:center;"><input type="color" class="tool-color-input" id="gradC2" value="#3b82f6"><input type="text" class="tool-input" id="gradC2T" value="#3b82f6" style="max-width:120px;"></div></div><div class="tool-section"><label class="tool-label">Sudut (deg)</label><div class="tool-range-row"><input type="range" class="tool-range" id="gradAngle" min="0" max="360" value="135"><span class="tool-range-val" id="gradAngleV">135°</span></div></div><div class="tool-section"><label class="tool-label">Tipe</label><select class="tool-select" id="gradType"><option value="linear">Linear</option><option value="radial">Radial</option></select></div></div><div><div class="tool-preview-box" id="gradPreview" style="min-height:200px;border-radius:var(--border-radius);"></div></div></div><div class="tool-section" style="margin-top:1rem;"><label class="tool-label">CSS Code</label><div class="tool-output" id="gradCSS"></div></div><div class="tool-btn-row"><button class="tool-btn" onclick="copyText($(\'gradCSS\').textContent)"><i class="fas fa-copy"></i> Salin CSS</button></div>'; },
  init: function(){
    function update(){
      var c1=$('gradC1').value,c2=$('gradC2').value,angle=$('gradAngle').value,type=$('gradType').value;
      $('gradC1T').value=c1;$('gradC2T').value=c2;$('gradAngleV').textContent=angle+'°';
      var css=type==='linear'?'linear-gradient('+angle+'deg, '+c1+', '+c2+')':'radial-gradient(circle, '+c1+', '+c2+')';
      $('gradPreview').style.background=css;$('gradCSS').textContent='background: '+css+';';
    }
    ['gradC1','gradC2','gradAngle','gradType'].forEach(function(id){$(id).oninput=update;$(id).onchange=update;});
    $('gradC1T').oninput=function(){if(/^#[0-9a-f]{6}$/i.test(this.value)){$('gradC1').value=this.value;update();}};
    $('gradC2T').oninput=function(){if(/^#[0-9a-f]{6}$/i.test(this.value)){$('gradC2').value=this.value;update();}};
    update();
  }
};

TOOLS['box-shadow-generator'] = {
  render: function(){ return '<div class="tool-grid-2"><div><div class="tool-section"><label class="tool-label">Offset X: <span id="bsXV">5</span>px</label><input type="range" class="tool-range" id="bsX" min="-50" max="50" value="5"></div><div class="tool-section"><label class="tool-label">Offset Y: <span id="bsYV">5</span>px</label><input type="range" class="tool-range" id="bsY" min="-50" max="50" value="5"></div><div class="tool-section"><label class="tool-label">Blur: <span id="bsBV">15</span>px</label><input type="range" class="tool-range" id="bsB" min="0" max="100" value="15"></div><div class="tool-section"><label class="tool-label">Spread: <span id="bsSV">0</span>px</label><input type="range" class="tool-range" id="bsS" min="-50" max="50" value="0"></div><div class="tool-section"><label class="tool-label">Warna Shadow</label><div style="display:flex;gap:.5rem;align-items:center;"><input type="color" class="tool-color-input" id="bsColor" value="#10b981"><label class="tool-checkbox"><input type="checkbox" id="bsInset"> Inset</label></div></div></div><div><div class="tool-preview-box" id="bsPreview" style="min-height:200px;"><div style="width:120px;height:120px;background:var(--bg-secondary);border-radius:var(--border-radius);border:1px solid var(--glass-border);" id="bsBox"></div></div></div></div><div class="tool-section" style="margin-top:1rem;"><label class="tool-label">CSS Code</label><div class="tool-output" id="bsCSS"></div></div><div class="tool-btn-row"><button class="tool-btn" onclick="copyText($(\'bsCSS\').textContent)"><i class="fas fa-copy"></i> Salin CSS</button></div>'; },
  init: function(){
    function update(){
      var x=$('bsX').value,y=$('bsY').value,b=$('bsB').value,s=$('bsS').value,c=$('bsColor').value,inset=$('bsInset').checked;
      $('bsXV').textContent=x;$('bsYV').textContent=y;$('bsBV').textContent=b;$('bsSV').textContent=s;
      var r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),bl=parseInt(c.slice(5,7),16);
      var css=(inset?'inset ':'')+x+'px '+y+'px '+b+'px '+s+'px rgba('+r+','+g+','+bl+',0.5)';
      $('bsBox').style.boxShadow=css;$('bsCSS').textContent='box-shadow: '+css+';';
    }
    ['bsX','bsY','bsB','bsS','bsColor','bsInset'].forEach(function(id){var el=$(id);if(el){el.oninput=update;el.onchange=update;}});
    update();
  }
};

// ── DOWNLOADERS ─────────────────────────────────────────

TOOLS['tiktok-downloader'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan URL Video TikTok</label><input type="text" class="tool-input" id="ttUrl" placeholder="https://www.tiktok.com/@user/video/1234567890..."></div><div class="tool-btn-row"><button class="tool-btn primary" id="ttDownload"><i class="fab fa-tiktok"></i> Download Video</button></div><div id="ttResult" style="margin-top:1.5rem;"></div><div class="tool-section" style="margin-top:1rem;"><span class="tool-tag">Info</span><p style="font-size:.85rem;color:var(--text-secondary);margin-top:.5rem;">Paste URL video TikTok untuk mendownload tanpa watermark dalam resolusi HD. Mendukung video dan audio.</p></div>'; },
  init: function(){
    $('ttDownload').onclick=async function(){
      var url=$('ttUrl').value.trim();
      if(!url||!url.includes('tiktok')){showToast('Masukkan URL TikTok yang valid!');return;}
      $('ttResult').innerHTML='<div class="tool-loading"><i class="fas fa-spinner"></i> Mengambil video...</div>';
      try{
        var apiUrl='https://www.tikwm.com/api/?url='+encodeURIComponent(url);
        var resp=await fetch(apiUrl); var data=await resp.json();
        if(data.code===0 && data.data){
          var d=data.data;
          $('ttResult').innerHTML='<div class="dl-card">'+(d.play?'<video src="'+d.play+'" controls playsinline style="max-width:100%;max-height:350px;border-radius:8px;margin-bottom:1rem;"></video>':'')+'<p style="color:var(--text-secondary);margin-bottom:.5rem;font-size:.9rem;">'+(escHTML(d.title||'TikTok Video').substring(0,120))+'</p>'+'<p style="color:var(--text-muted);font-size:.8rem;margin-bottom:1rem;">👤 '+(escHTML(d.author&&d.author.nickname||'Unknown'))+' • ❤️ '+(d.digg_count||0).toLocaleString()+' likes</p>'+'<div class="tool-btn-row" style="justify-content:center;">'+(d.play?'<a class="tool-btn primary" href="'+d.play+'" target="_blank" download><i class="fas fa-download"></i> Video HD (No WM)</a>':'')+(d.hdplay?'<a class="tool-btn" href="'+d.hdplay+'" target="_blank" download><i class="fas fa-download"></i> Full HD</a>':'')+(d.music?'<a class="tool-btn" href="'+d.music+'" target="_blank" download><i class="fas fa-music"></i> Audio</a>':'')+'</div></div>';
        }else{throw new Error(data.msg||'Gagal mengambil video');}
      }catch(e){
        $('ttResult').innerHTML='<div class="tool-error"><i class="fas fa-exclamation-triangle"></i> '+escHTML(e.message)+'<br><small style="color:var(--text-muted);">Coba lagi atau pastikan URL benar.</small></div>';
      }
    };
  }
};

TOOLS['instagram-downloader'] = {
  render: function(){ return '<div class="tool-section"><label class="tool-label">Masukkan URL Post/Reel Instagram</label><input type="text" class="tool-input" id="igUrl" placeholder="https://www.instagram.com/reel/ABC123... atau /p/ABC123..."></div><div class="tool-btn-row"><button class="tool-btn primary" id="igDownload"><i class="fab fa-instagram"></i> Download Media</button></div><div id="igResult" style="margin-top:1.5rem;"></div><div class="tool-section" style="margin-top:1rem;"><span class="tool-tag">Info</span><p style="font-size:.85rem;color:var(--text-secondary);margin-top:.5rem;">Paste URL post atau reel Instagram untuk mendownload foto/video dalam resolusi HD. Pastikan post bersifat publik.</p></div>'; },
  init: function(){
    $('igDownload').onclick=async function(){
      var url=$('igUrl').value.trim();
      if(!url||(!url.includes('instagram.com'))){showToast('Masukkan URL Instagram yang valid!');return;}
      $('igResult').innerHTML='<div class="tool-loading"><i class="fas fa-spinner"></i> Mengambil media...</div>';
      try{
        // Try using a public API endpoint
        var apiUrl='https://api.saveig.app/api/v1/media?url='+encodeURIComponent(url);
        var resp=await fetch(apiUrl);
        if(!resp.ok) throw new Error('API tidak tersedia');
        var data=await resp.json();
        if(data && data.length > 0){
          var html='<div class="dl-card">';
          data.forEach(function(item,i){
            if(item.url){
              var isVideo=item.url.includes('.mp4')||item.type==='video';
              html+=(isVideo?'<video src="'+item.url+'" controls playsinline style="max-width:100%;max-height:350px;border-radius:8px;margin-bottom:1rem;"></video>':'<img src="'+item.url+'" style="max-width:100%;border-radius:8px;margin-bottom:1rem;" alt="Instagram media">')+'<a class="tool-btn primary" href="'+item.url+'" target="_blank" download style="margin-bottom:.5rem;display:flex;justify-content:center;"><i class="fas fa-download"></i> Download '+(isVideo?'Video':'Foto')+' #'+(i+1)+'</a>';
            }
          });
          html+='</div>';
          $('igResult').innerHTML=html;
        }else{throw new Error('Media tidak ditemukan');}
      }catch(e){
        // Fallback method: try alternative endpoint
        try{
          var shortcode=url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
          if(shortcode){
            var embedUrl='https://www.instagram.com/'+shortcode[1]+'/'+shortcode[2]+'/embed/';
            $('igResult').innerHTML='<div class="dl-card"><p style="color:var(--text-secondary);margin-bottom:1rem;">Untuk download video/foto Instagram dalam HD, klik tombol di bawah untuk membuka di tab baru, lalu klik kanan → "Save video/image as..."</p><a class="tool-btn primary" href="'+embedUrl+'" target="_blank" style="display:flex;justify-content:center;"><i class="fas fa-external-link-alt"></i> Buka di Tab Baru</a><p style="font-size:.8rem;color:var(--text-muted);margin-top:1rem;">💡 Tip: Klik kanan pada video/foto → "Save as" untuk download.</p></div>';
          }else{throw new Error('URL tidak valid');}
        }catch(e2){
          $('igResult').innerHTML='<div class="tool-error"><i class="fas fa-exclamation-triangle"></i> Gagal mengambil media Instagram.<br><small style="color:var(--text-muted);">Pastikan post bersifat publik dan URL benar.</small></div>';
        }
      }
    };
  }
};

// ==================== PAGE INITIALIZATION ====================

// Tool metadata (same as in script.js but with slug mapping)
var toolMeta = {
  'word-counter':       { name:'Word Counter',         icon:'fas fa-font',              desc:'Hitung jumlah kata, karakter, kalimat, dan paragraf dari teks apapun secara instan.' },
  'lorem-ipsum':        { name:'Lorem Ipsum Generator', icon:'fas fa-paragraph',         desc:'Generate teks placeholder Lorem Ipsum untuk mockup dan desain.' },
  'case-converter':     { name:'Case Converter',        icon:'fas fa-text-height',       desc:'Ubah teks ke berbagai format: UPPERCASE, lowercase, Title Case, camelCase, dll.' },
  'text-diff':          { name:'Text Diff Checker',     icon:'fas fa-code-compare',      desc:'Bandingkan dua teks dan temukan perbedaannya.' },
  'markdown-preview':   { name:'Markdown Preview',      icon:'fas fa-file-code',         desc:'Tulis dan preview Markdown secara real-time.' },
  'slug-generator':     { name:'Slug Generator',        icon:'fas fa-link',              desc:'Konversi judul menjadi URL slug yang SEO-friendly.' },
  'color-picker':       { name:'Color Picker',          icon:'fas fa-eye-dropper',       desc:'Pilih warna dan dapatkan kode HEX, RGB, HSL.' },
  'qr-generator':       { name:'QR Code Generator',     icon:'fas fa-qrcode',            desc:'Buat QR Code dari teks atau URL.' },
  'image-compressor':   { name:'Image Compressor',      icon:'fas fa-compress',          desc:'Kompres gambar tanpa kehilangan kualitas signifikan.' },
  'favicon-generator':  { name:'Favicon Generator',     icon:'fas fa-icons',             desc:'Buat favicon dari gambar apapun.' },
  'palette-generator':  { name:'Palette Generator',     icon:'fas fa-palette',           desc:'Generate palet warna harmonis dari warna dasar.' },
  'json-formatter':     { name:'JSON Formatter',        icon:'fas fa-code',              desc:'Format, validasi, dan minify JSON.' },
  'base64-encoder':     { name:'Base64 Encoder',        icon:'fas fa-lock',              desc:'Encode dan decode teks ke/dari Base64.' },
  'regex-tester':       { name:'Regex Tester',          icon:'fas fa-asterisk',          desc:'Tes regular expression secara real-time.' },
  'css-minifier':       { name:'CSS Minifier',          icon:'fab fa-css3-alt',          desc:'Minifikasi kode CSS.' },
  'html-beautifier':    { name:'HTML Beautifier',       icon:'fab fa-html5',             desc:'Rapikan kode HTML yang berantakan.' },
  'jwt-decoder':        { name:'JWT Decoder',           icon:'fas fa-key',               desc:'Decode dan inspeksi JSON Web Token.' },
  'code-diff':          { name:'Code Diff Viewer',      icon:'fas fa-terminal',          desc:'Bandingkan dua potongan kode.' },
  'unit-converter':     { name:'Unit Converter',        icon:'fas fa-ruler',             desc:'Konversi satuan panjang, berat, suhu, kecepatan, volume.' },
  'currency-converter': { name:'Currency Converter',    icon:'fas fa-money-bill-wave',   desc:'Konversi mata uang dunia.' },
  'number-base':        { name:'Number Base Converter', icon:'fas fa-hashtag',           desc:'Konversi angka antara desimal, biner, oktal, hex.' },
  'timestamp-converter':{ name:'Timestamp Converter',   icon:'fas fa-clock',             desc:'Konversi Unix timestamp ke tanggal dan sebaliknya.' },
  'color-converter':    { name:'Color Converter',       icon:'fas fa-fill-drip',         desc:'Konversi warna antara HEX, RGB, HSL.' },
  'file-size-converter':{ name:'File Size Converter',   icon:'fas fa-hard-drive',        desc:'Konversi ukuran file: Bytes, KB, MB, GB, TB.' },
  'bmi-calculator':     { name:'BMI Calculator',        icon:'fas fa-weight-scale',      desc:'Hitung Body Mass Index dari berat dan tinggi badan.' },
  'percentage-calculator':{ name:'Percentage Calculator',icon:'fas fa-percent',           desc:'Hitung persentase, kenaikan, dan perbedaan.' },
  'age-calculator':     { name:'Age Calculator',        icon:'fas fa-cake-candles',       desc:'Hitung umur tepat dari tanggal lahir.' },
  'discount-calculator':{ name:'Discount Calculator',   icon:'fas fa-tags',              desc:'Hitung harga akhir setelah diskon.' },
  'tip-calculator':     { name:'Tip Calculator',        icon:'fas fa-utensils',          desc:'Hitung tip restoran.' },
  'password-generator': { name:'Password Generator',    icon:'fas fa-shield-halved',     desc:'Generate password kuat dan aman.' },
  'uuid-generator':     { name:'UUID Generator',        icon:'fas fa-fingerprint',       desc:'Generate UUID v4 unik.' },
  'hash-generator':     { name:'Hash Generator',        icon:'fas fa-file-shield',       desc:'Generate hash SHA-256, SHA-1, SHA-512.' },
  'gradient-generator': { name:'Gradient Generator',    icon:'fas fa-wand-magic-sparkles',desc:'Buat CSS gradient dengan visual editor.' },
  'box-shadow-generator':{ name:'Box Shadow Generator', icon:'fas fa-square',            desc:'Desain CSS box-shadow dengan kontrol visual.' },
  'tiktok-downloader':  { name:'TikTok Downloader',     icon:'fab fa-tiktok',            desc:'Download video TikTok tanpa watermark dalam resolusi HD.' },
  'instagram-downloader':{ name:'Instagram Downloader', icon:'fab fa-instagram',         desc:'Download foto & video Instagram/Reels dalam resolusi HD.' },
  'ai-nickname-generator':{ name:'AI Nickname Generator',icon:'fas fa-robot',            desc:'Buat nickname 3 suku kata unik dengan AI dari nama panggilan dan tema.' },
};

document.addEventListener('DOMContentLoaded', function(){
  // Read tool ID from URL
  var params = new URLSearchParams(window.location.search);
  var toolId = params.get('id');

  if(!toolId || !TOOLS[toolId]){
    $('toolBody').innerHTML = '<div style="text-align:center;padding:3rem;"><i class="fas fa-exclamation-triangle" style="font-size:3rem;color:#f97316;margin-bottom:1rem;display:block;"></i><h3>Tool tidak ditemukan</h3><p style="color:var(--text-secondary);margin-top:.5rem;">Kembali ke <a href="index.html" style="color:var(--accent);">halaman utama</a></p></div>';
    return;
  }

  var meta = toolMeta[toolId] || { name: toolId, icon: 'fas fa-wrench', desc: '' };

  // Set page title & header
  document.title = meta.name + ' — NyukTools';
  $('toolIcon').innerHTML = '<i class="'+meta.icon+'"></i> '+meta.name;
  $('toolDesc').textContent = meta.desc;

  // Render tool
  $('toolBody').innerHTML = TOOLS[toolId].render();

  // Init tool
  if(TOOLS[toolId].init) TOOLS[toolId].init();

  // Init particles (subtle)
  if(typeof particlesJS !== 'undefined' && window.innerWidth > 768){
    var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#10b981';
    particlesJS('particles-js',{particles:{number:{value:30,density:{enable:true,value_area:900}},color:{value:accent},opacity:{value:0.15,random:true},size:{value:2,random:true},line_linked:{enable:true,distance:140,color:accent,opacity:0.06,width:1},move:{enable:true,speed:0.6,direction:'none',random:true,out_mode:'out'}},interactivity:{events:{onhover:{enable:false},onclick:{enable:false},resize:true}},retina_detect:true});
  }

  // Load saved theme
  var savedAccent = localStorage.getItem('tn-accent');
  var savedHover = localStorage.getItem('tn-accent-hover');
  if(savedAccent && savedHover){
    document.documentElement.style.setProperty('--accent', savedAccent);
    document.documentElement.style.setProperty('--accent-hover', savedHover);
    var r=parseInt(savedAccent.slice(1,3),16),g=parseInt(savedAccent.slice(3,5),16),b=parseInt(savedAccent.slice(5,7),16);
    document.documentElement.style.setProperty('--accent-glow','rgba('+r+','+g+','+b+',0.3)');
    document.documentElement.style.setProperty('--accent-subtle','rgba('+r+','+g+','+b+',0.1)');
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function(){
    var nav = $('navbar');
    if(nav) nav.classList.toggle('solid', window.scrollY > 50);
  });

  // Back to top
  var btn = $('backToTop');
  if(btn){
    window.addEventListener('scroll',function(){btn.classList.toggle('show',window.scrollY>400);});
    btn.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
  }
});
