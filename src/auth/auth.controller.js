import Admin from "../users/user.model.js";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const admin = await Admin.findOne({
            $or: [{ email: lowerEmail }, { username: lowerUsername }]
        });

        if (!admin) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect credentials, admin not found"
            });
        }

        if (!admin.estado) {
            return res.status(400).json({
                success: false,
                msg: "Admin is inactive"
            });
        }

        const validPassword = bcrypt.compareSync(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect password"
            });
        }

        const token = await generarJWT(admin.id);

        return res.status(200).json({
            success: true,
            msg: "Login successful",
            adminDetails: {
                username: admin.username,
                token: token,
            }
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            msg: "Server error",
            error: e.message
        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, surname, username, email, password } = req.body;

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const admin = await Admin.create({
            name,
            surname,
            username,
            email,
            password: encryptedPassword
        });

        return res.status(201).json({
            success: true,
            msg: "Admin registered successfully",
            adminDetails: {
                admin: admin.email
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error registering admin",
            error: error.message
        });
    }
};
