define(['d3', 'config', 'svg', 'force'], function( d3, config, svgModule ){

    function insertnode( enterNode ){
//        return enterNode.insert( 'rect', '.cursor' )
//            .attr( 'class', 'node' )
//            .attr( 'width', config.node.w )
//            .attr( 'height', config.node.h )
//            .attr( 'rx', 5 )
//            .attr( 'ry', 5 );


        return enterNode.insert('text', '.cursor' ).text( function( d ){
                return d.name;
            });


    }

    function makeDefaultNode( name ){
        return { name: name };
    }

    function findNode( name, layoutModule ){
        var nodes = layoutModule.getNodes();
        var result = null;
        nodes.forEach( function( node ){
            if( node.name === name){
                result = node;
                return true;
            }
        })
        return result;
    }

    return {
        insertNode: insertnode,
        makeDefaultNode: makeDefaultNode,
        findNode: findNode
    };
});