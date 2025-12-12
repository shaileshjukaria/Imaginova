import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({sucess:false, message: "Not Authorised. Login Again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.userId = tokenDecode.id;
            next();
        }else{
            return res.json({sucess:false, message: "Not Authorised. Login Again" });
        }

    } catch (error) {
        res.json({sucess:false, message: error.message });
    }
};

export default userAuth;