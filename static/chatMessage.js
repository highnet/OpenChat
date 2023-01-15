function generate(msg){
    let component = `
    <div class="chat-message grid grid-1x2">
        <span class="chat-bubble"></span>
        <p class="chat-text">
            ${msg}
        </p>
        </div>`;
    return stringToHTML(component);    
}

function stringToHTML(str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body.firstChild;
};