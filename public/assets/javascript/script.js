//var moment = require("moment");

function getAllNotes() {
    $.get("/allNotes", function(data) {
        for (var i = 0; i < data.length; i++) {
            var cardDiv = $("<div class='card del'>");
            var cardBody = $("<div class='card-body'>");
            var title = $("<h5 class='card-title'>");
            var created = $("<h6 class='card-subtitle mb-2 text-muted'>");
            var para = $("<p class='card-text'>");
            var deleteBtn = $("<button type='submit' id='deleteBtn'>")
            var deleteIcon = $("<i class='fa fa-trash float-right'>");
            cardDiv.attr("data-id", data[i].id);
            deleteBtn.append(deleteIcon);
            cardDiv.append(deleteBtn);

            title.text(data[i].title);
            created.text(data[i].created_at); //put this is moment
            para.text(data[i].body);

            cardBody.append(title).append(created).append(para);
            cardDiv.append(cardBody);
            $("#savedNotes").prepend(cardDiv);
        }
    });
}

$("#savedNotes").on("click", "#deleteBtn", function () {
    console.log($(this).parents().eq(0).attr("data-id"));
    var id = $(this).parents().eq(0).attr("data-id");

    $.ajax("/notes/delete/" + id, {
        type: "DELETE"
    }).then(
        function (data) {
            console.log("deleted id ", id);
            // Reload the page to get the updated list
            //getAllNotes();
            if (data) {
                location.reload(true);
                getAllNotes();
            }
        }
    );
});

$("#submitBtn").on("click", function(e) {
    e.preventDefault();
    var newNote =
    {
        title: $("#noteTitle").val().trim(),
        body: $("#noteBody").val().trim()
    };

    $.post("/notes/add", newNote).then(function(data) {
        if (data) {
            console.log(data);
            alert("Added note!");
            $("#noteTitle").val('');
            $("#noteBody").val('');
            location.reload(true);
            getAllNotes();
        } else {
            console.log("")
        }
    })
});
getAllNotes();
