INSERT INTO department (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Legal"),
        ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, "Sales")
        ("Salesperson", 80000, "Sales")
        ("Lead Engineer", 150000, "Engineering")
        ("Software Engineer", 120000, "Engineering")
        ("Account Manager", 160000, "Finance")
        ("Accountant", 125000, "Finance")
        ("Legal Team Lead", 250000, "Legal")
        ("Lawyer", 190000, "Legal");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Chris", "Dunson", 1, null),
        ("Kelson", "Hemphill", 2, 1),
        ("Dane", "Stubblefield", 3, null),
        ("Wesley", "Taylor", 4, 3),
        ("Kendra", "Phifer", 5, null),
        ("Sherry", "Taylor", 6, 5),
        ("Jessica", "Plummer", 7, null),
        ("Aaron", "White", 8, 7);