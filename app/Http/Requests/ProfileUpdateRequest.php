<?php

namespace App\Http\Requests;

use App\Models\Carrier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:50',
                Rule::unique(Carrier::class)->ignore($this->user()->id),
            ],
        ];

        if ($this->user()->is_admin) {
            $rules["nickname"] = ['required', 'string', 'max:50'];
        }


        return $rules;
    }
}
