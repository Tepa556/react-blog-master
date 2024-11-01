const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    db.run(sql, [title, content], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.run(sql, id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});