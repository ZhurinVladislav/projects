<?php
	load_view('templates/base/header', $template);

	$_txt_t = array();
	require_once $user->language.'.php';
?>

<div class="main-wrapper-aside">
	<div class="container">
		<div class="content">

		<?php
			load_view('templates/base/aside', $template);
		?>

			<div class="main-content">

				<div class="money-panel">
					<div class="wrapper">
						
						<div class="bd-top"></div>
						<div class="bd-bottom"></div>

						<div class="content">

							<a href="replenish" class="link">
								<span class="bg"><span></span></span>
								<span class="caption">На покупки</span>
								<span class="counter">
									<span class="bd"></span>
									<span class="bd-hover"></span>
									<span class="number">0.00000000 BedTC</span>
								</span>
							</a>

							<a href="withdrawal" class="link">
								<span class="bg"><span></span></span>
								<span class="caption">На вывод</span>
								<span class="counter">
									<span class="bd"></span>
									<span class="bd-hover"></span>
									<span class="number">0.00000000 BedTC</span>
								</span>
							</a>

						</div>
					</div>
				</div>

				<div id="main-placeholder">
				<?php
					if (isset($content_path)) {
						require $content_path;
					}
				?>
				</div>
			</div>

		</div>
	</div>
</div>

<?php
	load_view('templates/base/footer', $template);
?>