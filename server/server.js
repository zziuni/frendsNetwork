var http = require( 'http' )
    , fs = require( 'fs' )
    , path = require( 'path' )
    , sio = require( 'socket.io' )
    , env = require( './env' );

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
            screen.volatile.emit( 'addFriends', data );
        } );

        screenSocket = screen;

        io.of('/audience' ).on( 'connection', function( audience ){
            console.log( '=> The input connected..' );

            audience.on( 'disconnect', function(){} );

            audience.on( 'message', function( msg ){
                env.log.debug( 'audience send message : ' + msg );
            } );

            audience.on( 'addFriends', function( data ){
                env.log.debug( 'audience\'s data get ==', data );
                if(screen){
                    env.log.debug( 'screenSocket is it.' );
                    screen.volatile.emit( 'addFriends', data );
                }
                audience.send( 'server: Friends have added.' );
            } )
        });
    } );


};

