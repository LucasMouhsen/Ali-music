module.exports = (req,res,next) => {
    if(req.session.userLogin){
        next()
    }else{
        res.json({login: false})
    }
}