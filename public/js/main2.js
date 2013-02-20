require.config({
    paths: {
        "d3" : '../lib/d3.v3.min',
        "jquery": '../lib/jquery-1.8.3',
        "sio": '/socket.io/socket.io'
    },
    shim: {
        'd3': { exports: 'd3' },
        'jquery': { exports: 'jquery'},
        'sio': { exports: 'sio'}
    },
    urlArgs : "v=" + new Date().getTime()
})

require(['d3', 'sio', 'svg', 'screen'], function( d3, sio, svg, screen ){
});

