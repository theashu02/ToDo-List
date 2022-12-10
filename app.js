const express =  require ("express");
const bodyParser = require ("body-parser");
const ejs = require("ejs");
const { formatWithOptions } = require("util");
// const { application } = require("express");

const app = express();
let items =["Buy Food", "Cook Food", "Eat Food"];
let workItems =[];
app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    let today = new Date();
    
    let option = {
        weekend: "long",
        day: "numeric",
        month: "long"
    };
 
    let day = today.toLocaleDateString("en-US", option);
    
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
   let item = req.body.newItem;

   if(req.body.list === "Work"){
     workItems.push(item);
     res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    // console.log(item);
    
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req,res){
    res.render("about");
});

// app.get("/work", function(req,res){

//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.listen(3000, function(){
    console.log("server is running on port 3000");
});


  
// var currentDay = today.getDate();
//     var day = "";

//     switch (currentDay){
//         case 0:
//             day = "Sunday";
//             break;
//         case 1:
//             day = "Monday";
//             break;
//         case 2:
//             day = "Tuesday";
//             break;
//         case 3:
//             day = "Wednesday";
//             break;
//         case 4:
//             day = "Thusday";
//             break;
//         case 5:
//             day = "Friday";
//             break;
//         case 6:
//             day = "Saturday";
//             break;
//         //    default: 
//     }
//     if(currentDay==6 || currentDay==0){
//         // res.send("yey it's holyday");
//         day = "weekend";
//         // res.sendFile(__dirname + "/weekend.html");
//         // res.render("list", {kindOfDay: day});
//     }
//     else{
//         // res.send("it's working day");
//         day = "weekday";
//         // res.sendFile(__dirname + "/weekday.html");
//         // res.render("list", {kindOfDay: day});
//     }