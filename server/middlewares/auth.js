import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({sucess:false, message: "Not Authorised. Login Again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.userId = tokenDecode.id;
            // Fetch user data for use in controllers
            const user = await userModel.findById(tokenDecode.id);
            if (user) {
                req.user = { name: user.name, email: user.email };
            }
            next();
        }else{
            return res.json({sucess:false, message: "Not Authorised. Login Again" });
        }

    } catch (error) {
        res.json({sucess:false, message: error.message });
    }
};

export default userAuth;