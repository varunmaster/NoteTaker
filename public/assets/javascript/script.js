function getAllNotes() {
    $.get("/allNotes", function (data) {
        for (var i = 0; i < data.length; i++) {
            var cardDiv = $("<div class='card del'>");
            var cardBody = $("<div class='card-body'>");
            var title = $("<h5 class='card-title'>");
            var created = $("<h6 class='card-subtitle mb-2 text-muted'>");
            var para = $("<p class='card-text'>");
            //var deleteBtn = $("<button type='submit' id='deleteBtn'>")
            var deleteIcon = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");
            var editBtn = $("<button type='submit' id='editBtn'>")
            var editIcon = $("<i class='fas fa-pen float-right text-danger edit-note'>");
            cardDiv.attr("data-id", data[i].id);
            //deleteBtn.append(deleteIcon);
            //cardDiv.append(deleteBtn);
            //cardDiv.append(deleteIcon);

            title.text(data[i].title);
            var momentCreated = moment(data[i].created_at).format("MM/DD/YYYY hh:mm A");
            created.text(momentCreated); //put this is moment
            para.text(data[i].body);

            cardBody.append(title, deleteIcon, editIcon).append(created).append(para);
            cardDiv.append(cardBody);
            $("#savedNotes").prepend(cardDiv);
        }
    });
}

$("#savedNotes").on("click", ".delete-note", function () {
    console.log($(this).parents().eq(1).attr("data-id"));
    var id = $(this).parents().eq(1).attr("data-id");

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

$("#savedNotes").on("click", ".edit-note", function () {
    $("#updateBtn").show();
    $("#submitBtn").hide();
    var id = $(this).parents().eq(1).attr("data-id");
    $("#updateBtn").attr("data-id", id);

    $.get("/notes/" + id, function (data) {
        if (data) {
            $("#noteTitle").val(data[0].title);
            $("#noteBody").val(data[0].body);
        }
    });
});

$("#submitBtn").on("click", function (e) {
    e.preventDefault();
    var newNote =
    {
        title: $("#noteTitle").val().trim(),
        body: $("#noteBody").val().trim()
    };

    if (newNote.title !== "") {
        $.post("/notes/add", newNote).then(function (data) {
            if (data) {
                console.log(data);
                alert("Added note!");
                $("#noteTitle").val('');
                $("#noteBody").val('');
                location.reload(true);
                getAllNotes();
            }
        });
    } else {
        alert("Cannot submit empty note! Please write a note.");
    }
});

$("#updateBtn").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    console.log(id);
    var updateNote = {
        title: $("#noteTitle").val().trim(),
        body: $("#noteBody").val().trim()
    };
    console.log(updateNote);

    if (updateNote.title !== "") {
        $.ajax("/notes/edit/" + id, {
            type: "PUT",
            data: updateNote
        }).then(function (data) {
            if (data) {
                console.log("updated note");
                alert("Updated note!");
                location.reload(true);
            }
        });
    } else {
        alert("Nothing to update! Please select a note to update first.");
    }
    getAllNotes();
});

getAllNotes();
$("#updateBtn").hide();
$("#submitBtn").show();
$("#noteTitle").val('');
$("#noteBody").val('');
