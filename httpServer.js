import http from "http";
import fs from "fs";

const port = process.env.PORT || 8000;
const petRegExp = /^\/pets\/(.*)$/;

const server = http.createServer((req, res) => {
  // const matches = req.url.match(petReqExp);
  // if (matches && reg.method === 'GET'){
    //const id = matches[1]
//}

// if (id); res.end(JSON.stringify(data[id]))
  if (
    (req.method === "GET" && req.url === "/pets") ||
    /* OR */ req.url === "/pets/0" ||
    /* OR */ req.url[6] >= 0
  ) {
    fs.readFile("pets.json", "utf-8", (err, data) => {
      res.setHeader("content-type", "application/json");
      res.statusCode = 200;
      if (err) console.log(err.stack); // error catch

      let objNum = req.url[6];
      let petsJSON = "";
      let body = "";
     

      /////////////////////////////////////////////////////////////

      if (objNum === undefined ) {
        let pets = JSON.parse(data);
        petsJSON = JSON.stringify(pets);
      } else {
        objNum = req.url[6];
        let pets = JSON.parse(data);
        console.log(`The number of indexs is ${pets.length -1}`);
        console.log(`The index searched for is ${objNum}`);

        if ( objNum >= pets.length || objNum === NaN) {
          res.setHeader("content-type", "text/plain");
          res.statusCode = "404";
          return res.end("not found");
        } else {
          petsJSON = JSON.stringify(pets[req.url[6]]);
        }
        res.end(petsJSON);
      } 
    });

    console.log("is first in conditional");
  } 
});

server.listen(8000, () => {
  console.log("server started on port:", port);
});