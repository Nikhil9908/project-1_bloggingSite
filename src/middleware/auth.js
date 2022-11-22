const jwt = require('jsonwebtoken')
const blogModel = require('../models/blogModel')
const mongoose = require("mongoose")
const { isValidObjectId } = mongoose




const Authentication = async (req, res, next) => {
    try {
        const token = req.headers['x-api-key']
        if (!token) {
            return res.status(401).send({ status: false, msg: 'missing authentication token in request' })
        }
        let decoded = jwt.verify(token, 'nasa')
        req.authorId = decoded.authorId
        console.log(decoded)

        if (!decoded) {
            return res.status(401).send({ status: false, message: "Invalid authentication token in request" })
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




const Authorisation = async function (req, res, Next) {

    try {

        const blogId = req.params.blogId
        console.log(req.params)
        if (!isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "blog Id is incorreect" })

        let findAuthorId = await blogModel.findById(blogId).select({ authorId: 1, })

        console.log(findAuthorId)
        if (!findAuthorId)
            return res.status(404).send({ status: false, msg: "Author not found" })

        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "nasa");
        console.log(decodedToken)
        let userLoggedIn = decodedToken.authorId

        //authorId comparision to check if the logged-in user is requesting for their own data
        if (findAuthorId.authorId != userLoggedIn) return res.status(403).send({ status: false, msg: '(User is Not Authorised )User is not allowed to modify the blog data' });
        Next()
    }
    catch (err) {
        return res.status(500).send({ status: false, msgp: err.message })
    }
}
module.exports.Authentication = Authentication
module.exports.Authorisation = Authorisation