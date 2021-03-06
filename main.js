document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;
    if(!validateform(siteName,siteUrl)){
        return false;
    }
    var bookmark = {
        name : siteName,
        url : siteUrl
    };
    if(localStorage.getItem("bookmarks") === null){
        var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }else{
        var bookmarks =JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }
    document.getElementById("myForm").reset();

    fetchBookmarks();
    e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks =JSON.parse(localStorage.getItem("bookmarks"));
    for(var i = 0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }

    }
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks =JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResult = document.getElementById("bookmarksResults");
    bookmarksResult.innerHTML = "";
    for(var i = 0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResult.innerHTML+="<div class='whell'>"+
            "<h3>"+name+
            '<a class="btn btn-default" target="_blank" href="'+url+'">visit</a>'+
            '<a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger"href="#">Delete</a>'+
        "</h3>"+"</div>";
    }
}
function validateform(siteName,siteUrl) {
    if(!siteName||!siteUrl){
        alert("Please fiil in the form");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert("Please use a valid URL");
        return false;
    }
    return true;
}