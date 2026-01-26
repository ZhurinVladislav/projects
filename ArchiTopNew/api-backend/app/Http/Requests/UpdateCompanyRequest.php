<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            'page_id' => 'nullable|exists:pages,id',
            'title' => 'required|string|max:255',
            'introtext' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'image_alt' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'site_url' => 'nullable|url|max:255',
            'experience' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'map_link' => 'nullable|url|max:500',
            'promo' => 'boolean',
            'service_category_ids' => ['array'],
            'service_category_ids.*' => ['exists:service_categories,id'],
            'service_ids' => ['array'],
            'service_ids.*' => ['exists:services,id'],
            'property_type_ids' => ['array'],
            'property_type_ids.*' => ['exists:property_types,id'],

            // 🔹 Дни работы
            'workdays' => ['array'],
            'workdays.*.day' => ['required', 'string', 'max:20'],
            'workdays.*.hours' => ['required', 'string', 'max:50'],
            'workdays.*.is_day_off' => ['boolean'],

            // 🔹 Социальные сети
            'socials' => ['array'],
            'socials.*.platform' => ['required', 'string', 'max:100'],
            'socials.*.url' => ['required', 'url', 'max:500'],

            // 🔹 Ссылки на сервисы
            'services_links' => ['array'],
            'services_links.*.service_name' => ['required', 'string', 'max:255'],
            'services_links.*.url' => ['required', 'url', 'max:500'],

            // 🔹 НОВОЕ: Рейтинги с платформ
            'ratings' => ['array'],
            'ratings.*.id' => ['sometimes', 'exists:company_ratings,id'], // для обновления существующих
            'ratings.*.type' => ['required', 'string', 'in:avito,yandex,google,flamp,yell,2gis,zoon'],
            'ratings.*.link' => ['nullable', 'url', 'max:500'],
            'ratings.*.rating' => ['required', 'numeric', 'min:0', 'max:5'],
            'ratings.*.total_reviews' => ['required', 'integer', 'min:0'],
        ];
    }
}
