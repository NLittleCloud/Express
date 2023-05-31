const swaggerJSDoc = require("swagger-jsdoc");

/**
 * @swagger
 * /models:
 *   get:
 *     tags:
 *       - info_models
 *     summary: Brief display of all models
 *     description: "Returns fields: id, Uname, Comment of each model"
 *     operationId: showModel
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/info_models'
 *       '404':
 *         description: No models found
 *       '500':
 *         description: Internal server error
 *   post:
 *     tags:
 *       - info_models
 *     summary: Create a new model
 *     operationId: insertModel
 *     parameters:
 *       - name: Uname
 *         in: query
 *         description: User name
 *         required: true
 *         schema:
 *           type: string
 *       - name: Mname
 *         in: query
 *         description: Model name
 *         required: true
 *         schema:
 *           type: string
 *       - name: Mtype
 *         in: query
 *         description: Model type
 *         required: true
 *         schema:
 *           type: string
 *       - name: Object
 *         in: query
 *         description: Object
 *         required: true
 *         schema:
 *           type: string
 *       - name: Owerview
 *         in: query
 *         description: Model description
 *         required: true
 *         schema:
 *           type: string
 *       - name: Comment
 *         in: query
 *         description: Commentary to the model
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/info_models'
 *       '401':
 *         description: Invalid API key
 *       '500':
 *         description: Internal server error
 *     security:
 *       - apiKey: []
 *       
 * /models/{id}:
 *   get:
 *     tags:
 *       - info_models
 *     summary: Find model by ID
 *     description: Returns all information about a specific model
 *     operationId: findbyidModel
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the model to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/info_models'
 *       '404':
 *         description: No models found
 *       '500':
 *         description: Internal server error
 *   put:
 *     tags:
 *       - info_models
 *     summary: Change model by ID
 *     operationId: updateModel
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the model to retrieve
 *         schema:
 *           type: string
 *       - name: Uname
 *         in: query
 *         description: User name
 *         required: true
 *         schema:
 *           type: string
 *       - name: Mname
 *         in: query
 *         description: Model name
 *         schema:
 *           type: string
 *       - name: Mtype
 *         in: query
 *         description: Model type
 *         schema:
 *           type: string
 *       - name: Object
 *         in: query
 *         description: Object
 *         required: true
 *         schema:
 *           type: string
 *       - name: Owerview
 *         in: query
 *         description: Model description
 *         schema:
 *           type: string
 *       - name: Comment
 *         in: query
 *         description: Commentary to the model
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/info_models'
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Model not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - apiKey: []
 *     
 *   delete:
 *     tags:
 *       - info_models
 *     summary: Delete model by ID
 *     operationId: deletebyidModel
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the model to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Model deleted successfully
 *       '401':
 *         description: Invalid API key
 *       '404':
 *         description: Model not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - apiKey: []
 *     
 * /api:
 *   post:
 *     tags:
 *       - api_keys
 *     summary: Create new apiKey
 *     requestBody:
 *       required:
 *         - name
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api_keys'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api_keys'         
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *          
 * /api/{id}:
 *   delete:
 *     tags:
 *       - api_keys
 *     summary: Delete apiKey
 *     operationId: deleteApi
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the key to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api_keys'         
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
			title: "Express Server - Kuznetsova",
			version: "1.0.0"
	},
	servers: [
			{url: "http://127.0.0.1:5500/db"}
	],
	tags: [
			{ name: "api_keys", description: "Everything about apiKey"},
			{ name: "info_models", description: "Everything about our models"}
	],
	components: {
			schemas: {
				info_models: {
							type: "object",
							properties: {
							Uname: 		 { type: "string", description: "User name",  example: "Veronika"},
							Mname:     { type: "string", description: "Model name", example: "My model"},
							Mtype:     { type: "string", description: "Model type", example: "Threejs"},
							Object:    { type: "string", description: "Object",     example: "cube"},
							Owerview:  { type: "string", description: "Model description",       example: "Сube model created with threejs"},
							Comment:   { type: "string", description: "Commentary to the model", example: "It is desirable to choose a different color"}
							}
					},
					api_keys: {
							type: "object",
							properties: {
									name: { type: "string", description: "User name",	  example: "Veronika"}
							}
					}
			},
			securitySchemes: {
				apiKey: {
							type: "apiKey",
							name: "apiKey",
							in: "query"
					}
			}
	}
};

const options = {
	swaggerDefinition,
	apis: ["./*.js"]
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;