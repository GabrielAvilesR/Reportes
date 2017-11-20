const filterBody = (req, res, next) => {
    let newBody = {}
    if(req.body.name) newBody["name"] = req.body.name
    if(req.body.influence) newBody["influence"] = req.body.influence
    if(req.body.difficulty) newBody["difficulty"] = req.body.difficulty
    newBody["owner"] = req.body.owner
    req.body = newBody
    next()
}

export default filterBody