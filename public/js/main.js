require.config({
    paths: {
        "d3" : '../lib/d3.v3.min',
        "jquery": '../lib/jquery-1.8.3'
    },
    shim: {
        'd3': { exports: 'd3' },
        'jquery': { exports: 'jquery'}
    },
    urlArgs : "v=" + new Date().getTime()
})

require(['d3', 'svg', 'app'], function( d3, svg, app ){
});

