<ui-spinner>
	<style>
		.spinner {
			height: 16px;
			text-align: center
		}
		.spinner > div {
			display: inline-block;
			margin: 0 3px;
			height: 100%;
			width: 4px;
			background-color: rgba(0, 0, 0, .15);
			-webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
			animation: sk-stretchdelay 1.2s infinite ease-in-out
		}
		.spinner .rect2 {
			-webkit-animation-delay: -1.1s;
			animation-delay: -1.1s
		}
		.spinner .rect3 {
			-webkit-animation-delay: -1s;
			animation-delay: -1s
		}
		.spinner .rect4 {
			-webkit-animation-delay: -.9s;
			animation-delay: -.9s
		}
		.spinner .rect5 {
			-webkit-animation-delay: -.8s;
			animation-delay: -.8s
		}
		@-webkit-keyframes sk-stretchdelay {
			0%, 40%, to {
				-webkit-transform: scaleY(.4);
				transform: scaleY(.4)
			}
			20% {
				-webkit-transform: scaleY(1);
				transform: scaleY(1)
			}
		}
		@keyframes sk-stretchdelay {
			0%, 40%, to {
				-webkit-transform: scaleY(.4);
				transform: scaleY(.4)
			}
			20% {
				-webkit-transform: scaleY(1);
				transform: scaleY(1)
			}
		}
	</style>

	<div class="spinner">
		<div class="rect1"></div>
		<div class="rect2"></div>
		<div class="rect3"></div>
		<div class="rect4"></div>
		<div class="rect5"></div>
	</div>

	<script>

	</script>
</ui-spinner>
