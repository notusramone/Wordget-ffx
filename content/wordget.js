//This is the tool to access wordget's database
//2012 Notus

tag="";

var Wordget=function(tagmsg){
    tag=tagmsg;
}

Wordget.prototype={
    Sayhello: function(){
        alert(tag);
    }
}