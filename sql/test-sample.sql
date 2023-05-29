# Feature 1:
SELECT *
FROM Movie
WHERE name LIKE "%The Lord of the Rings%";

# Feature 2:
SELECT name
FROM Movie
WHERE avg_rate > 9.0;

# Feature 3:
SELECT name
FROM Movie
ORDER BY (avg_rate) ASC;

# Feature 4:
SELECT name
FROM (SELECT name, RANK() OVER (ORDER BY (avg_rate) DESC) as r FROM Movie) as T
WHERE r <= 3;

# Feature 5:
INSERT INTO Reviewer (username, num_of_ratings) VALUES ('cs348', 0);
INSERT INTO Rating VALUES (1, 0111161, 9.0, "I love.");
SELECT * FROM Rating;

# Feature 6:
UPDATE Rating
SET
	rate = 4.0,
	comment = "Boring"
WHERE mid = 0111161 and rid = (SELECT id FROM Reviewer WHERE username = 'cs348');
SELECT * FROM Rating;

