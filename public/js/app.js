define(['svg', 'config', 'force', 'jquery', 'people', 'node' ],
function ( svgModule, config, layoutModule, $, peopleModule, nodeModule ){
    var container = svgModule.init('.svg');
//    container.on("mousemove", mousemove)
//            .on("mousedown", mousedown);
    layoutModule.makeForce(container);

    layoutModule.start();

    function mousemove(){
        svgModule.getCursor().attr( 'transform', 'translate(' + d3.mouse(this) + ')');
    }

    function mousedown(){
        var point = d3.mouse(this),
            node = {x: point[0], y: point[1], name: 'test'},
            n = layoutModule.pushNode(node);

        var nodes = layoutModule.getNodes();

        nodes.forEach(function(target) {
            var x = target.x - node.x,
                y = target.y - node.y;
            if (Math.sqrt(x * x + y * y) < config.distance) {
                layoutModule.pushLink({source: node, target: target});
            }
        });

        layoutModule.start();
    }

    function onClickAdd(){
        var people = peopleModule.getPeople();
        people.forEach( function( person ){
            layoutModule.addNode( person.trim() );
            layoutModule.start();
        });

        var owner = nodeModule.findNode(peopleModule.getName(), layoutModule);
        var friends = peopleModule.getFriends();
        friends.forEach( function ( friend ){
            var target = nodeModule.findNode( friend, layoutModule );
            layoutModule.pushLink({source: owner, target: target});
            layoutModule.start();
        });

        $('#name' ).val('');
        $('#frends' ).val('');
    }

    function onClickSave(){
        layoutModule.saveDataOnLocal();
    }

    function onClickRestore(){
        layoutModule.restoreDataOnLocal();
    }

    function onClickApplyConfig(){
        config.distance = $('#distance' ).val();
        config.strength = $('#strength' ).val();
        config.friction = $('#friction' ).val();
        config.charge = $('#charge' ).val();
        config.theta = $('#theta' ).val();
        config.gravity = $('#gravity' ).val();
        layoutModule.setDistance();
        layoutModule.setStrength();
        layoutModule.setFriction();
        layoutModule.setCharge();
        layoutModule.setTheta();
        layoutModule.setGravity();
        layoutModule.start();
    }

    function onReady(){
        $( '#distance' ).val( config.distance );
        $( '#strength' ).val( config.strength );
        $( '#friction' ).val( config.friction );
        $( '#charge' ).val( config.charge );
        $( '#theta' ).val( config.theta );
        $( '#gravity' ).val( config.gravity );
    }
    $('.add' ).on('click', onClickAdd);
    $('.save' ).on('click', onClickSave);
    $('.restore' ).on('click', onClickRestore);
    $('.applyConfig' ).on('click', onClickApplyConfig);
    $('body' ).ready( onReady );
})