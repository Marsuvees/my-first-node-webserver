const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id : 0,
        name : 'Nikola Tesla',
    },
    {
        id : 1,
        name : 'Gabrielle Michaelson' 
    },
    {
        id : 2,
        name : 'Mark Greyson'
    }
]

server.on('request', function(req,res){
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends'){
        req.on('data',function(data){
            const friend = data.toString();
            console.log('Request:', data);
            friends.push(JSON.parse(friend));
        })
        req.pipe(res);
    }else if (req.method === 'GET' && items[1] ===  'friends'){
    // res.writeHead(200, {
    //     'Content-Type':'application/json',
    // });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if (items.length === 3){
            const friendIndex = +items[2];
            res.end(JSON.stringify(friends[friendIndex]))
        }else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Jed</li>');
        res.write('<li>Is this stuff working?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html');
        res.end();
    }else{
        res.statusCode = 404;
        res.end();
    }
})



server.listen(PORT, function(){
    console.log(`Listening on port ${PORT}...`)
}); //127.0.0.1 => localhost