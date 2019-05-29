const controller = (db) => (req, res) => {
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
    handleImageCount: controller
}