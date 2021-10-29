SELECT department.department_name AS department, roles.title
FROM roles
LEFT JOIN department
ON roles.department_id = department.id
ORDER BY department.department_name;
