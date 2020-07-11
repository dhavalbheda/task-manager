// const sgMail = require('@sendgrid/mail')

// const sendgridAPIKey = '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'

// sgMail.setApiKey(sendgridAPIKey)
// // const call = async()=>{
    
// //  sgMail.send({
// //     to:'amankamaniak@gmail.com',
// //     from:'dhavalb1999@gmail.com',
// //     subject:'This Is From Node Js',
// //     text:'Hello Amana Bt thing is "Amana Kamani Khichadi Gandhani" '
// // }).then(()=> console.log("hello")).catch(e => console.log(e))
// // }
// // try{
// //     call()
// // }catch(e)
// // {
// //     console.log(e)
// // }
// // // 
// sgMail.send({
//     to:'amankamaniak@gmail.com',
//     from:'dhavalb1999@gmail.com',
//     attachments: [],
//     subject: 'testing sendgrid',
//     html: '<html><head></head><body></body></html>'
// }, function(error) {
//     if (error) {
//         console.error(error);
//     }
// });