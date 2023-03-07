var messages = [];
var tomove;
window.addEventListener("load",initAnim);
function initAnim(){
    getData();
}
function checkData(){
    if (messages.length===0){
        displayEmptyMessage()
    }
    else {
        displayMessages();
        document.getElementById("empty-message").style.display = "none";
    }
}
function displayEmptyMessage(){
    var x = document.getElementById("empty-message");
   x.setAttribute("class","animate__animated animate__fadeInUpBig");
   x.style.display="block";
   document.getElementById("message-grid").style.display="none";
    tomove = x;
}
function displayForm(){
tomove.removeAttribute('class');
tomove.setAttribute("class","animate__animated animate__fadeOutLeft");
var arriving = document.getElementById("entry-form");
document.getElementById("add-sign").style.transform = "rotate(45deg)";
window.setTimeout(function(){
    tomove.style.display="none";
    arriving.style.display = "block";
    arriving.setAttribute("class","animate__animated animate__fadeInRight");
},500);
document.getElementById("add-sign").removeAttribute("onclick");
if (messages.length>0){
  document.getElementById("add-sign").setAttribute("onclick","closeForm('message-grid','entry-form')");
}else{
  document.getElementById("add-sign").setAttribute("onclick","closeForm('empty-message','entry-form')");
}

}
function closeForm(toopen,toclose){
    var closing = document.getElementById(toclose);
    var opening = document.getElementById(toopen)
    closing.removeAttribute('class')
    closing.setAttribute("class","animate__animated animate__fadeOutRight");
    document.getElementById("add-sign").style.transform = "rotate(0deg)";
    window.setTimeout(closeFormFully, 500,opening, closing);
      function closeFormFully(opening,closing){
        let tomove = opening;
        closing.style.display="none";
        if(messages.length===0){
            tomove.style.display="block";
        } else{tomove.style.display="grid"};
        tomove.removeAttribute('class');
        tomove.setAttribute("class","animate__animated animate__fadeInLeft");
      }
    document.getElementById("add-sign").removeAttribute("onclick");
    document.getElementById("add-sign").setAttribute("onclick","displayForm()");
}
function displayMessages(needToFade){
      messages.sort( compare );
      var x = document.getElementById("message-grid");
      x.innerHTML="";
     for (let i=0;i<messages.length;i++){
         var rawdata = messages[i];
        var indivmessage = divwrap(rawdata,false);
        x.innerHTML+=indivmessage;
     }
     tomove=x;
          x.style.display="grid";
}
function divwrap(el,hiddenBool){
    var wrappeddiv = "<div class='message-holder' id="+el.id+"><div class='message-name'>"+String(el.mattChatName) + "</div><div class='message-content'>" + String(el.mattChatMessage) + "</div><div class='date-holder'><div class='message-date'>"  + String(el.mattChatDate) + "</div><div class='comment-count'>0</div><img class='small-icon' src='logos/reply.png' onClick='openReply(this)'><img class='small-icon' src='logos/expand.png' onClick='expandMattChat(this)'></div><div class='reply-block'></div><div class='reply-input'><form class='entry-form-reply'><label>Name</label><br><input type='text' class='name-reply' autocomplete='off' maxlength='20' oninput='calcCharsLeft(this,0,20)'><br><div class='chars-left'>20</div><label>Message</label><br><textarea type='text' class='message-reply' autocomplete='off' maxlength='250' oninput='calcCharsLeft(this,1,250)'></textarea><br><div class='chars-left' class='message-chars-left-reply'>250</div><img class='submit-reply' src='logos/tick.png' onclick='processComment(this)'></form></div></div>";
    if(hiddenBool===true){
        var altereddiv = wrappeddiv.replace("<div class='date-holder'><div class='message-date'>","<div class='date-holder hidden-replies'><div class='message-date'>");
       return altereddiv;
    }else{
    return wrappeddiv;
    }
}
function compare( a, b ) {
    if ( a.createdAt < b.createdAt ){
      return 1;
    }
    if ( a.createdAt > b.createdAt ){
      return -1;
    }
    return 0;
  }
  function compareReverse( a, b ) {
    if ( a.createdAt > b.createdAt ){
      return 1;
    }
    if ( a.createdAt < b.createdAt ){
      return -1;
    }
    return 0;
  }
  function calcCharsLeft(whichElem,whichOne,Chars){
      var input = whichElem;
      var charsvis = whichElem.parentElement.getElementsByClassName('chars-left')[whichOne];
      charsvis.innerHTML = Chars - input.value.length;
  }
  function expandMattChat(el){
      el.parentElement.parentElement.getElementsByClassName('reply-input')[0].style.display = 'block';
      el.parentElement.parentElement.getElementsByClassName('reply-block')[0].style.display = 'grid';
        el.style.transform = "rotate(180deg)";
        el.removeAttribute('onClick');
        el.setAttribute('onClick','closeMattChatComments(this)');
  }
  function closeMattChatComments(el){
    el.parentElement.parentElement.getElementsByClassName('reply-input')[0].style.display = 'none';
    el.parentElement.parentElement.getElementsByClassName('reply-block')[0].style.display = 'none';
    el.style.transform = "rotate(0deg)";
    el.removeAttribute('onClick');
    el.setAttribute('onClick','expandMattChat(this)');
  }
  function openReply(el){
      expandMattChat(el.parentElement.getElementsByClassName('small-icon')[1]);
      el.parentElement.parentElement.getElementsByClassName('reply-input')[0].scrollIntoView({behavior:"smooth"});
  }