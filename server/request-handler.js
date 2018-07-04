var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

const options = {
  'GET': {},
  'POST': {} 
};

var example = {
  username: 'David',
  text: 'test server'
};

var body = [];
//var counter = 0;


var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  if (request.method === 'GET') {
    // set status code
    statusCode = 200;
    // initialize header stuff
    var headers = defaultCorsHeaders;
    // make sure to change content-type to application/json
    headers['Content-Type'] = 'application/json';
    response.writeHead(statusCode, headers);
    // create an object with the results array
    let dataObj = { results: [example] };
    // access the data
    if (body.length > 0) {
    // stringify the data into a results array on an object
      for (let item of body) {
        dataObj.results.push(item);
      }
    }
    // send that stringified object back to the client
    // do this with .end not .write
    response.end(JSON.stringify(dataObj));
  } else if (request.method === 'POST') {
    statusCode = 201;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    response.writeHead(statusCode, headers);
    var requestBody = '';
    // write (with end) the data onto the server (should show up on the server page)
    request.on('data', function(data) {
      requestBody += data;
    });
    request.on('end', function() {
      //counter++;
      //requestBody.objectId = counter;
      body.push(JSON.parse(requestBody));
      response.end();
    });
  } else if (request.method === 'OPTIONS') {
    statusCode = 200;
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(options));
  } else {
    statusCode = 404;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'text/plain';
    response.writeHead(statusCode, headers);
    response.end();
  }
  // statusCode = 200;
  // initialize header stuff
  var headers = defaultCorsHeaders;
  // make sure to change content-type to application/json
  headers['Content-Type'] = 'application/json';
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(example));
};


exports.requestHandler = requestHandler;

