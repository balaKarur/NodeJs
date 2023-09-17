const { log } = require('console');
const fs = require("fs");
//export const routes = (req,res) =>{
const routes = (req,res) =>{
        log("Server running");
        log("Page before send form server");
        log(req.url);
        log(req.method);
        if(req.url === "/"){
            log("Page sends form server...");
            return setHomePage(req,res);
        }
        if(req.url == "/saveuser" && req.method.toLowerCase() == "post"){
            return submitUser(req,res);
        }
    }

function submitUser(req,res){
    res.setHeader("Content-Type","text/html");
   // return res.end("<div>User Saved</div>");
   const body = [];
   req.on("data",(data) => {
       log(data)
       body.push(data);
   });
   req.on("end",() => {
       log("body"+ body)
       const requestBody = Buffer.concat(body).toString();
       log("requestBody : "+ requestBody);
       const userName = requestBody.split("=")[1];
       log("userName : "+userName);
       //fs.writeFileSync("UserDeatils.txt",userName(){}
       //Non blocking code...
       fs.writeFile("UserDeatils.txt",userName,() => {
           res.statusCode = 302;
           res.setHeader("Location","/");
           return res.end("<div>User Saved</div>")
       });
       
   })
   // res.statusCode = 302;
   // res.setHeader("Location","/");
   // return res.end("<div>User Saved</div>")

}
function setHomePage(req,res){
   
   res.setHeader("Content-Type","text/html");
   // res.write("<html>");
   // res.write("<body>This Page from server");
   // res.write("</body>");
   // return  res.end("</html>");
   return res.end(`<html>
     <body>
     <form action="/saveuser" method="post">
     <div><label>Enter Name : </label><input type="text" name="username" />
     <div><input type="submit" value="Save"></input></div>
     </form>
     `);
   
}
module.exports =routes;