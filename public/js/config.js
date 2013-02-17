define([], function(){
    var config = {
        distance : 80,  // default is 20
        strength : 1,   // default is 1
        friction: 0.9,  // default is 0.9
        charge: -100,   // default is -30
        theta: 0.8,     // default is 0.8
        gravity: 0.1,   // default is 0.1
        node: {
            w:40,
            h:20,
            cw: 20,
            ch: 0
        },

    }

    return config;
})