const goodsDb = require("./db/dbGoods.json"); 
const http = require("http"); 
const fs = require("fs"); 
const PORT = 4040; 

// Create the goods into the database
const server = http.createServer((req, res) => { 
    const {url,method} = req; 

    if (url === "/create-goods" && method === "POST") {
        let body = ""; 

        req.on("data", (chunks) => {
            console.log("i am chunks:", chunks) 
            body += chunks 
             console.log("i am raw body:", body) 
        });

        req.on("end", () => {
            const data = JSON.parse(body); 
            const uuid = require("uuid").v4();
            const goods = {
                id: uuid, 
                name: data.name, 
                inStock: data.inStock, 
                unit: data.unit, 
                unitPrice: data.unitPrice,
                totalPrice: data.unit * data.unitPrice,
            };

            goodsDb.push(goods);
            console.log(goodsDb);
             fs.writeFile("./db/dbGoods.json", JSON.stringify(goodsDb, null, 2), "utf8", (error, data) => {
            if (error) {
                res.writeHead(400, {"content-type": "text/plain"}); 
                res.end("Bad request") 
            } else {
                res.writeHead(201, {"content-type": "application/json"}) 
                res.end(JSON.stringify({ 
                    message: "goods added Successfully", 
                    data: goods
                }))
            } 
          })
        });
    } 
    
    // Read the entered goods in the database
    else if(url.startsWith("/goods") && method === "GET") {
        if (goodsDb.length < 1) {
            res.writeHead(404, {"content-type": "text/plain"});
            res.end("No goods found")
        } else {
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify({
                message: "All goods below",
                total: goodsDb.length,
                data: goodsDb
            }))
        }
    }

    // To find a particular good using the Unique ID Code
    else if (url.startsWith("/getgoods") && method === "GET"){
        const id = url.split("/")[2];
        const goods = goodsDb.find((e) => e.id === id);
        if (!goods) {
        res.writeHead(404, {"content-type": "text/plain"})
        res.end("Goods not found");
    } else  {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({
            message: "Goods below",
            data: goods
        }))
    }
} 

    // Update the details of the goods in the database with it's unique ID 
    else if (url.startsWith("/update-goods") && method === "PATCH"){
        let body = "";
        req.on("data", (chunks) => {
            body += chunks;
        });

        req.on("end", () => {
            const update = JSON.parse(body);
            console.log(update);
            
            const id = url.split("/")[2];
            const goods = goodsDb.find((f) => f.id === id);
            Object.assign(goods, update);
            const index = goodsDb.findIndex((e) => e.id === goods.id);

            if (index !== -1) {
                goodsDb[index] = goods
            };
            fs.writeFile("./db/dbGoods.json", JSON.stringify(goodsDb, null, 2), "utf8", (error, data) => {
                if (error) {
                    res.writeHead(500, {"content-type": "text/plain"})
                    res.end("Error updating goods");
                } else {
                    res.writeHead(200, {"content-type": "application/json"});
                    res.end(JSON.stringify({
                        message: "Goods updated successfully",
                        data: goods
                    }))
                }
            })
        })
    }

    // To delete goods from database
        else if (url.startsWith("/delete-goods") && method === "DELETE") {
            const id = url.split("/")[2];
            const result = goodsDb.filter((e) => e.id !== id);

            fs.writeFile("./db/dbGoods.json", JSON.stringify(result, null, 2), "utf-8", (error, data) => {
                if (error) {
                    res.writeHead(500, {"content-type": "text/plain"});
                    res.end("Error deleting goods");
                } else {
                    res.writeHead(200, {"content-type": "application/json"});
                    res.end(JSON.stringify({
                        message: "Goods deleted succesfully"
                    }))
                }
            })
    }
});

server.listen(PORT, () => {
    console.log("Server is running on Port:", PORT); 
});

