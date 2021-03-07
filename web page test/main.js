var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    if(_url == '/'){
        title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`../data/${queryData.id}`,'utf8', function(err, data){
        var description = data;
        var template = `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Web page test - ${title}</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .ht{
                font-size: 25px;
                color: coral;
            }
            #ml{
                color: cornflowerblue;
            }
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="colors.js"></script>
    </head>
    <body>
        <h1><a href="/">Web-1</a></h1>
        <div id="grid">
            <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
            <li><a href="/?id=Background-color">background-color</a></li>
            <li><a href="/?id=Loof & Array">Loof & Array</a></li>
            <li><a href="/?id=Random">random</a></li>
            <li><a href="/?id=Object">Object</a></li>   
            </ul>
        <div id="article">
        <h2>${title}</h2>
        <p>${description}</p>
        </div>
        </div>
        <input type="button" value="night" onclick="nightDayHandler(this);">
        <p>
            <!--Start of Tawk.to Script-->
    <script type="text/javascript">
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5fb7536ba1d54c18d8eb808b/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        </script>
        <!--End of Tawk.to Script-->
        </p>
    </body>
    </html>
        `;
        response.end(template);
    })
   
    
});
app.listen(3000);