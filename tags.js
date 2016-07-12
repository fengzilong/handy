riot.tag2('app', '<ui-input on-change="{onChange}"></ui-input> <ui-autocomplete keyword="{kw}"></ui-autocomplete>', '', '', function(opts) {
		this.kw = '';
		this.onChange = v => {
			this.update({
				kw: v
			});
		}
});

riot.tag2('ui-autocomplete', '<div name="pluginRenderArea" if="{usePluginRender}"></div> <div if="{!usePluginRender}" each="{item in items}">{item}</div>', 'ui-autocomplete,[riot-tag="ui-autocomplete"],[data-is="ui-autocomplete"]{ display: block; position: absolute; width: 100%; height: 320px; overflow-y: scroll; }', '', function(opts) {
		this.usePluginRender = false;

		Handy.on( 'plugin-render', ( name, v ) => {

			if( !v ) return;

			if( !Handy.isPluginRegistered( name ) ) return;

			const plugin = Handy.getPluginByName( name );

			if( typeof plugin.render === 'function' ) {
				let content = '';
				for( let i = 0, len = v.length; i < len; i++ ) {
					content += plugin.render( v[ i ] );
				}
				this.usePluginRender = true;
				this.pluginRenderArea.innerHTML = content;
				this.update();

				if( typeof plugin.bind === 'function' ) {
					plugin.bind( this.pluginRenderArea );
				}
				return;
			}

			this.usePluginRender = false;
			this.items = v;
			this.update();
		} );

		Handy.on( 'render', v => {

			if( !v ) return;

			this.usePluginRender = false;
			this.items = v;
			this.update();
		} );

		let isProcessing = false;
		let latest = '';

		const query = () => {

			const kw = this.opts.keyword.trim();
			const parts = kw.split( ' ' );
			const name = parts.splice( 0, 1 )[ 0 ];
			const args = parts;

			if( latest === kw ) {
				return;
			}

			latest = kw;

			if( !Handy.isPluginRegistered( name ) ) {
				this.items = [];
				this.pluginRenderArea.innerHTML = '';
				this.update();
			}

			Handy.applyPlugin( name, ...args )
				.then(v => {
					if( kw !== latest ) {
						return;
					}

					Handy.trigger( 'plugin-render', name, v );
				})
				.catch(err => {
					console.log( err );
				})
		};

		let timer;

		this.on('update', () => {
			if( timer ) {
				clearTimeout( timer );
			}

			timer = setTimeout( query, 300 );
		});

		this.on('mount', () => {
			Ps.initialize( this.root );
		});
});

riot.tag2('ui-input', '<input autofocus type="text" value="" oninput="{onInput}" onkeydown="{onKeydown}"> <ui-spinner if="{loading}"></ui-spinner>', 'ui-input,[riot-tag="ui-input"],[data-is="ui-input"]{ display: block; position: relative; } ui-input input,[riot-tag="ui-input"] input,[data-is="ui-input"] input{ width: 100%; height: 60px; outline: none; padding: 5px 15px 5px; font-size: 22px; border: none; background-color: #F1F1F1; color: #405655; letter-spacing: 2px; text-transform: uppercase; } ui-input ui-spinner,[riot-tag="ui-input"] ui-spinner,[data-is="ui-input"] ui-spinner{ position: absolute; right: 10px; top: 50%; transform: translate3d(0,-50%,0); }', '', function(opts) {
		this.onInput = e => {
			this.opts.onChange && this.opts.onChange( e.target.value );
		};
		this.onKeydown = e => {

			const kw = e.target.value.trim();
			const parts = kw.split( ' ' );
			const name = parts.splice( 0, 1 )[ 0 ];
			const args = parts;

			if( e.keyCode === 13 ) {
				Handy.applyPluginEnter( name, ...args )
					.then(v => {
						Handy.trigger( 'plugin-render', name, v );
					});
			}

			return true;
		};
});

riot.tag2('ui-spinner', '<div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div>', '.spinner { height: 16px; text-align: center } .spinner > div { display: inline-block; margin: 0 3px; height: 100%; width: 4px; background-color: rgba(0, 0, 0, .15); -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out; animation: sk-stretchdelay 1.2s infinite ease-in-out } .spinner .rect2 { -webkit-animation-delay: -1.1s; animation-delay: -1.1s } .spinner .rect3 { -webkit-animation-delay: -1s; animation-delay: -1s } .spinner .rect4 { -webkit-animation-delay: -.9s; animation-delay: -.9s } .spinner .rect5 { -webkit-animation-delay: -.8s; animation-delay: -.8s } @-webkit-keyframes sk-stretchdelay { 0%, 40%, to { -webkit-transform: scaleY(.4); transform: scaleY(.4) } 20% { -webkit-transform: scaleY(1); transform: scaleY(1) } } @keyframes sk-stretchdelay { 0%, 40%, to { -webkit-transform: scaleY(.4); transform: scaleY(.4) } 20% { -webkit-transform: scaleY(1); transform: scaleY(1) } }', '', function(opts) {
});
