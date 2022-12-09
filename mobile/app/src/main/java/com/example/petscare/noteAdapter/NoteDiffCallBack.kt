package com.example.petscare.noteAdapter

import androidx.recyclerview.widget.DiffUtil
import com.example.petscare.data.Note

class NoteDiffCallBack
    (
    private var oldNoteList: List<Note>,
    private var newNoteList: List<Note>
    ) :
    DiffUtil.Callback() {
        override fun getOldListSize() = oldNoteList.size

        override fun getNewListSize() = newNoteList.size

        override fun areItemsTheSame(p0: Int, p1: Int) =
            oldNoteList[p0]._id == newNoteList[p1]._id

        override fun areContentsTheSame(p0: Int, p1: Int) =
            oldNoteList[p0] == newNoteList[p1]
    }
