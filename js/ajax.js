// MAIN FUNCTIONS
// Retrieve GitHub profile by sending an AJAX request to the GitHub API
function retGitHubProfile(username){
    if(username === ""){
        return;
    } else{
        /* ajax request to GitHub API 
         * - send username as string
         * - build components with the content of the response
         */
        $.ajax({
            url: "https://api.github.com/users/"+username,
            data: {
                // OAuth credentials for GitHub API
                client_id:"797b44ca01295abce3e9",
                client_secret:"8c4583b32416ebcec68497e7a85310e334e0320b"
            }
        }).done(function(response){
            // request repositories of this user in another ajax-request and insert it into the container that was created in the first ajax call
            $.ajax({
                url: "https://api.github.com/users/"+username+"/repos",
                data: {
                    client_id:"797b44ca01295abce3e9",
                    client_secret:"8c4583b32416ebcec68497e7a85310e334e0320b",
                    // get only 5 repos and sort them by created at
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                repos.forEach(repo => {
                    $("#repositories").append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-4"><b>${repo.name}</b></div>
                                <div class="col-md-4">${repo.created_at.substring(0,10)}</div>
                                <div class="col-md-4"><a class="btn btn-success" href="${repo.svn_url}" target="_blank">View Repo</a></div>
                            </div>
                        </div>
                    `);
                });
            });
            // insert userdata into index.html
            $("#outputArea").html(`
                    <!-- bootstrap panel as visual wrapper for user information -->
                    <div class="panel panel-default">

                        <!-- panel heading w username -->
                        <div class="panel-heading">
                            <h3 class="panel-title">${response.name}</h3>
                        </div>

                        <!-- panel content: avatar thumbnail, followers, following, # of repos... -->
                        <div class="panel-body">

                            <!-- organising content with grid -->
                            <div class="row">

                                <!-- left side: avatar thumbnail -->
                                <div class="col-md-3">
                                    <img src="${response.avatar_url}" alt="profile thumbnail" class="thumbnail avatar">
                                    <a target="_blank" class="btn btn-success btn-block" href=${response.html_url}>View Profile</a>
                                </div>

                                <!--right side: user information -->
                                <div class="col-md-9">
                                    <!-- labels -->
                                    <span class="label label-primary">Following: ${response.following}</span>
                                    <span class="label label-success">Followers: ${response.followers}</span>
                                    <span class="label label-info">Public Repos: ${response.public_repos}</span>
                                    <br><br>
                                    <!-- user info -->
                                    <ul class="list-group">
                                        <li class="list-group-item">Location: ${response.location}</li>
                                        <li class="list-group-item">Blog: <a href="https://${response.blog}" target="_blank">${response.blog}</a></li>
                                        <li class="list-group-item">Member since: ${response.created_at.substring(0,10)}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>      
                    
                    <!-- list of repositories -->
                    <h3 class="page-header">List of recent Repositories</h3>
                    <div id="repositories"></div>
                `
                );
        });
    }
}