const scheduleInterviewSchema = require('../../model/scheduleInterview');

const getScheduledInterviews = async (req,res) => {
    try {
        const aggregate = [
            {
                $lookup: {
                    from: 'user',
                    let: {
                        'interviewer': '$interviewer',
                        'candidate': '$candidate',
                        pipeline: [{
                            $match: {
                                $or: [{ _id: '$interviewer' }, { _id: '$candidate' }]
                            }
                        }]
                    },
                    as:'candidate'
                }
            }
        ]

    const response = await scheduleInterviewSchema.aggregate(aggregate);
    return res.status(200).json({response});
    } catch (err) {
        return res
            .status(400)
            .json({ "error": err.message })
    }
}

module.exports = getScheduledInterviews;