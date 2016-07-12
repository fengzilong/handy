<preference>
	<style scoped>
		:scope {
			display: flex;
			font-size: 12px;
			color: #333;
			-webkit-user-select: none;
			user-select: none;
		}

		.container {
			display: flex;
			width: 100%;
		}

		.sidebar {
			min-width: 150px;
			max-width: 220px;
			height: -webkit-calc(100vh - 24px);
			background-color: #EEE;
		}

		ul {
			margin: 0;
			padding: 10px 0;
			list-style: none;
		}

		li {
			padding: 8px 0 8px 20px;
			cursor: pointer;
		}

		li:hover {
			background-color: #DDD;
		}

		.icon {
			margin-right: 5px;
		}

		.content {
			flex: 1;
			height: -webkit-calc(100vh - 24px);
			overflow-y: scroll;
			box-sizing: border-box;
			padding: 20px;
		}

		.description {
			font-size: 10px;
			margin: 3px 0 6px;
		}
		select {
			padding: 3px;
			width: 100%;
			outline: none;
		}
	</style>

	<div class="container">
		<div class="sidebar">
			<ul>
				<li onclick="{ onCommon }"><i class="icon iconfont">&#xe601;</i>Common</li>
				<li><i class="icon iconfont">&#xe600;</i>Plugins</li>
			</ul>
		</div>
		<div class="content">
			<div if="{ pane === 'common' }" class="">
				<div class="title">
					Always on top
				</div>
				<div class="description">
					keep main window always on top
				</div>
				<input type="checkbox">

				<div class="title">
					Language
				</div>
				<div class="description">
					choose your language
				</div>
				<select>
					<option value="en">English</option>
					<option value="zh">Chinese</option>
				</select>
			</div>
			<div if="{ pane === 'plugins' }" class="">
				Plugins
			</div>
		</div>
	</div>

	<script>
		this.pane = 'common';

		this.onCommon = () => {
			this.pane = 'common';
			this.update();
		};

		this.onPlugins = () => {
			this.pane = 'plugins';
			this.update();
		};

		this.on('mount', () => {
			console.log( 'mounted' );
		});
	</script>
</preference>
