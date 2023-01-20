const res = require('express/lib/response');
const userSchema = require('../model/user');


const getDashboardData = async (req, res) => {
    try {
        let aggregate = [{
            $facet: {
                totalResume: [
                    {
                        $match: {
                            role: 'Developer',
                            resume: {
                                $ne: ''
                            }
                        }
                    }, {
                        $count: 'total'
                    },
                ],
                totalDevelopers: [
                    {
                        $match: {
                            role: 'Developer',
                        }
                    },
                    {
                        $count: 'total'
                    },

                ],
                totalInterviewer: [
                    {
                        $match: {
                            role: 'Interviewer',
                        }
                    },
                    {
                        $count: 'total'
                    },

                ],
                totalProfiles: [
                    {
                        $match: {
                            $or: [{ role: 'Developer' }, { role: 'Interviewer' }],
                        }
                    },
                    {
                        $count: 'total'
                    },

                ]
            }
        },
        ]

        const response = await userSchema.aggregate(aggregate)
        res.status(200).json({status:'success', data: response[0]})
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

module.exports = getDashboardData;