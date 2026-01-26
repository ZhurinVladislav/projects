<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyReviewRequest extends FormRequest
{
	public function rules(): array
	{
		return [
			'author_name' => 'nullable|string|max:255',
			'rating' => 'required|integer|min:1|max:5',
			'comment' => 'nullable|string|max:1000',
			'source' => 'nullable|string|max:255',
		];
	}
}
