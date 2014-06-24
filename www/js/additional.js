// HASHTAGS ------------
// HASHTAGS ------------
// HASHTAGS ------------
// HASHTAGS ------------

// Collects hashtags entered into box
// alerts them out
// change to storing them for searchability (add later)

var hashTagList = [];

function logHashList(){
    hashTagList = [];
    $('.highlight').each(function(){
        hashTagList.push(this.innerHTML);
    });
    for(var i=0;i<hashTagList.length;i++){
        print(hashTagList[i]);
    }
    if(hashTagList.length==0){
        alert('You have not typed any hashtags');
    }
}
$(function() {

    var hashtags = false;

    $(document).on('keydown', '#example-one', function (e) {        
        arrow = {
            hashtag: 51,
            space: 32
        };

        var input_field = $(this);
        switch (e.which) {
            case arrow.hashtag:
                e.preventDefault();
                input_field.html(input_field.html() + "<span class='highlight'>#");
                placeCaretAtEnd(this);
                hashtags = true;
                break;
            case arrow.space:       
                if(hashtags) {         
                    e.preventDefault();
                    input_field.html(input_field.html() + "</span>&nbsp;");    
                    placeCaretAtEnd(this);
                    hashtags = false;
                }
                break;
        }

    });

});


function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

//UP & DOWN VOTES------------
//UP & DOWN VOTES------------
//UP & DOWN VOTES------------
//UP & DOWN VOTES------------

// Hook up our vote handlers
$("a.vote").live('click', voteClick);

    function voteClick(event) {
        var voteLink, voteType, item, itemId;

        // Regardless of the below, we handle the event, so "consume" it
        event.stopPropagation();
        event.preventDefault();

        // Get the anchor element, wrapped in a jQuery instance
        voteLink = $(this);

        // See if the vote has already been done or is in progress
        if (voteLink.hasClass('done') || voteLink.hasClass('inprogress')) {
            // Ignore the click, possibly tell the user why
            return;
        }

        // Get the vote type
        voteType = voteLink.hasClass('up') ? 'up' : 'down';

        // Get the item we're voting on
        item     = voteLink.closest('.article');

        // // Get its ID
        // itemId   = item.attr('data-itemid');

        // // If we didn't get an ID...
        // if (!itemId) {
        //     // ...report error
        //     return;
        // }

        // Mark "in progress" and initiate the vote; action continues
        // in our callbacks below
        voteLink.addClass('inprogress');

        //with ajax
        // $.ajax({
        //     url:     'savevote',
        //     data:    {itemId: itemId, voteType: voteType},
        //     type:    'POST',
        //     success: votePostSuccess,
        //     error:   votePostError
        // });

        //with FIREBASE
        var votesRef = _firebase.push('sparks/votes');
        votesRef.set({voteType: voteType});


        // Called when the POST is successful
        function votePostSuccess(response) {
            // The POST worked
            voteLink.removeClass('inprogress');

            // Did things work on the server?
            if (response === "ok") { // Or whatever
                // Yes, the vote was successfully recorded
                voteLink.addClass('done');
            }
            else {
                // Report an error to the user, the server couldn't record the vote
            }
        }

        // Called when the POST fails for some reason (HTTP errors)
        function votePostError(xhr, statusText, err) {
            // Not in progress anymore
            voteLink.removeClass('inprogress');

            // Report error to user
        }
    }



