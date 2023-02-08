import jwt from 'jsonwebtoken';
import usersRepository from '../repositories/usersRepository.js';

export async function verifyToken(req, res, next) {
    try {

        /* IS THERE TOKEN? */

        const { authorization } = req.headers

        if (!authorization) {
            console.log(`verifyToken/IS THERE TOKEN?`);
            res.locals.user = "Visitante";
            next();
            return;
        }

        const token = authorization.replace('Bearer ', '');
        
        if (!token) {
            console.log(`verifyToken/IS THERE TOKEN?`);
            res.locals.user = "Visitante";
            next();
            return;
        }

        
        /* JWT VERIFY */

        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) {
                console.log(`verifyToken/JWT VERIFY - ${err}`);
                res.locals.user = "Visitante";
                next();
                return;
            }
            /* IS THERE THAT USER? */

            const result = await usersRepository.getUserByEmail(decoded.email);

            if(!result.rows[0]) {
                console.log(`verifyToken/IS THERE THAT USER?`);
                res.locals.user = "Visitante";
                next();
                return;
            }
            
            
            res.locals.user = result.rows[0].name;
            res.locals.id = result.rows[0].id;
            next();
        });
        

    } catch (error) {
        console.log(`verifyToken - ${error}`);
        res.sendStatus(500);
    }
}