import { User } from "../models/user model.js";
import jwt from "jsonwebtoken"

//authentication code
export const isauthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("middleware:", token);
        if (!token) {
            return res.status(401).json({ error: "user not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        next();
    } catch (error) {
        console.log("error occuring in authentication:" + error);
        return res.status(401).json({ error: "user not authenticated" });
    }
}

/*export const isadmin = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
return res.status(403).json({error:`User with given role ${req.user.role}not allowed`});
        }
        next();
    }
}
*/

