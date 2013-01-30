function showMore() {
  document.getElementById("more-text").hidden = false;
  
}

function showLibList(){
  //var wg=new Wordget("hello js");
 // wg.Sayhello();
  var con=new SQLite("wordget.db",{location:'Desk'});
  //window.open("chrome://myxapp/content/another.xul", "bmarks", "chrome,width=600,height=300");
  //show all libraries
  var res=con.execute("select * from library where tag>0");
  var count=res.length;
  var box_main=document.getElementById("box_main");
  clearAll(box_main);
  for (var i=0; i < count; i++){     
      
      var lb=document.createElement("button");
      lb.setAttribute("label",res[i].name);
      lb.setAttribute("oncommand","showWordListForLib('"+res[i].uuid+"')");
      
      var sp=document.createElement("separator");
      box_main.appendChild(lb);
      box_main.appendChild(sp);
        
  }
    
}

function showunphoed(){
 var c_lib=document.getElementById("c_lib");
  c_lib.setAttribute("value","");
  var con=new SQLite("wordget.db",{location:'Desk'});
  var res=con.execute("select * from word where phonetic is null or length(phonetic)=0  and tag>0");
  var count=res.length;
  var box_wordlist=document.getElementById("box_wordlist");
  clearAll(box_wordlist);
  for (var i=0; i < count; i++){
    var w_uuid=res[i].uuid;
    var lb=document.createElement("textbox");
    lb.setAttribute("value",res[i].word);
    lb.setAttribute("oncommand","showWordDisplay('"+w_uuid+"')");
    var sp=document.createElement("separator");
    box_wordlist.appendChild(lb);    
    //pho textbox
    var word=con.execute("select * from word where uuid='"+w_uuid+"' and tag>0");
    var tb_ph=document.createElement("textbox");
    tb_ph.setAttribute("id","tb_ph_"+w_uuid);
    if(res[0].phonetic){
      tb_ph.setAttribute("value",word[0].phonetic);
    }
    box_wordlist.appendChild(tb_ph);
    box_wordlist.appendChild(sp);
  }
}
  
  
function showWordListForLib(lib_uuid){
  var c_lib=document.getElementById("c_lib");
  c_lib.setAttribute("value",lib_uuid);
  //c_lib.style.setProperty("visibility","hidden");
  var con=new SQLite("wordget.db",{location:'Desk'});
 
  //show all libraries
  var res=con.execute("select * from word where library_uuid='"+lib_uuid+"' and tag>0");
  var count=res.length;
  var box_wordlist=document.getElementById("box_wordlist");
  clearAll(box_wordlist);
  for (var i=0; i < count; i++){
    var w_uuid=res[i].uuid;
    var lb=document.createElement("textbox");
    lb.setAttribute("value",res[i].word);
    lb.setAttribute("oncommand","showWordDisplay('"+w_uuid+"')");
    var sp=document.createElement("separator");
    box_wordlist.appendChild(lb);    
    //pho textbox
    var word=con.execute("select * from word where uuid='"+w_uuid+"' and tag>0");
    var tb_ph=document.createElement("textbox");
    tb_ph.setAttribute("id","tb_ph_"+w_uuid);
    if(res[0].phonetic){
      tb_ph.setAttribute("value",word[0].phonetic);
    }
    box_wordlist.appendChild(tb_ph);
    box_wordlist.appendChild(sp);
  }
}

function updatPho(wuuid){
  var tb_ph=document.getElementById("tb_ph");
  var con=new SQLite("wordget.db",{location:'Desk'});
  var sql="update word set phonetic='"+tb_ph.value+"' where uuid='"+wuuid+"'";
  var res=con.execute(sql);
}

function clearAll(abox){
  while(abox.hasChildNodes()){
    abox.removeChild(abox.firstChild);
  }
}

function updateAll(){
  var con=new SQLite("wordget.db",{location:'Desk'});
  var c_lib=document.getElementById("c_lib");
  if(c_lib.value!=""){
    var res=con.execute("select * from word where library_uuid='"+c_lib.value+"' and tag>0");
    var count=res.length;
    for (var i=0; i < count; i++){
      var w_uuid=res[i].uuid;
      var tb_word=document.getElementById("tb_ph_"+w_uuid);
      var sql="update word set phonetic='"+tb_word.value+"' where uuid='"+w_uuid+"'";
      con.execute(sql);
    }
    alert("All Set!");
	showWordListForLib(c_lib.value);
  }
  else{
    var res=con.execute("select * from word where phonetic is null or length(phonetic)=0 and tag>0");
    var count=res.length;
    for (var i=0; i < count; i++){
      var w_uuid=res[i].uuid;
      var tb_word=document.getElementById("tb_ph_"+w_uuid);
      var sql="update word set phonetic='"+tb_word.value+"' where uuid='"+w_uuid+"'";      
      con.execute(sql);
    }
	alert("All Set!");
	showunphoed();
  }
}

