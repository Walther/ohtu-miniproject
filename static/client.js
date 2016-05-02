window.onload = function(){

  var articles      = document.getElementById("articles");
  var books         = document.getElementById("books");
  var inproceedings = document.getElementById("inproceedings");
  var incollections = document.getElementById("incollections");
  var inbooks       = document.getElementById("inbooks");
  var mastertheses  = document.getElementById("mastertheses");
  var phdtheses     = document.getElementById("phdtheses");
  var techreports   = document.getElementById("techreports");
  var conferences   = document.getElementById("conferences");
  var unpublisheds  = document.getElementById("unpublisheds");
  var proceedings   = document.getElementById("proceedings");
  var booklets      = document.getElementById("booklets");
  var manuals       = document.getElementById("manuals");
  var miscs         = document.getElementById("misc");

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
            var row, author, title, journal,volume,pages,year,publisher,booktitle,tags;
            // If article
            if (blob.format         == "article") {
              row                   = articles.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              journal               = row.insertCell(2);
              volume                = row.insertCell(3);
              year                  = row.insertCell(4);
              pages                 = row.insertCell(5);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              journal.innerHTML     = blob.journal;
              volume.innerHTML      = blob.volume;
              year.innerHTML        = blob.year;
              pages.innerHTML       = blob.pages;
            } else if (blob.format  == "book") {
              row                   = books.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              publisher             = row.insertCell(2);
              year                  = row.insertCell(3);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              publisher.innerHTML   = blob.publisher;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "inproceedings") {
              row                   = inproceedings.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              booktitle             = row.insertCell(2);
              year                  = row.insertCell(3);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              booktitle.innerHTML   = blob.booktitle;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "incollection") {
              row                   = incollections.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              booktitle             = row.insertCell(2);
              publisher             = row.insertCell(3);
              year                  = row.insertCell(4);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              booktitle.innerHTML   = blob.booktitle;
              publisher.innerHTML   = blob.publisher;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "inbook") {
              row                   = inbooks.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              pages                 = row.insertCell(2);
              publisher             = row.insertCell(3);
              year                  = row.insertCell(4);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              pages.innerHTML 	    = blob.pages;
              publisher.innerHTML   = blob.publisher;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "masterthesis") {
              row                   = mastertheses.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              school 	              = row.insertCell(2);
              year                  = row.insertCell(3);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              school.innerHTML 	    = blob.school;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "phdthesis") {
              row                   = phdtheses.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              school 	              = row.insertCell(2);
              year                  = row.insertCell(3);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              school.innerHTML 	    = blob.school;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "techreport") {
              row                   = techreports.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              institution           = row.insertCell(2);
              year                  = row.insertCell(3);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              institution.innerHTML = blob.school;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "conference") {
              row                   = conferences.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              booktitle             = row.insertCell(2);
              year                  = row.insertCell(3);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              booktitle.innerHTML   = blob.booktitle;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "unpublished") {
              row                   = unpublisheds.insertRow();
              author                = row.insertCell(0);
              title                 = row.insertCell(1);
              note 		              = row.insertCell(2);
              author.innerHTML      = blob.author;
              title.innerHTML       = blob.title;
              note.innerHTML 	      = blob.note;
            } else if (blob.format  == "proceedings") {
              row                   = proceedings.insertRow();
              title                 = row.insertCell(0);
              year                  = row.insertCell(1);
              title.innerHTML       = blob.title;
              year.innerHTML        = blob.year;
            } else if (blob.format  == "booklet") {
              row                   = booklets.insertRow();
              title                 = row.insertCell(0);
              title.innerHTML       = blob.title;
            } else if (blob.format  == "manual") {
              row                   = manuals.insertRow();
              title                 = row.insertCell(0);
              title.innerHTML       = blob.title;
            } else if (blob.format  == "misc") {
              row                   = miscs.insertRow();
            }
            tags                    = row.insertCell();
            tags.innerHTML          = blob.tags;
            buttons                 = row.insertCell();
            buttons.innerHTML       = "<button class='btn btn-default btn-sm'>Edit</button>"
          });
        });
      });
    });
  });

};
