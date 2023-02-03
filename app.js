const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    const query=req.body.cityName;
    const apiKey="3b10a5ef49624e9e85a584e93bec5940";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey +"&units="+unit;

    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            const maxi=weatherData.main.temp_max;
            const mini=weatherData.main.temp_min;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            // const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // const imageURL="http://openweathermap.org/img/wn/10d@2x.png";
            res.write("<p>The weather is curretly " + weatherDescription +"<p>");
            res.write(`<h1>The temperature in ${query}  is ${temp}degree Celcius</h1>`);
            res.write("<p>The maximum temperature of "+query+" is "+maxi+"<p>");
            res.write("<p>The maximum temperature of "+query+" is "+mini+"<p>");
            // res.write("<img scr="+ imageURL +">");
            res.send()
        })
    });
});
app.listen(3000,function(){
    console.log("server is running at port 3000");
});

