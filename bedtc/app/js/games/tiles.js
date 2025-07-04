var total_tiles = parseInt($('.account-balance .game').attr('data-total-tiles'));
var first_tile_opened = false;
var total_tiles_completed = 0;
var last_tile_opened_id = 0;
var last_tile_opened_type = 0;
var can_click = false;
var game_win = false;
var was_received = $('.game-header .description').attr('data-was-received');

function toggleTile(tile) {
	tile.toggleClass('post-hidden');
	tile.toggleClass('pre-hidden');
	setTimeout(function() {
		tile.toggleClass('post-hidden');
		tile.toggleClass('hidden');
	}, 500);
}

$(function() {

	$('body').on('click', '.game-start, .game-again', function() {
		$('.game-overlay').toggleClass('active');
		$('.game-overlay .fail-text').addClass('hidden');
		
		var timer_start_seconds = parseInt($('#timer-seconds').attr('data-start-timer'));

		var timer_start = setInterval(function() {
			if (timer_start_seconds > 0) {
				timer_start_seconds -= 1;
				$('#timer-seconds').attr('data-start-timer', timer_start_seconds);
				$('#timer-seconds').text('0' + timer_start_seconds);
			} else {
				clearInterval(timer_start);
			}
		}, 1000);

		setTimeout(function() {
			$('.game-table .tile').toggleClass('pre-hidden');
			setTimeout(function() {
				$('.game-table .tile').toggleClass('hidden');
				can_click = true;
				$('.game-table').removeClass('disabled');

				// $('#timer-minutes').text('00');
				// $('#timer-minutes').text('01');
				// $('#timer-seconds').text('00');

				var timer_game_seconds = parseInt($('#timer-seconds').attr('data-game-timer'));
				var timer_game = setInterval(function() {

					// if ($('#timer-minutes').text() == '01') {
					// 	$('#timer-minutes').text('00');
					// }

					if (timer_game_seconds > 0) {
						timer_game_seconds -= 1;
						$('#timer-seconds').attr('data-game-timer', timer_game_seconds);
						if (timer_game_seconds < 10) {
							$('#timer-seconds').text('0' + timer_game_seconds);
						} else {
							$('#timer-seconds').text(timer_game_seconds);
						}
					} else if (game_win === false) {
						clearInterval(timer_game);

						$('.game-overlay .game-start').addClass('hidden');
						$('.game-overlay .fail-text').removeClass('hidden');
						$('.game-overlay').addClass('active');

						first_tile_opened = false;
						total_tiles_completed = 0;
						last_tile_opened_id = 0;
						last_tile_opened_type = 0;

						setTimeout(function() {
							ajax({
								'controller': 'games/tiles_again'
							}, function(data) {
								$('.game-table').html(data);
							});

							// $('#timer-minutes').text('00');
							$('#timer-seconds').text('05');
							$('#timer-seconds').attr('data-start-timer', 5);
							$('#timer-seconds').attr('data-game-timer', 26);
						}, 500);
					}
				}, 1000);

			}, 500);
		}, 5000);
	});

	$('body').on('click', '.game-table .tile', function() {
		if (can_click === true) {
			
			let this_tile = $(this);
			let this_tile_id = parseInt(this_tile.attr('data-item-id'));
			let this_tile_type = parseInt(this_tile.attr('data-item-type'));

			if (this_tile.attr('data-completed') == 'false' && this_tile_id !== last_tile_opened_id) {
				can_click = false;
				$('.game-table').addClass('disabled');
				
				toggleTile(this_tile);

				if (first_tile_opened === false) {
					
					first_tile_opened = true;
					last_tile_opened_id = parseInt(this_tile.attr('data-item-id'));
					last_tile_opened_type = parseInt(this_tile.attr('data-item-type'));

					setTimeout(function() {
						can_click = true;
						$('.game-table').removeClass('disabled');
					}, 500);

				} else {
					
					first_tile_opened = false;

					if (this_tile_type != last_tile_opened_type) {
						setTimeout(function() {
							
							toggleTile(this_tile);
							toggleTile($('.game-table .tile[data-item-id="'+last_tile_opened_id+'"]'));

							setTimeout(function() {
								can_click = true;
								$('.game-table').removeClass('disabled');
							}, 500);

						}, 1000);

					} else {
						
						this_tile.attr('data-completed', 'true');
						$('.game-table .tile[data-item-id="'+last_tile_opened_id+'"]').attr('data-completed', 'true');
						total_tiles_completed += 2;
						
						setTimeout(function() {
							can_click = true;
							$('.game-table').removeClass('disabled');
						}, 500);

						if (total_tiles_completed == total_tiles) {

							game_win = true;

							setTimeout(function() {
								$('.game-overlay').addClass('active');
								$('.game-overlay .game-start').addClass('hidden');
								$('.game-overlay .fail-text').addClass('hidden');

								if (was_received == "false") {
									$('.game-overlay .wait-text').removeClass('hidden');

									ajax({
										'controller': 'games/tiles_get_reward'
									}, function(data) {
										data = JSON.parse(data);
										if (data.status == 'ok') {
											setTimeout(function() {
												// $('.game-overlay .game-start').toggleClass('hidden');
												$('.game-overlay .wait-text').addClass('hidden');
												$('.game-overlay .success-text').removeClass('hidden');
											}, 2500);
										}
									});
								} else {
									$('.game-overlay .already-text').removeClass('hidden');
								}
							}, 1000);
						}

						
					}
				}
			}
		}
	});
});