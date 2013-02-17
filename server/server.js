var http = require( 'http' )
    , fs = require( 'fs' )
    , path = require( 'path' )
    , sio = require( 'socket.io' );

var io;
exports.init = function( app ){
    io = sio.listen( app ) ;

    io.configure( function(){
        io.enable( 'browser client etag' );
        io.set( 'log level', 2 );
        io.set( 'transports', [
            'websocket'
            , 'flashsocket'
            , 'htmlfile'
            , 'xhr-polling'
            , 'jsonp-polling'
        ] );
    } );

    var screenSocket;
    io.of( '/screen' ).on( 'connection', function( screen ){
        console.log( '=> The screen connected..' );

        screen.on( 'disconnect', function(){
            console.log( '=> The screen disconnect.' );
        } );

        screen.on( 'addFriends', function( data ){
            console.log( '=> spearker good slid' );
            screen.volatile.emit( 'addFriends', {} );
        } );

        screenSocket = screen;
    } );

    io.sockets.on( 'connection', function( audience ){
        console.log( '-> A phone connected..' );

        audience.on( 'disconnect', function(){
            console.log( '-> A phone disconnect.' );
        } );

        audience.on( 'message', function( msg ){
            console.info( 'from phone : ' + msg );
            audience.send( 'server: ok.' );
        } );

        audience.on( 'addFriends', function( data ){
            if(screenSocket){
                screenSocket.volatile.emit( 'addFriends', {} );
            }
            audience.send( 'server: Friends have added.' );
        } );
    } );
};

