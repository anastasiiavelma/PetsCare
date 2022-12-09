package com.example.petscare.noteAdapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.example.petscare.data.Note
import com.example.petscare.databinding.NoteItemBinding
import java.text.SimpleDateFormat
import java.util.*

class NoteAdapter(
    var notes: List<Note>,
) : RecyclerView.Adapter<NoteAdapter.NoteViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NoteViewHolder {
        val binding = NoteItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return NoteViewHolder(binding)
    }

    override fun onBindViewHolder(holder: NoteViewHolder, position: Int) {
        holder.binding.name.text = notes[position].name
        holder.binding.date.text = formatDate(notes[position].updatedAt)
        holder.binding.textInfo.text = notes[position].textInfo

    }

    private fun formatDate(dateString: String): String {
        val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        val date = format.parse(dateString)

        return if (date != null) {
            SimpleDateFormat(
                "dd-MMMM",
                Locale.getDefault()
            ).format(date)
        } else {
            ""
        }

    }

    override fun getItemCount(): Int {
        return notes.size
    }

    fun submitList(newOperationList: List<Note>) {
        val oldTaskList = notes
        val diffResult = DiffUtil.calculateDiff(
            NoteDiffCallBack(oldTaskList, newOperationList)
        )
        notes = newOperationList
        diffResult.dispatchUpdatesTo(this)
    }

    inner class NoteViewHolder(val binding: NoteItemBinding) :
        RecyclerView.ViewHolder(binding.root) {}

}