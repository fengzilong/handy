<ui-input>
	<style scoped>
		:scope {
			display: block;
			position: relative;
		}

		input {
			width: 100%;
			height: 60px;
			outline: none;
			padding: 5px 15px 5px;
			font-size: 22px;
			border: none;
			background-color: #F1F1F1;
			color: #405655;
			letter-spacing: 2px;
			text-transform: uppercase;
		}

		ui-spinner {
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translate3d(0,-50%,0);
		}
	</style>

	<input autofocus type="text" value="" oninput="{ onInput }">
	<ui-spinner if="{ loading }"></ui-spinner>

	<script>
		this.onInput = e => {
			this.opts.onChange && this.opts.onChange( e.target.value );
		};
	</script>
</ui-input>
