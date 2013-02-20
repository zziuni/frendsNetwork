define(['jquery', 'config'], function ( $, config ){
    var people=[];
    var person = {
        name: '',
        frends: []
    }

    function getName( nameString ){
        nameString = (nameString)? nameString : $('#name' ).val();
        var name = nameString.trim();
        return name;
    }

    function getFriends( friendsString ){
        friendsString = (friendsString)? friendsString : $('#frends' ).val();
        var friends =  friendsString.split(',' ).map( function( d ){
            return d.trim();
        });
        return friends;
    }

    function getPeople( data ){
        var people = getFriends( data.friends );
        people.push( getName( data.centerName ) );
        return people;
    }
    return {
        getName: getName,
        getFriends: getFriends,
        getPeople: getPeople
    }
});