$(document).ready(function(){
    loadLayout()
        .then(function() {
            // Add .change() events to input fields
            $('input, textarea').change(function(){
                saveLayout();
            });
        });
});

// ========== [ Save / Load ] ==========

function loadLayout() {
    return new Promise(resolve => {
        console.log('loading layout...');
        chrome.storage.sync.get('layout', function(data) {
            $('#sp_tools').html(data.layout);
            console.log('Loaded Layout: \n' + data.layout);
            resolve(data.layout);
        });
    });
}

function saveLayout() {
    return new Promise(resolve => {
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

        chrome.storage.sync.set({layout: html}, function () {
            console.log('Saved Layout: \n' + html);
            resolve(html);
        });
    });
}




// ========== [ Buttons ] ==========

// copy_btn with Clipboard.js

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

// add_btn

// add_btn

$('#add_btn')
    .click(function() {
        $("#sp_tools").append($("#template").html());
    });

$('.rmv_btn')
    .click(function() {
        $(this).parent().remove();
    });