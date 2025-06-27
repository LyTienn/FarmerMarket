import User from "./models/UserModels.js";

export const addUser = async () => {
    try {
        const user = await new User({
            username: "lytien",
            email: "lytien@gmail.com",
            fullname: "Lý Công Tiến",
            password: "12345678", 
            phone: "0123456789",
            role: "user",
            avatar: null,
        });
        await user.save();
        console.log("Add user successfully");
    } catch (error) {
        console.log(error);
    }
}

