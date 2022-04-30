module.exports = {
    get: {
        tags: ['Scores'],
        description: 'Get user score',
        operationId: 'getTotalScoresByUser',
        parameters: [
            {
                "name": "user_id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "user id"
            }
        ],
        responses: {
            '200': {
                description: "Get Scores Request Successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/getTotalScores'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
}