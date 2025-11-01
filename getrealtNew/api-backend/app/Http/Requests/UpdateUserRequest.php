<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Разрешаем обновление только самому пользователю
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'min:2'],
            'username' => [
                'required',
                'string',
                'min:2',
                Rule::unique('users')->ignore($this->user()->id),
            ],
            'email' => [
                'nullable',
                'email',
                Rule::unique('users')->ignore($this->user()->id),
            ],
            'password' => ['nullable', 'string', 'min:6', 'confirmed'], // "confirmed" = password_confirmation
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'Имя пользователя обязательно',
            'username.unique' => 'Такое имя пользователя уже занято',
            'email.unique' => 'Этот email уже зарегистрирован',
            'password.confirmed' => 'Пароли не совпадают',
        ];
    }
}
