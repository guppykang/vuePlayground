let serverURL; 


if(process.env.env === "dev") {
    serverURL = "http://localhost:3030"
}
module.exports = {
    serverURL
}