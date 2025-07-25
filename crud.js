const studentDb = require("./db/database.json"); // To access the Student database we created
const http = require("http"); // To access the http core module
const fs = require("fs"); // to access the File system core module
const PORT = 8080; // Assigned the port number that the server will listen to

const server = http.createServer((req, res) => { // Creates a server object
    const {url,method} = req; // Object destructuring for request to access only the URL and Method

    if (url === "/create-student" && method === "POST") { // This two conditions that must be met before it can get the request sent from the Postman app.
        let body = ""; // Assigned an empty string to body that will hold the chunks.

        req.on("data", (chunks) => { // This is the requested data coming from our Postman app
            console.log("i am chunks:", chunks) // At this point, the data is just a chunk of code only the computer understands seen on the terminal
            body += chunks // Concatenate the chunks with the empty string assigned earlier, so that we now have a normal JSON that can be understood  
             console.log("i am raw body:", body) // At this point, we would see the normal JSON on the terminal
        });

        req.on("end", () => {
            const data = JSON.parse(body); // Here, the JSON is converted to a Javascript Object which is assigned to the variable data
            const uuid = require("uuid").v4();
            const student = {
                id: uuid, // Creates a unique student id number for everytime on the studentDB array
                name: data.name, // Name is mapped to the new value/property paired with the key name in the JS Object
                gender: data.gender, // Gender is mapped to the new value paired with the key gender in the JS Object
                age: data.age, // Age is mapped to the new value paired with the key age in the JS Object
                isMarried: data.isMarried // isMarried is mapped to the new value paired with the key isMarried in the JS Object
            };

            studentDb.push(student); // This pushes or adds new element/student data into the created array(The student database)
            console.log(studentDb);
             fs.writeFile("./db/database.json", JSON.stringify(studentDb, null, 2), "utf8", (error, data) => { // This writes/adds up new information into the array created in the database with a pretty format
            if (error) {
                res.writeHead(400, {"content-type": "text/plain"}); // This sets the status code and response header if the error condition was met
                res.end("Bad request") // This sends the response and terminates the connection
            } else {
                res.writeHead(201, {"content-type": "application/json"}) // This sets the status code and response header immediately the condition is met
                res.end(JSON.stringify({ // This would terminate the connection after request has been sent
                    message: "Student Created Successfully", // The message displayed after the connection has been terminated 
                    data: student // The newly created data mapped to data is displayed too after the connection is terminated
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
    }
});

server.listen(PORT, () => { // Starts the server on the specified port number
    console.log("Server is running on Port:", PORT); // Dispalys on the terminal if server listens successfully to the port number
});

