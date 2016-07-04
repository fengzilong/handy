<ui-autocomplete>
	<style scoped>
		:scope {
			display: block;
			position: absolute;
			width: 100%;
			height: 320px;
			overflow-y: scroll;
		}
	</style>

	<div name="pluginRenderArea" if="{ usePluginRender }"></div>
	<div if="{ !usePluginRender }" each="{ item in items }">{ item }</div>

	<script>
		this.usePluginRender = false;

		let isProcessing = false;
		let latest = '';

		const query = () => {
			console.log( 'query called' );

			// separate command and keyword
			const kw = this.opts.keyword.trim();
			const parts = kw.split( ' ' );
			const name = parts.splice( 0, 1 );
			const args = parts;

			if( latest === kw ) {
				return;
			}

			latest = kw;

			if( !Handy.isPluginRegistered( name ) ) {
				this.items = [];
				this.pluginRenderArea.innerHTML = '';
				console.log( 'not registered' );
			}

			Handy.applyPlugin( name, ...args )
				.then(v => {
					if( kw !== latest ) {
						return;
					}

					console.log( 'v', v );

					const plugin = Handy.getPlguinByName( name );

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
	</script>
</ui-autocomplete>