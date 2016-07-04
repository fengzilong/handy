<app>
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
