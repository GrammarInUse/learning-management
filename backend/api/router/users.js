const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const VerifyEmail = require("../../services/send-email");
const verifyAuth = require("../../middlewares/verifyAuth");
const multer = require("multer");
const mime = require("mime");
const fs = require("fs");

const Users = require("../../models/users");
const Information = require("../../models/information");

router.get("/:id", verifyAuth, async (req, res, next) => {
    const userInformation = await Information.findByPk(req.params.id);
    const userTemp = await Users.findByPk(req.params.id);
    var sex = null;
    if(userInformation.sex){
        sex = "Nam";
    }else{
        sex = "Nữ";
    }

    if(userInformation){
        res.status(200).json({
            fullName: userInformation.fullName,
            dOB: userInformation.dOB,
            sex,
            job: userInformation.job,
            address: userInformation.address,
            email: userTemp.email,
            phone: userInformation.phone,
            avatar: userTemp.avatar
        });
    }else{
        next();
    }
});

router.post("/login", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const tempUser = await Users.findAll({
        where: {
            username
        }
    });

    if(tempUser.length <= 0){
        res.status(404).json({
            userMessage: "Username not found!!!"
        });
    }else if(tempUser[0].verifyToken !== ""){
        res.status(422).json({
            userMessage: "Username haven't been verified yet!!! Check your email to verify account!"
        });
    }else{
        if(await bcrypt.compare(password, tempUser[0].password)){
            const token = jwt.sign({
                username: tempUser[0].username,
                password: tempUser[0].password
            }, "mysecret", {
                expiresIn: "1hr",
                algorithm: "HS256"
            });

            res.status(200).json({
                userMessage: "Successfully Logged in!!!",
                token,
                userData: {
                    id: tempUser[0].id
                }
            });
        }else{
            res.status(422).json({
                userMessage: "Wrong password!!!"
            });
        }
    }
});

router.post("/", async (req, res, next) => {
    const id = Date.now();
    const username = req.body.username;
    const password = req.body.password;
    const comfirmPassword = req.body.comfirmPassword;
    const email = req.body.email;
    const verifyToken = crypto.randomBytes(3).toString('hex').toUpperCase();
    const dOB = req.body.dOB;

    const usernameChecking = await Users.findAll({
        where: {
            username
        }
    });
    const emailChecking = await Users.findAll({
        where: {
            email
        }
    });
    const comfirmPasswordChecking = password === comfirmPassword;

    if(!username){
        res.status(404).json({
            userMessage: "Vui lòng nhập username!!!"
        });
    }
    if(!password){
        res.status(404).json({
            userMessage: "Vui lòng nhập password!!!"
        });
    }
    if(!email){
        res.status(404).json({
            userMessage: "Vui lòng nhập email!!!"
        });
    }
    if(usernameChecking.length >= 1){
        res.status(404).json({
            userMessage: "Username đã tồn tại!!!"
        });
    }
    if(emailChecking.length >= 1){
        res.status(404).json({
            userMessage: "Email đã tồn tại!!!"
        })
    }
    if(!comfirmPasswordChecking){
        res.status(404).json({
            userMessage: "Password nhập lại không đúng!!!"
        })
    }

    

    const tempUser = await Users.findAll({
        where: {
            username
        }
    })

    if(tempUser.length <= 0 && comfirmPasswordChecking){
        await Users.create({
            id,
            username, 
            password: await bcrypt.hash(password, 10), 
            email,
            verifyToken
        })
        .then(() => {
            console.log("Successfully created an account");
        })
        .catch((err) => {
            console.log("Something went wrong when you created an account: " + err);
            res.status(400).json({
                userMessage: "Something went wrong! Please try it again, we really sorry about that!!!"
            });
        });

        await Information.create({
            id,
            dOB
        })
        .then(async () => {
            console.log("Successfully created an information");
            
            const newUser = await Users.findByPk(id.toString())
            .then(console.log("DONE"))
            .catch((err) => {
                console.log(err);
            });
            console.log("USER: ");
            console.log(newUser);
            
            await VerifyEmail(newUser)
            .then(() => {
                console.log("SENT VERIFY MAIL...");
            })
            .catch((err) => {
                console.log("Something went wrong when you sent verify mail!!!" + err);
            });

            res.status(200).json({
                userMessage: "Successfully created an account!!!"
            });
        })
        .catch((err) => {
            console.log("Something went wrong when you created an information: " + err);

            res.status(400).json({
                userMessage: "Something went wrong! Please try it again, we really sorry about that!!!"
            });
        });

        
    }else{
        next();
    }
});

router.patch("/profile/:id", async (req, res, next) => {
    const tempUser = await Information.findByPk(req.params.id);
    const newFullName = req.body.fullName;
    const newPhone = req.body.phone;
    
    if(!newFullName && !newPhone){
        res.status(404).json({
            userMessage: "You have to fill at least one blank!"
        });
    }else if(!newFullName && newPhone){
        tempUser.phone = newPhone;
    }else if(newFullName && !newPhone){
        tempUser.fullName = newFullName;
    }else{
        tempUser.phone = newPhone;
        tempUser.fullName = newFullName;
    }

    await tempUser.save()
    .then(() => {
        res.status(200).json({
            userMessage: "Successfully updated your profile!"
        });
    })
    .catch((err) => {
        res.status(404).json({
            userMessage: "Something went wrong when you update fullname and phone"
        });
    });
});

router.patch("/password/:id", async (req, res, next) => {
    const tempUser = await Users.findByPk(req.params.id);
    const newPassword = req.body.newPassword;
    const newComfirmPassword = req.body.newComfirmPassword;

    if(newPassword !== newComfirmPassword){
        res.status(404).json({
            userMessage: "2 passwords aren't match!! PLz check it again!!!"
        });
    }
    
    tempUser.password = await bcrypt.hash(newPassword, 10);

    await tempUser.save()
    .then(() => {
        res.status(200).json({
            userMessage: "Successfully updated password!"
        });
    })
    .catch((err) => {
        res.status(404).json({
            userMessage: "Something went wrong when you update password"
        });
    });
});

router.get("/:id/:verifyToken", async (req, res, next) => {
    const id = req.params.id;
    const verifyToken = req.params.verifyToken;

    const tempUser = await Users.findByPk(id);
    tempUser.verifyToken = "";
    tempUser.save()
    .then(() => {
        console.log("Successfully Verified Account");

        res.status(200).json({
            userMessage: "Successfully verified Account"
        });
    })
    .catch((err) => {
        console.log(err);

        res.status(200).json({
            userMessage: "Failed verified Account",
            error: err
        });
    });
});

router.post("/upload", async (req, res) => {
    const img = req.body.img;
    const userId = req.body.userId;
    var matches = img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};
    console.log(img);
    if(!img){
        res.status(404).json({
            userMessage: "Ảnh quá lớn hoặc sai định dạng!!!"
        });
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = "avatar." + extension;

    const tempUser = await Users.findByPk(userId);
    tempUser.avatar = img;
    await tempUser.save()
    .then(() => {
        res.status(200).json({
            userMessage: "DONE"
        });
    })
    .catch(err => {
        res.status(200).json({
            userMessage: "ERR " + err
        });
    });
    res.status(200).json({
        userMessage: "ERR "
    });
});

module.exports = router;