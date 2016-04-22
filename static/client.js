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
      console.debug("Debug: Files: " + filelist);
      filelist.forEach(function (filename) {
        console.debug("Debug: file:" + filename);
        fetch("/data/" + filename)
        .then(function (response) {
          response.json().then(function(blob) {
            console.log("Debug: response: " + JSON.stringify(blob));
            var row, author, title, journal, volume,pages,year,publisher,booktitle;
            // If article
            if (blob.format == "article") {
              row           = articles.insertRow();
              author        = row.insertCell(0);
              title         = row.insertCell(1);
              journal       = row.insertCell(2);
              volume        = row.insertCell(3);
              year          = row.insertCell(4);
              pages         = row.insertCell(5);
              author.innerHTML  = blob.author;
              title.innerHTML   = blob.title;
              journal.innerHTML = blob.journal;
              volume.innerHTML  = blob.volume;
              year.innerHTML    = blob.year;
              pages.innerHTML   = blob.pages;
            } else if (blob.format == "book") {
              row             = books.insertRow();
              author          = row.insertCell(0);
              title           = row.insertCell(1);
              publisher       = row.insertCell(2);
              year            = row.insertCell(3);
              author.innerHTML    = blob.author;
              title.innerHTML     = blob.title;
              publisher.innerHTML = blob.publisher;
              year.innerHTML      = blob.year;
            } else if (blob.format == "inproceedings") {
              row             = inproceedings.insertRow();
              author          = row.insertCell(0);
              title           = row.insertCell(1);
              booktitle       = row.insertCell(2);
              year            = row.insertCell(3);
              author.innerHTML    = blob.author;
              title.innerHTML     = blob.title;
              booktitle.innerHTML = blob.booktitle;
              year.innerHTML      = blob.year;
            }
          });
        });
      });
    });
  });

};
