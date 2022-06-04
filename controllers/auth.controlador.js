export const registrar = (req, res) => {
    console.log(req.body);
    res.json({ok: 'registrar'});
};

export const login = (req, res) => {
    res.json({ok: 'login'});
};