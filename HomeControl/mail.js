var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'potetmann1@gmail.com',
        pass: 'Hvk1sbd2'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Postkasse <potetmann1@gmail.com>', // sender address
    to: 'ole.bauck@gmail.com', // list of receivers
    subject: 'Ny post', // Subject line
    text: 'Det ligger post til deg i postkassen :)',
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
