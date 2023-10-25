-- Inserting the user
INSERT INTO users (username, password, enabled) VALUES ('manager', 'password123', 1);

-- Assuming ROLE_MANAGER doesn't exist yet, inserting the role
INSERT INTO roles (name) VALUES ('ROLE_MANAGER');

-- Associating the user with the role
INSERT INTO user_roles (user_id, role_id)
VALUES (
    (SELECT id FROM users WHERE username = 'manager'),
    (SELECT id FROM roles WHERE name = 'ROLE_MANAGER')
);
