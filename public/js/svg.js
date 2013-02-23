define(['d3', 'config'], function ( d3, config ){
    var svg = null,
        margin = null,
        width = null,
        height = null,
        svg = null,
        cursor = null;

    function getSize(  ){
        return [width, height];
    }

    function init( selector ){
        margin = { top: 10, right: 10, bottom: 10, left: 10 };
        width = 1024 - margin.left - margin.right;
        height = 800 - margin.top - margin.bottom;

        svg = d3.select( selector ).append('svg' ).
            attr( 'width', width ).
            attr( 'height', height )

        cursor = svg.append( 'circle' )
            .attr( 'r', config.distance )
            .attr( 'transform', 'translate(-100, -100)')
            .attr( 'class', 'cursor' );

        return svg;
    }

    function getCursor(  ){
        return cursor;
    }

    return {
        init: init,
        getSize: getSize,
        getCursor: getCursor
    };
})