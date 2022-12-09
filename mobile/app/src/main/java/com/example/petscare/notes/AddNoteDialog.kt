package com.example.petscare.notes

import android.app.Dialog
import android.os.Bundle
import com.example.petscare.R
import com.example.petscare.databinding.AddNoteDialogBinding
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.android.material.bottomsheet.BottomSheetDialogFragment

class AddNoteDialog : BottomSheetDialogFragment() {

    private lateinit var binding: AddNoteDialogBinding

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
     binding = AddNoteDialogBinding.inflate(layoutInflater)
        setDialogTitle()
        val dialog = BottomSheetDialog(requireContext()).apply {
            setContentView(binding.root)
            setCancelable(true)
        }
        return dialog
    }

    private fun setDialogTitle() {
        binding.dialogTitle.title.text = requireContext().getString(R.string.add_note)
    }

    private fun setOnBtnClickListeners() {
        binding.dialogTitle.cancelBtn.setOnClickListener { dismiss() }
        binding.dialogTitle.submitBtn.setOnClickListener { onSubmitClick() }
    }

    private fun onSubmitClick() {
        val name = binding.name.editText?.text.toString()
        val textInfo = binding.textInfo.editText?.text.toString()

        if (name.isEmpty()) {
            binding.name.error = "Name is empty"
            return
        }
        if (textInfo.isEmpty()) {
            binding.textInfo.error = "Text is empty"
            return
        }
    }

//    private fun setOnChangeListeners(){
//        binding.name
//    }
}