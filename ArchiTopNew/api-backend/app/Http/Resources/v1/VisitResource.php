<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class VisitResource extends JsonResource
{
	/**
	 * Преобразует модель пользователя в безопасный массив
	 */
	public function toArray($request)
	{
		return [
			'id'       => $this->id,
			'ip'     => $this->ip,
			'userAgent' => $this->user_agent,
			'created' => $this->created_at->format('Y-m-d H:i:s'),
		];
	}
}
