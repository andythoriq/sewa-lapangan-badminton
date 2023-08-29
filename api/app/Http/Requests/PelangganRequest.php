<?php

namespace App\Http\Requests;

use App\Models\PelangganModel;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class PelangganRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $code_pelanggan = isset($this->pelanggan) ? ($this->pelanggan->code_pelanggan ?? null) : null;
        return [
            'nama' => ['required', 'string', 'max:90'],
            'no_telp' => ['required', 'string', 'max:16', Rule::unique('tb_pelanggan', 'no_telp')->ignore($code_pelanggan, 'code_pelanggan')],
            'deposit' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'hutang' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'status' => ['required', 'string', 'in:M,R'],
            'masa_aktif_member' => ['nullable', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')]
        ];
    }

    public function createMember()
    {
        $pelanggan = $this->validated();
        $pelanggan['code_pelanggan'] = 'm' . date('Ym'); /* tinggal nilai berurutan */
        PelangganModel::create($pelanggan);
    }

    public function createRegular()
    {
        $pelanggan = $this->validated();
        $pelanggan['code_pelanggan'] = 'r' . date('Ym'); /* tinggal nilai berurutan */
        PelangganModel::create($pelanggan);
    }

    public function updatePelanggan(PelangganModel $pelanggan)
    {
        $pelanggan->updateOrFail($this->validated());
    }
}
