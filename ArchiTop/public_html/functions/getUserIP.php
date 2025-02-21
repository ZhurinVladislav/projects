<?php

function getUserIP(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}
