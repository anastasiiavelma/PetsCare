import NoteModel from '../models/Note.js';

export const getAll = async (req, res) => {
    try{
        const notes = await NoteModel.find().populate('account').exec();

        res.json(notes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Failed get note',
        });
    }
}
export const getOne = async (req, res) => {
    try {
        const articleId = req.params.id;

        NoteModel.findOneAndUpdate(
            {
                _id: articleId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Note return note',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Note not found',
                    });
                }

                res.json(doc);
            },
        ).populate('account');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed note',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const noteId = req.params.id;

        NoteModel.findOneAndDelete({
                _id: noteId,
            },
            (err, doc) => {
                if(err){
                    console.log(err);
                    res.status(500).json({
                        message: 'Failed remove note',
                    });
                }

                if(!doc){
                    return res.status(404).json({
                        message: 'Note not found',
                    });
                }

                res.json({
                    success: true,
                });
            });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Failed get note',
        });
    }
}
export const create = async (req, res) => {
    try {
        const doc = new NoteModel({
            name: req.body.name,
            textInfo: req.body.textInfo,
            photoUrl: req.body.photoUrl,
            account: req.accountId,

        });

        const note = await doc.save();

        res.json(note);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed create note',
        });
    }

}
export const update = async (req, res) => {
    try{
        const noteId = req.params.id;
        await NoteModel.updateOne({
                _id: noteId,
            }, {
                name: req.body.name,
                textInfo: req.body.textInfo,
                photoUrl: req.body.photoUrl,
                account: req.accountId,
            },
        );

        res.json({
            success: true,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Failed update notes',
        });
    }
}
