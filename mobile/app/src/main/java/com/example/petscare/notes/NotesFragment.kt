package com.example.petscare.notes

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.example.petscare.R
import com.example.petscare.data.MyService
import com.example.petscare.data.RetrofitClient
import com.example.petscare.databinding.FragmentNotesBinding
import com.example.petscare.navigateSafety
import com.example.petscare.noteAdapter.NoteAdapter
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class NotesFragment : Fragment() {

    private lateinit var myService: MyService
    private lateinit var binding: FragmentNotesBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val retrofit = RetrofitClient.getInstance()
        myService = retrofit.create(MyService::class.java)


    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentNotesBinding.inflate(layoutInflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        setUpRecyclerView()
        setOnAddNoteClickListener()

    }

    private fun setUpRecyclerView() {
        val adapter = NoteAdapter(
            listOf(),
        )
        binding.notesList.adapter = adapter

        lifecycleScope.launch {
            val notes = withContext(Dispatchers.IO) {
                myService.getNotes()
            }
            (binding.notesList.adapter as NoteAdapter).submitList(notes)
        }
    }

    private fun setOnAddNoteClickListener(){
        binding.addNoteFab.setOnClickListener {
           findNavController().navigateSafety(R.id.notes, NotesFragmentDirections.toAddNote())
        }
    }
}
