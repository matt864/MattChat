function getData(){
fetch('https://api-eu-west-2.graphcms.com/v2/cl1pebwgd0gz301xkax3s94nr/master', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
        {
          mattChats {
            mattChatName,
            mattChatMessage,
            mattChatDate,
            mattChatNumber,
            createdAt,
            id
          }
          mattChatComments{
            mattChatName,
            mattChatMessage,
            mattChatDate,
            idRelation,
            createdAt
          }

}
      `,
  }),
})
.then((res) => res.json())
.then((res) => processData(res.data))
}
function processData(data){
  populateMessages(data.mattChats);
  fillComments(data.mattChatComments);
}
function populateMessages(data){
  console.log(data);
      messages=data;
    checkData();
}
function fillComments(data){
  console.log(data);
  if(data){
    data.sort( compareReverse );
    data.map(function(el,index,arr){
      var newcommentHTML = "<div class='message-name'>" + el.mattChatName +"</div>" + "<div class='message-content'>" + el.mattChatMessage +"</div>"+ "<div class='message-date'>" + el.mattChatDate +"</div>";
      if(el.idRelation!="undefined"){
        document.getElementById(el.idRelation).getElementsByClassName('reply-block')[0].innerHTML+=newcommentHTML;
        document.getElementById(el.idRelation).getElementsByClassName('comment-count')[0].innerHTML++;
      }
      
  })
}
}