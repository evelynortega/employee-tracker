DROP DATABASE IF EXISTS employee_db;
--  --
CREATE DATABASE employee_db;

--  --
USE employee_db;

--  --
CREATE TABLE  department(
  -- --
  id INT PRIMARY KEY auto_increment,
  -- --
  name VARCHAR(30) 
);

CREATE TABLE role(

  id INT PRIMARY KEY auto_increment,

  title VARCHAR (300),

  salary DECIMAL,

department_id INT,
foreign key (department_id)
references department(id)
);

CREATE TABLE employee(
    id INT PRIMARY KEY auto_increment,

    first_name VARCHAR (300),

    last_name VARCHAR (300),

    role_id INT,

    manager_id INT,

foreign key (role_id)
references role(id),

foreign key (manager_id)
references employee(id)
    
);
