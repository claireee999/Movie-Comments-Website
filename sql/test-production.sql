# Feature 1:
SELECT *
FROM Movie
WHERE name LIKE "%The Lord of the Rings%";

# Feature 2:
SELECT name
FROM Movie
WHERE avg_rate < 8.5
LIMIT 10;

# Feature 3:
SELECT name
FROM Movie
ORDER BY (avg_rate) DESC
LIMIT 10;

# Feature 4:
SELECT name
FROM (SELECT name, RANK() OVER (ORDER BY (avg_rate) DESC) as r FROM Movie) as T
WHERE r <= 10;

# Feature 5:
INSERT INTO Reviewer (username, pass_word, num_of_ratings) VALUES ('john', 'password123', 0);
INSERT INTO Rating VALUES (1, 0111161, 9.0, "I love.");
INSERT INTO Reviewer (username, pass_word, num_of_ratings) VALUES ('jane', 'password456', 0);
INSERT INTO Rating VALUES (2, 0111161, 9.3, "I love 2.");
SELECT * FROM Rating;

# Feature 6:
UPDATE Rating
SET
	rate = 4.0,
	comment = "Boring"
WHERE mid = 0111161 and rid = (SELECT id FROM Reviewer WHERE username = 'jane');
UPDATE Rating
SET
	rate = 9.8,
	comment = "Super love"
WHERE mid = 0111161 and rid = (SELECT id FROM Reviewer WHERE username = 'john');
SELECT * FROM Rating;


