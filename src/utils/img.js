/* visualizar imagen en base de datos */

module.exports = {
    getImg: (req, res) => {
        const { id } = req.params
        const query = `SELECT avatar FROM users WHERE id = ${id}`
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                result
            })
        })
    }
}