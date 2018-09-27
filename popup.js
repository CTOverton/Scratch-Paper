$(document).ready(function(){
    loadLayout()
        .then(function() {
            // Add .change() events to input fields
            $('input, textarea').change(function(){
                saveLayout();
            });

            // ========== [ Buttons ] ==========

            // copy_btn with Clipboard.js
            $('#sp_tools').on('click', '.copy_btn', function() {
                var clipboard = new ClipboardJS('.copy_btn', {
                    target: function (trigger) {
                        return trigger.parentElement.firstElementChild;
                    }
                });

                clipboard.on('success', function (e) {
                    console.log(e);
                });

                clipboard.on('error', function (e) {
                    console.log(e);
                });
            });

            // clear_btn
            $('#sp_tools').on('click', '.clear_btn', function() {
                let $input = $(this).closest('.sp_tool').find('input, textarea');
                $input.val('');
                $input.html('')
                saveLayout();
            });

            // toggle_btn
            $('#sp_tools').on('click', '.toggle_btn', function() {
                let tool = $(this).closest('.sp_tool');
                let $input = tool.find('input, textarea');
                let data = $input.val();

                if ($input.is('input')) {
                    $input.remove();
                    tool.prepend('<textarea type="text">' + data + '</textarea>');
                } else {
                    $input.remove();
                    tool.prepend('<input type="text" value="' + data + '">');
                }
                saveLayout();
            });

            // rmv_btn
            $('#sp_tools').on('click', '.rmv_btn', function() {
                $(this).closest('.sp_tool').remove();
                saveLayout();
            });

            // menu_btn
            $('#sp_tools').on('click', '.menu_btn', function() {
                let $btn = $(this);
                let $tool = $btn.closest('.sp_tool');

                $tool.find('button').toggle();
            });

            // add_btn
            $('#add_btn')
                .click(function () {
                    $("#sp_tools").append($("#sp_tool_template").html());
                    // addButtonEvents();
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
            console.log('Loaded Layout');
            // console.log('Loaded Layout: \n' + data.layout);
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
            console.log('Saved Layout');
            // console.log('Saved Layout: \n' + html);
            resolve(html);
        });
    });
}