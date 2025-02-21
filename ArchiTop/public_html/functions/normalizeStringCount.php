<?php

/** 
 * Склонение слов относительно числового значения.
 * @param int $value числовое значение
 * @param array $words массив со словами важен порядок и окончания: ['победа', 'победы', 'побед']
 * */

function normalizeStringCount(int $value, array $words): string
{
	$value = abs($value) % 100;
	$num = $value % 10;

	if ($value > 10 && $value < 20) {
		return $words[2];
	} elseif ($num > 1 && $num < 5) {
		return $words[1];
	} elseif ($num == 1) {
		return $words[0];
	} else {
		return $words[2];
	}
}
