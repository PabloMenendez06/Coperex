import { response } from "express";
import Admin from "../users/user.model.js";

export const getAdmins = async (req, res = response) => {
    try {
        const admins = await Admin.find({ estado: true });

        res.status(200).json({
            success: true,
            admins,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error fetching admins",
            error,
        });
    }
};
