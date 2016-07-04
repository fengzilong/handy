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

const getPlguinByName = name => {
	return plugins[ name ];
};

const applyPlugin = ( name, ...args ) => {
	if( !Handy.isPluginRegistered( name ) ) {
		return Promise.reject();
	}

	let applied = plugins[ name ].apply( ...args );
	if( !( applied instanceof Promise ) ) {
		applied = Promise.resolve( applied );
	}

	return applied;
};

const loading = () => {
	window.loading = true;
	riot.update();
}

const loadingEnd = () => {
	window.loading = false;
	riot.update();
}

const Handy = {
	getPlguinByName,
	isPluginRegistered,
	registerPlugin,
	applyPlugin,
	loading,
	loadingEnd,
	settings: {}
};

module.exports = Handy;
