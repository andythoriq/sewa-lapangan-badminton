<?php

namespace App\Http\Controllers\Master;

use App\Models\ConfigModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\ConfigRequest;

class ConfigController extends Controller
{
    public function index()
    {
        $configs = ConfigModel::select(['id', 'slug', 'description'])->get();
        return response()->json($configs);
    }

    public function show(ConfigModel $config)
    {
        return response()->json($config->only(['slug', 'description', 'value']));
    }

    public function create(ConfigRequest $request)
    {
        $request->createConfig();
        return response()->json(['message' => 'Configuration created.'], 201, ['success' => 'Configuration created.']);
    }

    public function update(ConfigRequest $request, ConfigModel $config)
    {
        $request->updateConfig($config);
        return response()->json(['message' => 'Configuration updated.'], 202, ['success' => 'Configuration updated.']);
    }

    public function delete(ConfigModel $config)
    {
        $config->deleteOrFail();
        return response()->json(['message' => 'Configuration deleted.'], 202, ['success' => 'Configuration deleted.']);
    }

    public function get_config()
    {
        $configs = ConfigModel::select('slug', 'description', 'value')->get();
        $data = [];
        foreach ($configs as $item) {
            $data[$item->slug] = $item->value;
        }
        return response()->json($data);
    }

    public function change_config(Request $request)
    {
        $request->validate([
            'invalid_input' => ['nullable', function ($attr, $value, $fail) {
                if ($value === '38569de2-6078-11ee-8c99-0242ac120002') {
                    $fail(str_replace("_", " ", $attr) . ': Company data is incomplete.');

                } else if ($value === '3fc8d328-6079-11ee-8c99-0242ac120002') {
                    $fail(str_replace("_", " ", $attr) . ': Invalid day name.');

                } else if ($value === '7a789d1e-6079-11ee-8c99-0242ac120002') {
                    $fail(str_replace("_", " ", $attr) . ': Start and finish times are required.');

                } else if ($value === '93a80a18-6079-11ee-8c99-0242ac120002') {
                    $fail(str_replace("_", " ", $attr) . ': Finish time must be after start time.');

                } else if ($value === 'ae004b00-6079-11ee-8c99-0242ac120002') {
                    $fail(str_replace("_", " ", $attr) . ': Start and finish times cannot be the same.');

                } else if ($value === 'faeac55a-68ab-11ee-8c99-0242ac120002') {
                    $fail(str_replace("_", " ", $attr) . ': Start and Finish must be more than 1 hour.');

                } else if ($value === '2421810c-68ac-11ee-8c99-0242ac120002') {
                    $fail(str_replace("_", " ", $attr) . ': Start and Finish must be multiplied by 30 minutes.');
                }
            }]
        ]);


        foreach ($request->configs as $key) {
            ConfigModel::updateOrCreate(['slug' => $key['slug']], [
                'description' => $key['description'],
                'value' => $key['value']
            ]);
        }

        return response()->json(['message' => 'Configuration changed successfully'], 202, ['success' => 'Configuration changed.']);
    }
}
