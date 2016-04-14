window.onload = function(){

  var citations = document.getElementById("citations");

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
            var row = citations.insertRow();
            var author = row.insertCell(0);
            var title = row.insertCell(1);
            var journal = row.insertCell(2);
            var volume = row.insertCell(3);
            var year = row.insertCell(4);
            var pages = row.insertCell(5);
            author.innerHTML = blob.author;
            title.innerHTML = blob.title;
            journal.innerHTML = blob.journal;
            volume.innerHTML = blob.volume;
            year.innerHTML = blob.year;
            pages.innerHTML = blob.pages;
          })
        })
      })
    });
  })

}
