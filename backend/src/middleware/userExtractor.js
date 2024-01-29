
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    // traemos los datos de authorization
    const authorization = req.get('authorization')
    // Inicializamos el token a null
    let token = null
    // Si ahy token solo nos quedamos con el codigo
    if (authorization && authorization.trim().toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    // inicializamos un objeto para guardar la informacion del usuario
    let decodeToken = {}
    try {
        decodeToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
        console.error(error);
    }
    // Si no hay token, devolvemos el error
    if (!token || !decodeToken.id) {
        return res.status(401).json({ error: 'Token invalido o no encontrado' })
    }
    const { id } = decodeToken

    req.userId = id
    next()
}