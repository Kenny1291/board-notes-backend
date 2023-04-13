<?php

namespace App\Http\Controllers;

use App\Http\Resources\NoteResource;
use App\Models\Note;
use App\Models\TemporaryUser;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $ip = $request->ip();

        $tmpUser = TemporaryUser::whereIp($ip)->first();

        if($tmpUser)
        {
            return NoteResource::collection($tmpUser->notes()->get());
        }
        else 
        {
            TemporaryUser::create([
                'ip' => $ip
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): NoteResource
    {
        $validatedData = $request->validate([
            'content' => 'required|string|max:2000'
        ]);

        $note = Note::create($validatedData);

        return new NoteResource($note);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $validatedData = $request->validate([
            'content' => 'nullable|string|max:2000',
            'x_coordinate' => 'nullable|numeric',
            'y_coordinate' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'height' => 'nullable|numeric',
        ]);

        $note->update($validatedData);

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete();

        //HTTP 204 No Content success status response
        return response('', 204);
    }
}
