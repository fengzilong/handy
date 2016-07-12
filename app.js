const Handy = require( './handy' );
window.Handy = Handy;

const JIRA = require( './plugins/jira' );
const ARC = require( './plugins/arc' );
const YD = require( './plugins/youdao' );

Handy.registerPlugin( new JIRA() );
Handy.registerPlugin( new ARC() );
Handy.registerPlugin( new YD() );

require( './tags' );
riot.mount( 'app' );
