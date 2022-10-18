import ArticleModel from '../models/Article.js';

export const getAll = async (req, res) => {
    try{
        const articles = await ArticleModel.find().populate('account').exec();

        res.json(articles);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Failed get articles',
        });
    }
}
export const getOne = async (req, res) => {
    try {
        const articleId = req.params.id;

        ArticleModel.findOneAndUpdate(
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
                        message: 'Failed return article',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Article not found',
                    });
                }

                res.json(doc);
            },
        ).populate('account');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed article',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const articleId = req.params.id;

        ArticleModel.findOneAndDelete({
            _id: articleId,
        },
        (err, doc) => {
            if(err){
                console.log(err);
                res.status(500).json({
                    message: 'Failed remove article',
                });
            }

            if(!doc){
                return res.status(404).json({
                    message: 'Article not found',
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
            message: 'Failed get articles',
        });
    }
}
export const create = async (req, res) => {
    try {
        const doc = new ArticleModel({
            name: req.body.name,
            textInfo: req.body.textInfo,
            photoUrl: req.body.photoUrl,
            account: req.accountId,

        });

        const article = await doc.save();

        res.json(article);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed create article',
        });
    }

}
export const update = async (req, res) => {
   try{
       const articleId = req.params.id;
       await ArticleModel.updateOne({
           _id: articleId,
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
           message: 'Failed update article',
       });
   }
}
