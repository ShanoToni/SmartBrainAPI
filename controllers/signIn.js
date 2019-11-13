const handleSignIn = (req,res,db,bcrypt)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.json("Incorrect submition!")
    }
    db.select("email", "hash").from("login")
    .where("email", "=", email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            db.select("*").from("users")
            .where("email", "=", email)
            .then(user =>{
                res.json(user[0]);
            })
            .catch(err =>{
                res.json("Unable to get user");
            })
        } else {
            res.json("Wrong username or password!");
        }
    })
    .catch(err =>{
        res.json("Wrong username or password!");
    })
}

module.exports = {
    handleSignIn
}