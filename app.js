const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));


const port = process.env.PORT || 3000;


app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html");
    console.log(__dirname + '/assets')
})

app.post('/', (req,res) => {
    console.log(req.body)
    const {name, email, message} = req.body;

    //transporter. used to send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'pppabloar@gmail.com',
            pass: 'cjblzermbzttieep'
        }
    })

    //Define email message
    const mailOptions = {
        from: email,
        to: 'pppabloar@gmail.com',
        subject: `Mensaje Pabloar Dev de ${name}`,
        text: message
    }

    //enviar el mensaje
    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error);
            res.send('Error: Could not send mail');
        }
        else {
            console.log('Email sent successfully')
            res.send('Message sent successfully');
        }
    });

    res.sendFile(__dirname + "/index.html");

})

app.listen(port,() => {
    console.log('server started on port ' + port);
})

