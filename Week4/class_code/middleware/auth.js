const auth = (req, res, next) => {

    if(require.query.username == "John") {
        next();
    } else {
        res.send("You are not authorized for this page")
    }    
}

export default auth;