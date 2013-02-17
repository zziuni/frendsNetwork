
/*
 * GET home page.
 */
var jqtpl = require('jqtpl')
    , clog = require('clog');

clog.configure( {'log level': 5} );

exports.index = function(req, res){
    res.render('index', { title: 'Friends Network', menu1Cls: 'active'})
};