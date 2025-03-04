import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "No token provided",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Invalid token",
        });
    }
};
