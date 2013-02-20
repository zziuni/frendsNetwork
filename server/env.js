var clog = require( 'clog' );
var utillity = require( './utillity' );

//=> {'log': true, 'info': true, 'warn': true, 'error': false, 'debug': false}
clog.configure( {"log level": 5} );

exports.log = clog;
exports.util = utillity;