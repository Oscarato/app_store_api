module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    // Create a new Customer
    app.post("/login", auth.login);
  
    // Retrieve all auth
    // app.get("/auth", auth.findAll);
    
  };    