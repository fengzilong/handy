<app>
	<style scoped>
		:scope {
			box-sizing: border-box;
		}

		* {
			box-sizing: inherit;
		}
	</style>

	<ui-input on-change="{ onChange }"></ui-input>
	<ui-autocomplete keyword="{ kw }"></ui-autocomplete>

	<script>
		this.kw = '';
		this.onChange = v => {
			this.update({
				kw: v
			});
		}
	</script>
</app>
