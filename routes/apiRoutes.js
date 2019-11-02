module.exports = function (app, connection) {
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
        return notes;
    }

    function insertNoteToDB(title, body) {
        connection.query("INSERT INTO notes (title, body) values (?, ?)", [title, body], (err, res) => {
            if (err) res.send(500).end();
            else {
                console.log("added note to db");
            }
        });
        //connection.end();
    }

    function updateNote(title, body, id) {
        connection.query("update notes set title = ?, body = ? where id = ?", [title, body, id], (err, res) => {
            if (err) res.send(500).end();
            else {
                console.log("updated note to db");
            }
        });
    }

    app.get("/allNotes", (req, res) => {
        getNotesFromDB();
        return res.json(notes);
    });

    app.get("/notes/:id", (req, res) => {
        connection.query("Select * from notes where id = ?", [req.params.id], (err, result) => {
            if (err) res.status(500).end();
            res.json(result);
        });
    });

    app.put("/notes/edit/:id", (req, res) => {
        updateNote(req.body.title, req.body.body, req.params.id);
        res.send("updated");
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