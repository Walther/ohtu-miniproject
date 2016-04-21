window.onload = function(){

  var articles = document.getElementById("articles");
  var books = document.getElementById("books");
  var inproceedings = document.getElementById("inproceedings");

  // Get filelist
  fetch("/list")
  .then(function (response) {
    // Fail if response !== 200
    if (response.status !== 200) {
      console.debug("Debug: response: " + JSON.stringify(response.status));
      return;
    }

    response.json().then(function (filelist) {
      console.debug("Debug: Files: " + filelist)
      filelist.forEach(function (filename) {
        console.debug("Debug: file:" + filename)
        fetch("/data/" + filename)
        .then(function (response) {
          response.json().then(function(blob) {
            console.log("Debug: response: " + JSON.stringify(blob));

            // If article
            if (blob.format == "article") {
              var row           = articles.insertRow();
              var author        = row.insertCell(0);
              var title         = row.insertCell(1);
              var journal       = row.insertCell(2);
              var volume        = row.insertCell(3);
              var year          = row.insertCell(4);
              var pages         = row.insertCell(5);
              author.innerHTML  = blob.author;
              title.innerHTML   = blob.title;
              journal.innerHTML = blob.journal;
              volume.innerHTML  = blob.volume;
              year.innerHTML    = blob.year;
              pages.innerHTML   = blob.pages;
            } else if (blob.format == "book") {
              var row             = books.insertRow();
              var author          = row.insertCell(0);
              var title           = row.insertCell(1);
              var publisher       = row.insertCell(2);
              var year            = row.insertCell(3);
              author.innerHTML    = blob.author;
              title.innerHTML     = blob.title;
              publisher.innerHTML = blob.publisher;
              year.innerHTML      = blob.year;
            } else if (blob.format == "inproceedings") {
              var row             = inproceedings.insertRow();
              var author          = row.insertCell(0);
              var title           = row.insertCell(1);
              var booktitle       = row.insertCell(2);
              var year            = row.insertCell(3);
              author.innerHTML    = blob.author;
              title.innerHTML     = blob.title;
              booktitle.innerHTML = blob.booktitle;
              year.innerHTML      = blob.year;
            }
          })
        })
      })
    });
  })

}
