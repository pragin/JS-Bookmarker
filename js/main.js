//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
/*
  *This function captures the form input values on submit
  *It then creates an array containing site name and URL
  *If bookmarks already exists then add the new bookmark to the array and store it
  *else add a new bookmarks to localStorage

*/
function saveBookmark(e){
//Capture the form inputs
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  //objact to be passed to the local storage
  var bookmark = {
    name : siteName,
    url : siteUrl
  }

  //save the bookmare object to local storage
  if(localStorage.getItem('bookmarks') === null){
    //Init array
    var bookmarks = [];
    //add bookmark to array
    bookmarks.push(bookmark);
    //Set to  localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }else{
    //Get existing bookmars from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //Re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  //Prevent from form submitting if it is cancelable
  if(e.cancelable){
    e.preventDefault();
  }else {
    console.log("not cancelable");
  }
}

//Fetch bookmarks from the localStorage

/*
  *This function retrieve the bookmarks from localStorage and display it in a div called bookmarkResults.
  *This function also has visit and delete buttons for each bookmark.
*/
function fetchBookmarks(){
  //Get existing bookmars from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Select the div
  var bookmarkResults = document.getElementById('bookmarkResults');

  //Build output
  bookmarkResults.innerHTML = "";

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">'
                                + '<h3>' + name
                                + ' <a class = "btn btn-default" target="_blank" href="' + url +'">Visit</a> '
                                + ' <a onclick="deleteBookmark(\'' + url + '\')" class = "btn btn-danger" target="_blank" href=#>Delete</a> '
                                + '</h3></div>';
  //  console.log(name);
  }
}
