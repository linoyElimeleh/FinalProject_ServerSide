module.exports = {
    get: {
        tags: ['Groups'],
        description: 'Get data and team members about the group',
        operationId: 'groups',
        parameters: [
            {
                "name": "id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "group id"
            }
        ],
        responses: {
            '200': {
                description: "Get Groups Teams successful",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/GroupData'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
    put: {
        tags: ['Groups'],
        description: 'Update exist group',
        operationId: 'groups',
        parameters: [
            {
                "name": "userId",
                "in": "query",
                "type": "string",
                "required": true,
                "description": "user id must be admin"
            },
            {
                "name": "id",
                "in": "path",
                "type": "string",
                "required": true,
                "description": "group id"
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/CreateNewGroup'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Group Updated successfully",
            }
        },
        security: [{bearerAuth: []}]
    },

}