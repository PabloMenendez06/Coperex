import Admin from "../users/user.model.js";

export const existenteEmail = async (email = "") => {
    const existeEmail = await Admin.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email ${email} already exists in the database`);
    }
};

export const existeAdminById = async (id = "") => {
    const existeAdmin = await Admin.findById(id);
    if (!existeAdmin) {
        throw new Error(`The ID ${id} does not exist`);
    }
};
