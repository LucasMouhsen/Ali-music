module.exports = (req,res,next) =>{
    if(req.cookies.recordame){
        req.session.userLogin = req.cookies.recordame
    }
    next()
}