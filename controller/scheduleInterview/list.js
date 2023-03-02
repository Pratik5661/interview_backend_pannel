const scheduleInterviewSchema = require('../../model/scheduleInterview');

const getScheduledInterviews = async (req, res) => {
    try {
        const aggregate = [
            {
                $lookup: {
                    from: 'user',
                    let: {
                        'interviewerId': '$interviewer',
                        'candidateId': '$candidate',
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $or: [{ $eq: ['$_id', '$$interviewerId'] }, { $eq: ['$_id', '$$candidateId'] }]
                            }
                        }
                    }],
                    as: 'candidate'
                }
            },
            {
                $addFields: {
                    'interviewer': {
                        $arrayElemAt: [{
                            $filter: {
                                input: '$candidate',
                                as: 'user',
                                cond: { $eq: ['$$user.role', 'Interviewer'] }
                            }
                        }, 0]
                    }
                }
            },
            {
                $addFields: {
                    candidate: {
                        $arrayElemAt: [{
                            $filter: {
                                input: '$candidate',
                                as: 'user',
                                cond: { $eq: ['$$user.role', 'Developer'] }
                            }
                        }, 0]

                    }
                }
            }
        ]

        const response = await scheduleInterviewSchema.aggregate(aggregate);

        return res.status(200).json({ message: 'Interviews', interviews: response, success: true });
    } catch (err) {
        return res
            .status(400)
            .json({ "error": err.message })
    }
}

module.exports = getScheduledInterviews;