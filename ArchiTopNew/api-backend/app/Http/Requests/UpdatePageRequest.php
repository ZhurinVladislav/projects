<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
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
        $pageId = $this->route('page')->id ?? null;

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
                Rule::unique('pages')
                    ->where(function ($query) {
                        return $query->where('parent_id', $this->parent_id ?? null);
                    })
                    ->ignore($pageId),
            ],
            'parent_id' => [
                'nullable',
                'exists:pages,id',
                'not_in:' . $pageId, // нельзя быть родителем самому себе
            ],
            'is_published' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'page_title.required' => 'Название страницы обязательно.',
            'alias.unique' => 'Такой alias уже используется в этом разделе.',
            'parent_id.not_in' => 'Страница не может быть родителем самой себя.',
        ];
    }
}
