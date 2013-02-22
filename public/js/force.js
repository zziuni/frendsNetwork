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
//            .nodes([{name:'변치훈'}]) // initialize with a single node
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

    function setDistance(){
        return force.linkDistance( config.distance );
    }

    function setStrength(){
        return force.linkStrength( config.strength );
    }

    function setFriction(){
        return force.friction( config.friction );
    }

    function setCharge(){
        return force.charge( config.charge );
    }

    function setTheta(){
        return force.theta( config.theta );
    }

    function setGravity(){
        return force.gravity( config.gravity );
    }

    function isNode( name ){
        var check = false;
        console.log( 'nodes', nodes );
        nodes.forEach( function( node ){
            if( node.name === name ){
                node.cnt = node.cnt+1;
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
        console.log( 'init node', node[0].length );
        if( node[0].length >0 ){
            node[0].forEach( function( eachNode, idx ){
                eachNode.setAttribute('style', 'font-size:'+ ( 12 + node.data()[idx].cnt )+'px');

            });
        }


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
        isNode: isNode,
        setDistance: setDistance,
        setStrength: setStrength,
        setFriction: setFriction,
        setCharge: setCharge,
        setTheta: setTheta,
        setGravity: setGravity




    };
});