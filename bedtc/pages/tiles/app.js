var total_tiles = parseInt($('.game').attr('data-total-tiles'));
var first_tile_opened = false;
var total_tiles_completed = 0;
var last_tile_opened_id = 0;
var last_tile_opened_type = 0;
var can_click = false;

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
				$('#timer-minutes').text('01');
				$('#timer-seconds').text('00');

				var timer_game_seconds = parseInt($('#timer-seconds').attr('data-game-timer'));
				var timer_game = setInterval(function() {

					if ($('#timer-minutes').text() == '01') {
						$('#timer-minutes').text('00');
					}

					if (timer_game_seconds > 0) {
						timer_game_seconds -= 1;
						$('#timer-seconds').attr('data-game-timer', timer_game_seconds);
						if (timer_game_seconds < 10) {
							$('#timer-seconds').text('0' + timer_game_seconds);
						} else {
							$('#timer-seconds').text(timer_game_seconds);
						}
					} else {
						clearInterval(timer_game);
						// setTimeout(function() {
							$('.game-overlay .game-start').toggleClass('hidden');
							$('.game-overlay .fail-text').toggleClass('hidden');
							$('.game-overlay').toggleClass('active');
						// }, 1000);
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
							setTimeout(function() {
								$('.game-overlay .game-start').toggleClass('hidden');
								$('.game-overlay .success-text').toggleClass('hidden');
								$('.game-overlay').toggleClass('active');
								setTimeout(function() {
									$('.game-overlay .game-start').toggleClass('hidden');
									$('.game-overlay .success-text').toggleClass('hidden');
								}, 3000);
							}, 1000);
						}

						
					}
				}
			}
		}
	});
});