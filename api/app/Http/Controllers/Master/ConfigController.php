<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\ConfigRequest;
use App\Models\ConfigModel;

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
        return response(null, 201, ['success' => 'Configuration created.']);
    }

    public function update(ConfigRequest $request, ConfigModel $config)
    {
        $request->updateConfig($config);
        return response(null, 204, ['success' => 'Configuration updated.']);
    }

    public function delete(ConfigModel $config)
    {
        $config->deleteOrFail();
        return response(null, 204, ['success' => 'Configuration deleted.']);
    }
}
