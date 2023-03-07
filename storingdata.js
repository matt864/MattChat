function processMessage(){
  function MattChat(name,message,date){
    this.mattChatName = name;
    this.mattChatMessage = message;
    this.mattChatDate = date;
    this.mattChatNumber = window.crypto.randomUUID().toString();
  }
  var nameinput = document.getElementById("name").value;
  var messageinput = document.getElementById("message").value;
  if(nameinput!=""&&messageinput!=""){
  const newMessage = new MattChat(nameinput,messageinput,new Date().toDateString());
  messages.push(newMessage);
  var newMessageHTML = divwrap(newMessage,true);
  console.log(newMessageHTML);
  document.getElementById('message-grid').innerHTML = newMessageHTML + document.getElementById('message-grid').innerHTML;
  const JSONFormattedNewMessage = 
  'mattChatName : "' + newMessage.mattChatName + '", '+
  'mattChatMessage : "' + newMessage.mattChatMessage.replace(/"/g,"'") + '", '+
  'mattChatDate : "' + newMessage.mattChatDate.replace(/"/g,"'") + '", '+
  'mattChatNumber : "' + newMessage.mattChatNumber +'"';
  var mutationformat = JSON.stringify({
    query: `
      mutation createMattChat {
        createMattChat( data: {${JSONFormattedNewMessage}}) {
          id
        }
        publishMattChat(where: {mattChatNumber: "${newMessage.mattChatNumber}"}) {
          id
        }
      }`,
  });
  fetch('https://api-eu-west-2.hygraph.com/v2/cl1pebwgd0gz301xkax3s94nr/master', {
  method: 'POST',
  headers: {'Content-Type': 'application/json',},
  body: mutationformat,
}).then((res) => res.json());
var x = document.getElementById("message-grid");
tomove=x;
clearValues();
displayThankYou();
  }
}
function processComment(el){
  const parentElement = el.parentElement;
  console.log(parentElement);
  const grandparentElement = parentElement.parentElement.parentElement;
  console.log(grandparentElement);
  const commentname = parentElement.getElementsByClassName("name-reply")[0].value;
  const commentmessage = parentElement.getElementsByClassName("message-reply")[0].value;
  const commentdate = new Date().toDateString();
  const commentid = Math.floor(Math.random() * 100000000000001);
  if(commentname!=""&&commentmessage!=""){
  const JSONFormattedNewComment = 
  'mattChatName : "' + commentname + '", '+
  'mattChatMessage : "' + commentmessage + '", '+
  'mattChatDate : "' + commentdate + '", '+
  'idRelation : "' + grandparentElement.getAttribute('id')+'",'+
  'commentId : ' + commentid;
  var mutationformat = JSON.stringify({
    query: `
      mutation createMattChatComment {
        createMattChatComment( data: {${JSONFormattedNewComment}}) {
          id
        }
        publishMattChatComment(where: {commentId: ${commentid}}) {
          id
        }
      }`,
  });
  fetch('https://api-eu-west-2.hygraph.com/v2/cl1pebwgd0gz301xkax3s94nr/master', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: mutationformat,
  });
  var newcommentHTML = "<div class='message-name'>" + commentname +"</div>" + "<div class='message-content'>" + commentmessage +"</div>"+ "<div class='message-date'>" + commentdate +"</div>";
  grandparentElement.getElementsByClassName('reply-block')[0].innerHTML += newcommentHTML;
  var commentcount =  grandparentElement.getElementsByClassName('date-holder')[0].getElementsByClassName('comment-count')[0];
 commentcount.innerHTML = Number(commentcount.innerHTML) + 1;
  clearValues();
}
}
function clearValues(){
  var inputs = document.getElementsByTagName('input');
  var textarea = document.getElementsByTagName('textarea');
  for (let i=0;i<inputs.length;i++){
    inputs[i].value = "";
  }
  for (let i=0;i<textarea.length;i++){
    textarea[i].value = "";
  }
  var charsleft = document.getElementsByClassName('chars-left');
  for (let i=0;i<charsleft.length;i+=2){
    charsleft[i].innerHTML = "20";
    charsleft[i+1].innerHTML = "250";
  }
}
function displayThankYou(){
  var closing = document.getElementById("entry-form");
  closing.removeAttribute('class');
  closing.setAttribute("class","animate__animated animate__fadeOutUp");
  window.setTimeout(function(){
    var opening = document.getElementById('thank-you-message');
    opening.style.display = "grid";
    opening.removeAttribute('class');
    opening.setAttribute("class","animate__animated animate__fadeInUp");
    window.setTimeout(function(){
      document.getElementById('entry-form').style.display = "none";
        closeForm("message-grid","thank-you-message");
    },3000);
  },1000);
}