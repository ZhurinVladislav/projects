<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;

class UserResource extends JsonResource
{
	/**
	 * Преобразует модель пользователя в безопасный массив
	 */
	public function toArray($request)
	{
		return [
			'id'       => $this->id,
			'name'     => $this->name,
			'username' => $this->username,
			'email'    => $this->email,
			// 'createdAt' => $this->created_at?->format('Y-m-d H:i:s'),
		];
	}
}
