package com.example.petscare

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.example.petscare.data.MyService
import com.example.petscare.data.RetrofitClient
import com.example.petscare.databinding.ActivityRegisterBinding
import com.jakewharton.rxbinding2.widget.RxTextView
import io.reactivex.Observable
import io.reactivex.Scheduler
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers.io
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

@SuppressLint("CheckResult")
class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var myService: MyService

    override fun onStop() {
        CompositeDisposable().clear()
        super.onStop()
    }

    @SuppressLint("CheckResult")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val retrofit = RetrofitClient.getInstance()
        myService = retrofit.create(MyService::class.java)

        //validation email
        val emailStream = RxTextView.textChanges(binding.etEmail)
            .skipInitialValue()
            .map { email ->
                !Patterns.EMAIL_ADDRESS.matcher(email).matches()
            }
        emailStream.subscribe {
            showEmailIsValidAlert(it)
        }

        //validation name
        val nameStream = RxTextView.textChanges(binding.etName)
            .skipInitialValue()
            .map { name ->
                name.length < 3
            }
        nameStream.subscribe {
            showTextMinimalAlert(it, "Name")
        }

        //validation password
        val passwordStream = RxTextView.textChanges(binding.etPassword)
            .skipInitialValue()
            .map { password ->
                password.length < 6
            }
        passwordStream.subscribe {
            showTextMinimalAlert(it, "Password")
        }

        // button
        val invalidFieldSream = Observable.combineLatest(
            nameStream,
            passwordStream,
            emailStream
        ) { nameIsValid: Boolean, emailIsValid: Boolean, passwordIsValid: Boolean ->
            !nameIsValid && !emailIsValid && !passwordIsValid
        }
        invalidFieldSream.subscribe { isValid ->
            if (isValid) {
                binding.registerButton.isEnabled = true
                binding.registerButton.backgroundTintList =
                    ContextCompat.getColorStateList(this, R.color.primary)
            } else {
                binding.registerButton.isEnabled = false
                binding.registerButton.backgroundTintList =
                    ContextCompat.getColorStateList(this, R.color.non_active)
            }
        }


        binding.registerButton.setOnClickListener {
            registerUser(
                binding.etName.text.toString(),
                binding.etEmail.text.toString(),
                binding.etPassword.text.toString()
            )

        }
        binding.dontAcc.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }


    private fun registerUser(name: String, email: String, password: String) {
        lifecycleScope.launch {

            val params = JSONObject(mapOf("name" to name, "password" to password, "email" to email))
                .toString().toRequestBody("application/json; charset=utf-8".toMediaTypeOrNull())

            withContext(Dispatchers.IO) {
                myService.registerUser(params)
            }
            startActivity(Intent(this@RegisterActivity, HomeActivity::class.java))
        }
    }

    private fun showTextMinimalAlert(isNotValid: Boolean, text: String) {
        if (text == "Name")
            binding.etName.error = if (isNotValid) "$text must be 2 and more charachters" else null
        else if (text == "Password")
            binding.etPassword.error =
                if (isNotValid) "$text must be 8 and more charachters" else null

    }

    private fun showEmailIsValidAlert(isNotValid: Boolean) {
        binding.etEmail.error = if (isNotValid) "Email is valid!" else null
    }


}