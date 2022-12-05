package com.example.petscare

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.example.petscare.databinding.ActivityRegisterBinding
import com.jakewharton.rxbinding2.widget.RxTextView
import io.reactivex.Observable

@SuppressLint("CheckResult")
class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    @SuppressLint("CheckResult")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

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
        invalidFieldSream.subscribe {
            isValid ->
            if (isValid){
                binding.registerButton.isEnabled = true
                binding.registerButton.backgroundTintList = ContextCompat.getColorStateList(this, R.color.primary)
            }
            else {
                binding.registerButton.isEnabled = false
                binding.registerButton.backgroundTintList = ContextCompat.getColorStateList(this, R.color.non_active)
            }
        }


        binding.registerButton.setOnClickListener {
            startActivity(Intent(this, HomeActivity::class.java))
        }
        binding.dontAcc.setOnClickListener{
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }

    private fun showTextMinimalAlert(isNotValid: Boolean, text: String) {
        if (text == "Name")
            binding.etName.error = if (isNotValid) "$text must be 3 and more charachters" else null
        else if (text == "Password")
            binding.etPassword.error = if (isNotValid) "$text must be 6 and more charachters" else null

    }

    private fun showEmailIsValidAlert(isNotValid: Boolean) {
        binding.etEmail.error = if (isNotValid) "Email is valid!" else null
    }


}