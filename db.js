let mongoose = require('mongoose');
// mongodb+srv://user:<password>@cluster0.4jiauki.mongodb.net/?retryWrites=true&w=majority
// let connection = 
mongoose.connect('mongodb+srv://user:interviewPanel@cluster0.4jiauki.mongodb.net/interview_panel/?retryWrites=true&w=majority',
{
newUseUrlParser : true,
useUnifiedTopology : true
}
).then(()=>{console.log('success')})

// mongodb+srv://user:interviewPanel@cluster0.4jiauki.mongodb.net/interview_panel/?retryWrites=true&w=majority

// Pratik@5661  
// 103.203.255.62/32
// mongodb+srv://user:<password>@cluster0.4jiauki.mongodb.net/?retryWrites=true&w=majority