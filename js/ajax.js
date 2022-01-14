// HELPER FUNCTIONS
// set length of input field to length of placeholder
(function(){
    let input = $("#inputArea input")[0];
    input.setAttribute('size',input.getAttribute('placeholder').length);
})();

// MAIN FUNCTIONS
// Retrieve GitHub profile by sending an AJAX request to the GitHub API
function retGitHubProfile(str){
    if(str === ""){
        // show required message
        $("#inputRequired")[0].style.display = "initial";
        return;
    } else{
        // non-display required message
        $("#inputRequired")[0].style.display = "none";
        $("#outputArea").html(`Ajax response goes here`);
        /* ajax request to GitHub API 
         * - send username as string
         * - response => json-object
         * - build components with the content of the response
         */
        /*$.ajax({
            type: "GET",
            url: "URL_PLACEHOLDER",
            data: str,
            dataType: "string",
            username: therobhe,
            password: g€tH0bX3,
            success: function (response) {
                $("#outputArea").html(`
                    <div>Thumbnail</div>
                    <div>Labels</div>
                    <div>Recent Projects</div>
                    <div>Following</div>
                    <div>Followers</div>
                `
                );
            }
        });*/
    }
}