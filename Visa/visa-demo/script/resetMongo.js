
const collections = [
    "ABC_CUSTOMERS",
    "NZ_CUSTOMERS",
    "ABC_INTERNATIONAL",
    "NZ_INTERNATIONAL",
    "ABC_PAYMENT",
    "NZ_PAYMENT",
    "ABC_NOTIFICATION",
    "NZ_NOTIFICATION"
]
const mongooseconnection = require("mongoose");
mongooseconnection.connect("mongodb://127.0.0.1:27017/visa_payment", {
    useNewUrlParser: true
});
const connection = mongooseconnection.connection;
connection.once("open", function() {
  console.log("MongoDB connected successfully");
  connection.db.listCollections().toArray(function(err, names) {
      if (err) {
          console.log(err);
      } else {
          for (i = 0; i < names.length; i++) {
              console.log(names[i].name);
              if (collections.indexOf((names[i].name )>-1)) {
                  console.log(`${names[i].name} Collection Exists in DB`);
                  mongooseconnection.connection.db.dropCollection(
                      names[i].name,
                      function(err, result) {
                          console.log("Collection droped");
                      }
                  );
                  console.log(` ${names[i].name} Collection No Longer Available`);
              } else {
                  console.log("Collection doesn't exist");
              }
          }
      }
  });
});