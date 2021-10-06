import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            req.userId = decodedData?.id
        }else{
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        return res.status(500).json({message:"something wrong!"})
    }
}
export default verifyToken