<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page_title' => ['required', 'string', 'max:255'],
            'long_title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'keywords' => ['nullable', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'alias' => [
                'nullable',
                'string',
                'max:255',
                // Уникальность alias в рамках одного parent_id
                Rule::unique('pages')->where(function ($query) {
                    return $query->where('parent_id', $this->parent_id ?? null);
                }),
            ],
            'parent_id' => ['nullable', 'exists:pages,id'],
            'is_published' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'page_title.required' => 'Название страницы обязательно для заполнения.',
            'alias.unique' => 'Такой alias уже существует в этом разделе.',
        ];
    }
}
