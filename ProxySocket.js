var net = require('net');
var fs = require('fs');
var config = require('./GOTAConfig.json');

/*
// First consider commandline arguments and environment variables, respectively.
nconf.argv().env();

// Then load configuration from a designated file.
nconf.file({ file: 'GOTAConfig.json' });

// Provide default values for settings not provided above.
nconf.defaults({
    'http': {
        'port': 1337
    }
});

// Once this is in place, you can just use nconf.get to get your settings.
// So this would configure `myApp` to listen on port 1337 if the port
// has not been overridden by any of the three configuration inputs
// mentioned above.
//myApp.listen(nconf.get('http:port'));

var CARPETA = nconf.get('CARPETA');
var PUERTO  = nconf.get('PUERTO');
var IP      = nconf.get('IP');
*/


var CARPETA = config.carpeta;
var PUERTO  = config.puerto;
var IP      = config.ip;


  console.log('Server en: '+IP+':'+PUERTO+'\r\n');


/*
var CARPETA = 'C:/Users/greusr/Desktop/';
var PUERTO  = 2202;
var IP      = '127.0.0.1';
*/



var server = net.createServer(function(socket) {

  var datos ="";
  console.log('Server en: '+IP+':'+PUERTO+'\r\n');
	//socket.write('Server en: '+IP+':'+PUERTO+'\r\n');
	//socket.pipe(socket);
  socket.setEncoding('utf8');

  socket.on('connect',function(){
    datos = "";
  });
  socket.on('data', function (data) {
        console.log(data.toString());
        datos = datos + data;
    });
  socket.on('end',function(){
     var fichero  = CARPETA+getTimeStamp()+".txt";
      console.log("Datos recibidos: "+datos+ " en el fichero: "+fichero);
      fs.writeFile(fichero, datos, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
      datos = "";
  });

});

server.listen(PUERTO, IP);

function getTimeStamp(){
  var timeStamp = new Date().getTime();
  return timeStamp;
}
