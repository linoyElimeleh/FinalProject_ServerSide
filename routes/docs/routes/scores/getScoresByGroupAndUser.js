module.exports = {
    get: {
        tags: ['Scores'],
        description: 'Get user and group score',
        operationId: 'getScoresByGroupAndUser',
        parameters: [
            {
                "name": "group_id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "group id"
            },
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
                            $ref: '#components/schemas/addNewScore'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
}