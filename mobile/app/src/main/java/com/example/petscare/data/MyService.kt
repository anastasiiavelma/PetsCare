package com.example.petscare.data

import com.google.gson.JsonObject
import io.reactivex.Observable
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.*

interface MyService {
    @POST("auth/register")
   suspend fun registerUser(
        @Body params: RequestBody
    ): JsonObject

    @POST("auth/login")
    suspend fun loginUser(
        @Body params: RequestBody
    ): JsonObject

}