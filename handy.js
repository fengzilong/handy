const observable = require( 'riot-observable' );

let plugins = {};

const injectStyle = css => {
	let style = document.createElement( 'style' );
	style.type = 'text/css';
	style.innerHTML = css;
	document.head.appendChild( style );
	return style;
}

const registerPlugin = plugin => {
	plugins[ plugin.constructor.name.toLowerCase() ] = plugin;
	if( typeof plugin.init === 'function' ) plugin.init();
	if( typeof plugin.style === 'function' ) injectStyle( plugin.style() );
};

const isPluginRegistered = name => {
	return name in plugins;
}

const getPluginByName = name => {
	return plugins[ name ];
};

const getAllPlugins = () => {
	return plugins;
};

const applyPlugin = ( name, ...args ) => {
	if( !isPluginRegistered( name ) ) {
		return Promise.resolve( [] );
	}

	let applied = getPluginByName( name ).apply( ...args );
	if( !( applied instanceof Promise ) ) {
		applied = Promise.resolve( applied );
	}

	return applied;
};

const applyPluginEnter = ( name, ...args ) => {
	if( !isPluginRegistered( name ) ) {
		return Promise.resolve( [] );
	}

	let enterApplied = getPluginByName( name ).enter( ...args );

	if( !( enterApplied instanceof Promise ) ) {
		enterApplied = Promise.resolve( enterApplied );
	}

	return enterApplied;
}

const loading = () => {
	window.loading = true;
	riot.update();
}

const loadingEnd = () => {
	window.loading = false;
	riot.update();
}

const Handy = {
	getPluginByName,
	isPluginRegistered,
	registerPlugin,
	getAllPlugins,
	applyPlugin,
	applyPluginEnter,
	loading,
	loadingEnd,
	settings: {}
};

observable( Handy );

module.exports = Handy;
