<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginUserRequest extends FormRequest
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
    public function rules()
    {
        return [
            'username' => 'required|string', // Может быть email или username
            'password' => 'required|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'login.required' => 'Поле login обязательно.',
            'password.required' => 'Поле password обязательно.',
            'password.min' => 'Пароль должен содержать минимум 8 символов.',
        ];
    }
}
