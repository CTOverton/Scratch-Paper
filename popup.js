// let changeColor = document.getElementById('changeColor');
// let copypaste = document.getElementById('copypaste');

// chrome.storage.sync.get('color', function(data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// });
//
// changeColor.onclick = function(element) {
//     let color = element.target.value;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {code: 'document.body.style.backgroundColor = "' + color + '";'});
//     });
// };

// Clipboard.js
var clipboard = new ClipboardJS('.copy_btn', {
    target: function(trigger) {
        return trigger.parentElement.firstElementChild;
    }
});

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});

// Add Button
let addbtn = document.getElementById('add_btn');
let tools = document.getElementById('sp_tools');

addbtn.onclick = function(element) {
    tools.innerHTML +=
    '<div class="sp_text">\n' +
        '            <input type="text">\n' +
        '            <button class="copy_btn" data-clipboard-action="copy">\n' +
        '                <i class="material-icons md-18">file_copy</i>\n' +
        '            </button>\n' +
        '            <button class="btn less">\n' +
        '                <i class="material-icons md-18">more_horiz</i>\n' +
        '            </button>\n' +
        '        </div>'
    ;
};