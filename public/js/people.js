define(['jquery', 'config'], function ( $, config ){
    var people=[];
    var person = {
        name: '',
        frends: []
    }

    function getName(){
        var name = $('#name' ).val().trim();
        return name;
    }

    function getFriends(  ){
        var frends = $('#frends' ).val().split(',' ).map( function( d ){
            return d.trim();
        });
        console.log( 'frends', frends );
        return frends;
    }

    function getPeople(){
        var people = getFriends();
        people.push( getName() );
        return people;
    }
    return {
        getName: getName,
        getFriends: getFriends,
        getPeople: getPeople
    }
});