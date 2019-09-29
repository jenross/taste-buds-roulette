var db = require("../models");
db.User.hasMany(db.Bud, {as: 'Buds', foreignKey: 'userId'});
db.Bud.belongsTo(db.User, {as: 'Users', foreignKey: 'userId' });
module.exports = function(app) {
 // Get all Users
 app.get("/api/user", function(req, res) {
   db.User.findAll({ include: [{ model: db.Bud, as: 'Buds'}]})
 .then(function(data) {
     console.log(data);
     res.json(data);
   });
 });
 // Get user according to id
 app.get("/api/user/:id", function(req, res) {
   console.log(req.params.id)
   db.User.findOne({
     where: {
       id: req.params.id
     },
     include: [{ model: db.Bud, as: 'Buds'}]
   }).then(function(dbUser) {
     res.json(dbUser)
   });
 });
 // Create a new User
 app.post("/api/user", function(req, res) {
   db.User.create(req.body).then(function(userData) {
     console.log("userData: " + userData);
     res.json(userData);
   });
 });


 app.post("/api/bud/:userid", function(req, res) {
   db.Bud.create({
     name: req.body.name,
     email: req.body.email,
     userId: req.params.userid
   }).then(function(userData) {
     console.log("userData: " + userData);
     res.json(userData);
   }).catch(err => {
    console.log(err)
   });
 });

 //Update User (Generally to add buds)
 app.put(("/api/user/:id"), function(req,res) {
   db.User.update(req.body,
     {
       where: {
         id: req.body.id
       }
     }).then(function(tasteBudsDB) {
       res.json(tasteBudsDB);
     });
 });
 // Delete an User by id
 app.delete("/api/user/:id", function(req, res) {
   db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
     res.json(dbUser);
   });
 });
// Delete Bud by Id
 app.delete("/api/bud/:id", function(req, res) {
   console.log(req, "deleted")
  db.Bud.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
    res.json(dbUser);
  });
});
};