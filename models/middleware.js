const verifyToken = (req, res, next) => {
    //first its extracting the token from the header
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    }else{
        res.status(403).json({message:"forbidden"})
    }
}

//after extracting the token use this to verify it
// jwt.verify(req.token, 'secretkey', )

module.exports ={
    verifyToken
}