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
}
