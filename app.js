
var express = require('express')
    , routes = require('./routes');

Object.defineProperty( Object.prototype, "extend", {
    enumerable: false,
    value: function( from ){
        var props = Object.getOwnPropertyNames( from );
        var dest = this;
        props.forEach( function( name ){
            if( name in dest ){
                var destination = Object.getOwnPropertyDescriptor( from, name );
                Object.defineProperty( dest, name, destination );
            }
        } );
        return this;
    }
} );

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
//    app.set('views', __dirname + '/views');
//    app.set('view engine', 'html');

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

//app.register( ".html", require( "jqtpl" ).express );
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
//app.get('/', routes.index);

app.listen(9010);

//socket.io.js
require('./server/server').init(app);