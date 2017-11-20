const filterBody = (req, res, next) => {
    console.log('req on init',req.body)
    let newBody = {}
    if(req.body.name) newBody["name"] = req.body.name
    if(req.body.influence) newBody["influence"] = req.body.influence
    if(req.body.difficulty) newBody["difficulty"] = req.body.difficulty
    if(req.body.owner) newBody["owner"] = req.body.owner
    req.body = newBody
    next()
}

export default filterBody