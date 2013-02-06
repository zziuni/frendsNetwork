define(['d3', 'config', 'svg', 'node' ], function( d3, config, svgModule, nodeModule  ){
    var nodes = null,
        links = null,
        node = null,
        link = null,
        force = null
        ;

    function makeForce( container ){
        force = d3.layout.force()
            .size(svgModule.getSize())
//            .nodes([{name:'고혜성'}]) // initialize with a single node
            .linkDistance(config.distance)
            .charge(config.charge)
            .on("tick", tick);

        nodes = force.nodes();
        links = force.links();
        node = container.selectAll( '.node' );
        link = container.selectAll( '.link' );
    }

    function tick(){
        link.attr("x1", function(d) {
            return d.source.x + config.node.cw; })
            .attr("y1", function(d) { return d.source.y + config.node.ch; })
            .attr("x2", function(d) { return d.target.x + config.node.cw; })
            .attr("y2", function(d) { return d.target.y + config.node.ch; });

        node.attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
    }

    function saveDataOnLocal(){
        localStorage.setItem('nodes', JSON.stringify(nodes) );
        localStorage.setItem('links', JSON.stringify(links) );
    }

    function restoreDataOnLocal(){
        nodes = JSON.parse(localStorage.getItem('nodes'));
        links = JSON.parse(localStorage.getItem('links'));
        start();
    }

    function isNode( name ){
        var check = false;
        nodes.forEach( function( node ){
            if( node.name === name ){
                check = true;
            }
        });
        return check;
    }

    function pushNode( node ){
        nodes.push( node );
        return nodes;
    }

    function addNode( name ){
        if ( !isNode( name )){
            var node = nodeModule.makeDefaultNode( name );
            pushNode( node );
        }
    }

    function pushLink( link ){
        links.push( link );
        return links;
    }

    function getNodes(){
        return nodes;
    }

    function generateNode(){
        node = node.data(nodes);
        nodeModule.insertNode( node.enter() ).call( force.drag );
    }

    function generateLink(){
        link = link.data(links);

        link.enter().insert( 'line', '.node' )
            .attr('class', 'link' );
    }

    function start(){
        generateNode();
        generateLink();

        force.start();
    }

    return {
        makeForce: makeForce,
        start: start,
        pushNode: pushNode,
        pushLink: pushLink,
        getNodes: getNodes,
        saveDataOnLocal: saveDataOnLocal,
        restoreDataOnLocal: restoreDataOnLocal,
        addNode: addNode,
        isNode: isNode
    };
});