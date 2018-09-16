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

addbtn.onclick = function() {
    $("#sp_tools").append($("#template").html());
};

addListeners();

function addListeners() {
    let removebtn = $('.remove_btn');

    if (removebtn) {
        for (var i=0; i < removebtn.length; i++)
        removebtn[i].onclick = function(element) {
            this.parentElement.remove();
        };
    }
};

let save = document.getElementById('save');
let load = document.getElementById('load');

save.onclick = function() {

    var $content = $("#sp_tools");

    var $clone = $content.clone()
    $clone.find(':input', ':textarea').each(function () {
        var $input = $(this);
        // start an attribute object later use with attr()
        var attrs = {
            value: $input.val()
        };

        // add the attributes to element
        $input.attr(attrs);
    });

    var html = $clone.html();

    chrome.storage.sync.set({layout: html}, function() {
        console.log('layout is:');
        console.log('');
        console.log(html);
    })
};

load.onclick = function() {
    console.log('loading...');
    chrome.storage.sync.get('layout', function(data) {
        tools.innerHTML = data.layout;
    });
};