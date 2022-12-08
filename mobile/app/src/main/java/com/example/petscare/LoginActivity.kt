package com.example.petscare

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.example.petscare.data.MyService
import com.example.petscare.data.RetrofitClient
import com.example.petscare.databinding.ActivityLoginBinding
import com.jakewharton.rxbinding2.widget.RxTextView
import io.reactivex.Observable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

@SuppressLint("CheckResult")
class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var myService: MyService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val retrofit = RetrofitClient.getInstance()
        myService = retrofit.create(MyService::class.java)

        //validation password
        val passwordStream = RxTextView.textChanges(binding.etPassword)
            .skipInitialValue()
            .map { password ->
                password.isEmpty()
            }
        passwordStream.subscribe {
            showTextMinimalAlert(it, "Password")
        }

        //validation password
        val emailStream = RxTextView.textChanges(binding.etEmail)
            .skipInitialValue()
            .map { email ->
                email.isEmpty()
            }
        passwordStream.subscribe {
            showTextMinimalAlert(it, "Email")
        }

        // button
        val invalidFieldSream = Observable.combineLatest(
            passwordStream,
            emailStream
        ) { emailIsValid: Boolean, passwordIsValid: Boolean ->
             !emailIsValid && !passwordIsValid
        }
        invalidFieldSream.subscribe {
                isValid ->
            if (isValid){
                binding.loginButton.isEnabled = true
                binding.loginButton.backgroundTintList = ContextCompat.getColorStateList(this, R.color.primary)
            }
            else {
                binding.loginButton.isEnabled = false
                binding.loginButton.backgroundTintList = ContextCompat.getColorStateList(this, R.color.non_active)
            }
        }

        binding.loginButton.setOnClickListener {
            loginUser( binding.etEmail.text.toString(), binding.etPassword.text.toString())
           // startActivity(Intent(this, HomeActivity::class.java))
        }
        binding.dontAcc.setOnClickListener{
            startActivity(Intent(this, RegisterActivity::class.java))
        }


    }

    private fun loginUser(email: String, password: String){
        lifecycleScope.launch {

            val params = JSONObject(mapOf("password" to password, "email" to email))
                .toString().toRequestBody("application/json; charset=utf-8".toMediaTypeOrNull())

            withContext(Dispatchers.IO) {
                myService.loginUser(params)
            }
            startActivity(Intent(this@LoginActivity, MenuActivity::class.java))
        }
    }
    private fun showTextMinimalAlert(isNotValid: Boolean, text: String) {
        if (text == "Email")
            binding.etEmail.error = if (isNotValid) "$text is invalid" else null
        else if (text == "Password")
            binding.etPassword.error = if (isNotValid) "$text is invalid" else null

    }
}