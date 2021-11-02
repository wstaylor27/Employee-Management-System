INSERT INTO department (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Legal"),
        ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 4),
        ("Accountant", 125000, 4),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Chris", "Dunson", 1, null),
        ("Kelson", "Hemphill", 2, 1),
        ("Dane", "Stubblefield", 3, null),
        ("Wesley", "Taylor", 4, 3),
        ("Kendra", "Phifer", 5, null),
        ("Sherry", "Taylor", 6, 5),
        ("Jessica", "Plummer", 7, null),
        ("Aaron", "White", 8, 7);