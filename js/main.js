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

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

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

  //Clear form after submission
  document.getElementById('myForm').reset();

  //Display bookmarks after addition
  fetchBookmarks();
  //Prevent from form submitting if it is cancelable
  if(e.cancelable){
    e.preventDefault();
  }else {
    console.log("not cancelable");
  }
}

//Delete bookmark from the localStorage
function deleteBookmark(url){
  //Get existing bookmars from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Loop through the array
  for(var i = 0; i < bookmarks.length; i++){
    //delete bookmark from array
    if(bookmarks[i].url == url){
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }

  //Re-set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Display bookmarks after deletion
  fetchBookmarks();
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
                                + ' <a onclick="deleteBookmark(\'' + url + '\')" class = "btn btn-danger" href="#">Delete</a> '
                                + '</h3></div>';
  //  console.log(name);
  }
}

function validateForm(siteName, siteUrl){
  //Regular expression for valid URL
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  //Validate if Site Name or Site URL is empty
  if(!siteName || !siteUrl){
    alert('Please fill in the form')
    return false;
  }
  //Validate if the URL is a valid URL
  if(!siteUrl.match(regex)){
    alert('Please enter a valid URL');
    return false;
  }
  return true;
}
