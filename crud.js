const studentDb = require("./db/database.json"); 
const http = require("http"); 
const fs = require("fs"); 
const PORT = 8080; 

const server = http.createServer((req, res) => { 
    const {url,method} = req; 

    if (url === "/create-student" && method === "POST") {
        let body = ""; 

        req.on("data", (chunks) => {
            console.log("i am chunks:", chunks) 
            body += chunks 
             console.log("i am raw body:", body) 
        });

        req.on("end", () => {
            const data = JSON.parse(body); 
            const uuid = require("uuid").v4();
            const student = {
                id: uuid, 
                name: data.name, 
                gender: data.gender, 
                age: data.age, 
                isMarried: data.isMarried
            };

            studentDb.push(student);
            console.log(studentDb);
             fs.writeFile("./db/database.json", JSON.stringify(studentDb, null, 2), "utf8", (error, data) => {
            if (error) {
                res.writeHead(400, {"content-type": "text/plain"}); 
                res.end("Bad request") 
            } else {
                res.writeHead(201, {"content-type": "application/json"}) 
                res.end(JSON.stringify({ 
                    message: "Student Created Successfully", 
                    data: student
                }))
            } 
          })
        });
    } 

    else if(url.startsWith("/students") && method === "GET") {
        if (studentDb.length < 1) {
            res.writeHead(404, {"content-type": "text/plain"});
            res.end("No student found")
        } else {
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify({
                message: "All students below",
                total: studentDb.length,
                data: studentDb
            }))
        }
    }
    else if (url.startsWith("/student") && method === "GET"){
        const id = url.split("/")[2];
        const student = studentDb.find((e) => e.id === id);
        if (!student) {
        res.writeHead(404, {"content-type": "text/plain"})
        res.end("Student not found");
    } else  {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({
            message: "Student below",
            data: student
        }))
    }
} 
    else if (url.startsWith("/update-student") && method === "PATCH"){
        let body = "";
        req.on("data", (chunks) => {
            body += chunks;
        });

        req.on("end", () => {
            const update = JSON.parse(body);
            console.log(update);
            
            const id = url.split("/")[2];
            const student = studentDb.find((f) => f.id === id);
            Object.assign(student, update);
            const index = studentDb.findIndex((e) => e.id === id);

            if (index !== -1) {
                studentDb[index] = student
            };
            fs.writeFile("./db/database.json", JSON.stringify(studentDb, null, 2), "utf8", (error, data) => {
                if (error) {
                    res.writeHead(500, {"content-type": "text/plain"})
                    res.end("Error updating student");
                } else {
                    res.writeHead(200, {"content-type": "application/json"});
                    res.end(JSON.stringify({
                        message: "Student updated successfully",
                        data: student
                    }))
                }
            })
        })
        // To delete a student
    } else if (url.startsWith("/delete-students") && method === "DELETE") {
        const id = url.split('/')[2];
        const student = studentDb.find((e) => e.id === id)
        const index = studentDb.findIndex((f) => f.id === student.id);
        if (!student){
            res.writeHead(404, {"content-type": "text/plain"})
            res.end("Student not found");
        }
        studentDb.splice(index, 1)
        fs.writeFile("/.db/database.json", JSON.stringify(studentDb, null, 2), "utf-8", (error, data) => {
            if (error){
                res.writeHead(500, {"content-type": "text/plain"})
                res.end("Error! Couldn't delete a student")
            } else {
                res.writeHead(200, {"content-type": "text/plain"})
                res.end("Student succesfully deleted")
            }
        })
    }
     
});

server.listen(PORT, () => { // Starts the server on the specified port number
    console.log("Server is running on Port:", PORT); // Dispalys on the terminal if server listens successfully to the port number
});

