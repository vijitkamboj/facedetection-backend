const Clarifai =require('clarifai');
const app = new Clarifai.App({
    apiKey: "f361776820ed4c49989ed965325baaae"
});

const imageApi = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
    .then( data => res.json(data))
    .catch( err => res.statu(400).json("Error while processing image"))
}

const imagecount = (db) => (req, res) => {
    const {
        id,
        count
    } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', count)
        .returning('entries')
        .then(Entries => res.json(Entries[0]))
        .catch(err => "Error while incrementing entries" + err)
}

module.exports = {
    handleImageCount: imagecount,
    handleImageApi : imageApi
}