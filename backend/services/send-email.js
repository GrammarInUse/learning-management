const nodeMailer = require("nodemailer");

async function Send(user){
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sangngo01693166366@gmail.com',
            pass: 'Taolatao0' 
        }
    });

    const url = "http://localhost:8080/users/" + user.id + "/" + user.verifyToken;

    return transporter.sendMail({
        from: 'me <sangngo01693166366@gmail.com>',
        to: user.email,
        subject: 'Xác thực tài khoản TODOAPP - NTS',
        text: 'Liên kết vào link sau để kích hoạt tài khoản: ' + url,
    }).then(console.log("Gui thanh cong")).catch("Gui khong duoc"); 
}

module.exports = Send;



