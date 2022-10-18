import PetPassModel from '../models/petPassport.js';

export const getAll = async (req, res) => {
    try{
        const petPass = await PetPassModel.find().populate('account').exec();

        res.json(petPass);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Failed get pet passport',
        });
    }
}
export const getOne = async (req, res) => {
    try {
        const petPassId = req.params.id;

        PetPassModel.findOneAndUpdate(
            {
                _id: petPassId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Failed return pet passport',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Pet passport not found',
                    });
                }

                res.json(doc);
            },
        ).populate('account');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed pet passport',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const petPassId = req.params.id;

        PetPassModel.findOneAndDelete({
                _id: petPassId,
            },
            (err, doc) => {
                if(err){
                    console.log(err);
                    res.status(500).json({
                        message: 'Failed remove pet passport',
                    });
                }

                if(!doc){
                    return res.status(404).json({
                        message: 'Pet passport not found',
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
            message: 'Failed get pet passport',
        });
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PetPassModel(
            {
            birth: req.body.birth,
            feed: req.body.feed,
            gender: req.body.gender,
            coloration: req.body.coloration,
            weight: req.body.weight,
            sterilization: req.body.sterilization,
            account: req.accountId,

        });

        const petPass = await doc.save();

        res.json(petPass);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed create petPass',
        });
    }

}
export const update = async (req, res) => {
    try{
        const petPassId = req.params.id;
        await PetPassModel.updateOne({
                _id: petPassId,
            }, {
            birth: req.body.birth,
            feed: req.body.feed,
            gender: req.body.gender,
            coloration: req.body.coloration,
            weight: req.body.weight,
            sterilization: req.body.sterilization,
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
            message: 'Failed update pet passport',
        });
    }
}
