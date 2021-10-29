const Employee = require('./Employee');
const Location = require('./Location');
const Trip = require('./Trip');

Employee.belongsToMany(Department, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'planned_trips'
});

Location.belongsToMany(Employee, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'location_employee'
});

module.exports = { Employee, Location, Trip };
