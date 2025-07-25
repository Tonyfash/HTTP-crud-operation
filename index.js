 const fileSystem = require("fs");

//for  creating a file
const createFile = fileSystem.writeFile("./tony.js", "'I am a Child of God'", "utf-8", (err)=>{
    if(err){
        console.log(err);
    }
})

const createFile2 = fileSystem.writeFile("../tony.txt", "'I am a Child of God'", "utf-8", (err)=>{
    if(err){
        console.log(err);
    }
})

//add more content to a file
// const data = "\n Chisom is not looking confused again, Why?. Maybe she is now paying attention."
// const editFile = fileSystem.appendFile("../tony.txt",data,"utf8", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Operation succesful");
//     }
// })
// rename a file
// fileSystem.rename("../tony.txt", "../curve.txt", (err)=>{
//     if (err){
//         console.log(err.message)
//     } else {
//         console.log("Rename operation is 200")
//     }
// })

//  to delete a file
//  fileSystem.unlink("../tony.txt",(err)=>{
//     if(err){
//         console.log(err.message);
//     } else {
//         console.log("Operation OK");
//     }
// })

// to  read a file
//  fileSystem.readFile("../curve.txt","utf8", (err,data)=>{
//     if (err){
//         console.log(err.message);
//     } else {
//         console.log("Operation Succesful", data)
//     }
//  })

// to copy a file to another file
// fileSystem.copyFile("./index.js", "./felix.js", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("file has been copied")
//     }
// })

const os = require("os")

let totalMemory = os.totalmem();
let mem = Math.ceil(totalMemory/(1024*1024*1024));

let date = new Date();
let todayDate = date.getDate();
let todayMonth = date.getMonth();
let todayYear = date.getFullYear();
let todayHrs = date.getHours();
let todayMins = date.getMinutes();
let todaySecs = date.getSeconds();

const systemInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: mem,
    CPU: os.cpus(),
    upTime: os.uptime(),

}

const fullInfo = `System Information \n =================== \n Platform: ${systemInfo.platform} \n Architecture: ${systemInfo.architecture} \n Total Memory: ${systemInfo.totalMemory}.00 GB \n CPU: ${systemInfo.CPU[0].model} \n Uptime: ${systemInfo.upTime} seconds \n \n Checked at: ${todayYear}-${todayMonth}-${todayDate}  ${todayHrs}:${todayMins}:${todaySecs}AM`

fileSystem.writeFile("./tonyfash04/system-info1.txt", fullInfo, "utf8", (err)=>{
    if (err) {
        console.log(err.message)
    } else {
        console.log("File created")
    }
})

// console.log(totalMemory);

//Create Folder
// fileSystem.mkdir("./tonyfash04", (err)=>{
//     if (err){
//         console.log(err.message)
//     } else {
//         console.log("Folder created")
//     }
// })

// create a file
// fileSystem.writeFile("./tonyfash04/system-info.txt", "System Information", "utf8", (err)=>{
//     if (err) {
//         console.log(err.message)
//     } else {
//         console.log("File created")
//     }
// })
// // // Add info to file
//  fileSystem.appendFile("./tonyfash04/system-info.txt", `\n Platform: ${systemInfo.operatingSystem}`,"utf8", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Operation succesful");
//     }
// })

// fileSystem.appendFile("./tonyfash04/system-info.txt", `\n Architecture: ${systemInfo.architecture}`,"utf8", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Operation succesful");
//     }
// })

// fileSystem.appendFile("./tonyfash04/system-info.txt", `\n Total Memory: ${systemInfo.totalMemory}.00 GB`,"utf8", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Operation succesful");
//     }
// })

// fileSystem.appendFile("./tonyfash04/system-info.txt", `\n CPU: ${systemInfo.CPU[0].model} `,"utf8", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Operation succesful");
//     }
// })

// fileSystem.appendFile("./tonyfash04/system-info.txt", `\n Uptime: ${systemInfo.upTime} seconds`,"utf8", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Operation succesful");
//     }
// })

// fileSystem.appendFile("./tonyfash04/system-info.txt", `\n Checked at: ${todayYear}-${todayMonth}-${todayDate}  ${todayHrs}:${todayMins}:${todaySecs}`,"utf8", (err)=>{
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Operation succesful");
//     }
// })

// Renaming the file
// fileSystem.rename("./tonyfash04/system-info.txt", "./tonyfash04/summary.txt", (err)=>{
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log("Rename Succesful");
//     }
// })

// Reading a file
// fileSystem.readFile("./tonyfash04/summary.txt", "utf8", (err, data)=>{
//     if (err){
//         console.log(err.message);
//     } else {
//         console.log("File read", data);
//     }
// })

// fileSystem.readFile("./package.json", "utf8", (err, data)=>{
//     if (err){
//         console.log(err.message)
//     } else {
//         console.log("File read", data)
//     }
// })

// To copy a file
// fileSystem.copyFile("./tonyfash04/summary.txt","./tonyfash04/backup.txt", (err)=>{
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log("File copied")
//     }
// })

// To delete a file
// fileSystem.unlink("./tonyfash04/summary.txt", (err)=>{
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log("File deleted");
//     }
// })