module.exports = function (app) {
    var notes = "";
    function getNotesFromDB() {
        connection.query("Select * from notes;", (err, res) => {
            if (err) console.log("Error reply from DB: ", err);
            else {
                // console.log(res);
                notes = res;
            }
        });
        //connection.end();
        return;
    }

    function insertNoteToDB(title, body) {
        connection.query("INSERT INTO notes (title, body) values (?, ?)", [title, body], (err, res) => {
            if (err) console.log("err writing to DB: ", err);
            else {
                console.log("added note to db");
            }
        });
        //connection.end();
    }

    app.get("/allNotes", (req, res) => {
        getNotesFromDB();
        return res.json(notes);
    });

    app.delete("/notes/delete/:id", (req, res) => {
        connection.query("DELETE FROM notes WHERE id = ?", [req.params.id], (err, result) => {
            if (err) {
                // If an error occurred, send a generic server failure
                return res.status(500).end();
            }
            else if (result.affectedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.send(req.params.id);
            //res.status(200).end();
        });
    });

    app.post("/notes/add", (req, res) => {
        var newNote = req.body;
        console.log("server.js >><< New Note: ", newNote);

        insertNoteToDB(newNote.title, newNote.body);
        res.send(newNote);
        //res.redirect("/allNotes");
    });
};