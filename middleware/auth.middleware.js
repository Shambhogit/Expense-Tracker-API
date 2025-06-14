import jwt from 'jsonwebtoken';

async function isUserAuthenticated(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader?.split(' ')[0] !== 'Bearer') {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        //log error for developer used in development
        console.log(`Error in isUserAuthenticated ${error}`);

        //error for user used in production
        res.status(401).json({ success: false, message: 'Invalid or Expired token' });
    }
}

export {
    isUserAuthenticated,
}