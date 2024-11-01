-- Создание таблицы posts
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных в таблицу posts
INSERT INTO posts (title, content) VALUES 
('1', 'Это содержание первого поста.'),
('2', 'Это содержание второго поста.'),
('3', 'Это содержание третьего поста.');
