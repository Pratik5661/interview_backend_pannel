const scheduleInterviewSchema = require('../../model/scheduleInterview');

const scheduleInterview = async(req,res)=>{
    try{
        const response = await scheduleInterviewSchema.create(req.body);
        if(response){
            res.status(200).json({success: true, message:'interview scheduled successfully'});
        } else{
            res.status(200).json({success: false , message:'unable to schedule interview'})
        }
    } catch(err){
        return res
        .status(400)
        .json({ "error": err.message })
    }
}


module.exports = scheduleInterview;