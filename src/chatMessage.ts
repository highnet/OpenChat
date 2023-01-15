 function generateChatMessageHTML(msg: string){
    let component = `
    <div class="chat-message grid grid-1x2">
        <span class="chat-bubble"></span>
        <p class="chat-text">
            ${msg}
        </p>
        </div>`;
    let div = document.createElement("div");
    div.innerHTML = component;
    return div;    
  }