'use-strict'

exports.get = (req, res, next) => {
    res.status(200).send({
        title: 'Teste',
        description: 'Produto teste top demais',
    });
};

exports.post = (req, res, next) => {
    res.status(201).send({
        item: req.body
    });
};
exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id, item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
