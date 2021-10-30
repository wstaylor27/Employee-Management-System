SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", roles.title, department.department_name AS "department", roles.salary AS "salary"
FROM employee
LEFT JOIN roles
ON roles.id = employee.id
LEFT JOIN department
ON department.id = roles.department_id
ORDER BY employee.id;
