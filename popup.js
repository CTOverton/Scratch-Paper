// Load Layout
window.addEventListener("load", function() {
    console.log('loading...');
    chrome.storage.sync.get('layout', function(data) {
        tools.innerHTML = data.layout;
    });
});

// Save Layout
$(document).ready(function(){
    $('input, textarea').change(function(){
        console.log("saving layout...")

        let $content = $("#sp_tools");

        let $clone = $content.clone()
        $clone.find('input, textarea').each(function () {
            let $input = $(this);
            // start an attribute object later use with attr()
            let attrs = {
                value: $input.val()
            };

            if ($input.is('textarea')) {
                $input.html($input.val())
            }

            // add the attributes to element
            $input.attr(attrs);
        });

        let html = $clone.html();

        chrome.storage.sync.set({layout: html}, function() {
            console.log('layout is:');
            console.log('');
            console.log(html);
        });
    });
});

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
    let $removebtns = $('.remove_btn');

    if ($removebtns) {
        for (let i=0; i < $removebtns.length; i++)
        $removebtns[i].onclick = function() {
            this.parentElement.remove();
        };
    }

}