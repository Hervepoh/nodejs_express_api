var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var customersCtrl = require('./routes/customersCtrl');
var debtCtrl = require('./routes/debtCtrl');
var wrCtrl = require('./routes/wrCtrl');
var messagesCtrl = require('./routes/messagesCtrl');

// Router
exports.router = (function () {
    const apiRouter = express.Router();

    /**
     * @swagger
     * /api:
     *   get:
     *     summary: Retrieve API description
     *     description: .
     *     responses:
     *       200:
     *         description: All usefull information about the API.
    */
    apiRouter.get('/', (req, res) => {
        //res.setHeader('Content-Type', 'text/html');
        res.status(200).send({ 'project': 'Perace-api' })
    });


    // Users routes

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register as user
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - email
     *               - password
     *               - password_confirm
     *             properties:
     *               username:
     *                 type: string
     *                 description: Must be unique
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Must be unique
     *               password:
     *                 type: string
     *                 format: password
     *                 minLength: 8
     *                 description: At least one number and one letter
     *               password_confirm:
     *                 type: string
     *                 format: password
     *                 description: Have to be equal to the password field
     *     responses:
     *       201:
     *         description: User created successfully!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 userId:
     *                   type: integer
     *                   description: The user ID.
     *                   example: 1
     *                 username:
     *                   type: string
     *                   description: The user's name.
     *       400:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Authentification Credential is not valid
     *       409:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: user already exist
     *       500:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: unable to verify user. Please contact the administrator
     */
    apiRouter.route('/auth/register').post(usersCtrl.register);

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login to get access token
     *     description: Authenticate to the API to acquire authentication token to access subsequent endpoint
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *                 description: username of the user connecting to an perace_api account created in the system. This user includes admins, third parties.
     *               password:
     *                 type: string
     *                 format: password
     *                 description: the corresponding password set during account creation
     *     responses:
     *       200:
     *         description: user indenty number.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 userId:
     *                   type: integer
     *                   description: The user ID.
     *                   example: 1
     *                 username:
     *                   type: string
     *                   description: The user's name.
     *       400:
     *         description: username == null || password == null .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: missing parameters
     *       403:
     *         description: Invalid password.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Invalid password
     *       404:
     *         description: username not exist.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: user not exist in DB
     *       500:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Cannot log with this user account. Please contact the administrator.
     */
    apiRouter.route('/auth/login').post(usersCtrl.login);

    /**
     * @swagger
     * /api/auth/me:
     *   get:
     *     summary: get User Profile information.
     *     description: Retrieve the user informations.
     *     tags:
     *       - Auth
     *     security:
     *       - bearerAuth: [] 
     *     responses:
     *       200:
     *         description: user indenty number.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 userId:
     *                   type: integer
     *                   description: The user ID.
     *                   example: 1
     *                 username:
     *                   type: string
     *                   description: The user's name.
     *                 email:
     *                   type: string
     *                   description: The user's email.
     *       401:
     *         description: Access token is missing or invalid
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Authorization information is missing or invalid.
     *       404:
     *         description: Ressource not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: User not found
     *       500:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Cannot fetch user account. Please contact the administrator.
     */
    apiRouter.route('/auth/me').get(usersCtrl.getUserProfile);

    /**
     * @swagger
     * /api/auth/me:
     *   put:
     *     summary: Update User Profile information.
     *     description: Update User information.
     *     tags:
     *       - Auth
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: email of the user connecting to an perace_api account created in the system. This user includes admins, third parties.
     *               password:
     *                 type: string
     *                 format: password
     *                 description: the corresponding password set during account creation
     *     responses:
     *       200:
     *         description: Update user information (email,password).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 userId:
     *                   type: integer
     *                   description: The user ID.
     *                   example: 1
     *                 email:
     *                   type: string
     *                   description: The user's email.
     *                 password:
     *                   type: string
     *                   description: The user's password.
     *                 updatedAt:
     *                   type: date
     *                   description: The user's updated at.
     *       400:
     *         description: 
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: missing parameters
     *       404:
     *         description: username not exist.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Ressource not found
     *       500:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: cannot update user.Please contact the administrator.
     */
    apiRouter.route('/auth/me').put(usersCtrl.updateUserProfile);


    // Customer routes

    /**
     * @swagger
     * /api/customerInfos/list/:
     *   get:
     *     summary: All customer information
     *     tags:
     *       - customerInfos
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: limit
     *         description: The numbers of items to return
     *         schema:
     *           type: integer
     *       - in: query
     *         name: offset
     *         description: The number of items to skip before starting to collect the result set
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of Customer informations
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                  type: object
     *       401:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Authentification Credential is not valid
     *       500:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: unable to verify user. Please contact the administrator
     */
    apiRouter.route('/customerInfos/list/').get(customersCtrl.list);

    /**
     * @swagger
     * /api/customerInfos/count/:
     *   get:
     *     summary: Count customer.
     *     description: Retrieve the number of customers.
     *     tags:
     *       - customerInfos
     *     security:
     *       - bearerAuth: []     
     *     responses:
     *       200:
     *         description: Totalnumber of customers.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                  type: object
     *                  properties:
     *                     NB:
     *                       type: integer
     *                       description: Count Customers.
     */
    apiRouter.route('/customerInfos/count/').get(customersCtrl.count);

    /**
     * @swagger
     * /api/customerInfos/recap/:
     *   get:
     *     summary: Customer information Recap.
     *     description: Retrieve recap.
     *     tags:
     *       - customerInfos
     *     security:
     *       - bearerAuth: []     
     *     responses:
     *       200:
     *         description: Totalnumber of customers.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                  type: object
     *                  properties:
     *                     region:
     *                       type: string
     *                     division:
     *                       type: string
     *                     agence:
     *                       type: string
     *                     count:
     *                       type: integer
     */
    apiRouter.route('/customerInfos/recap/').get(customersCtrl.recap);


    // debt routes

    /**
     * @swagger
     * /api/debt/list/:
     *   get:
     *     summary: All debt information
     *     tags:
     *       - Debt
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: limit
     *         description: The numbers of items to return
     *         schema:
     *           type: integer
     *       - in: query
     *         name: offset
     *         description: The number of items to skip before starting to collect the result set
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of Customer informations
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                  type: object
     *       401:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Authentification Credential is not valid
     *       500:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: unable to verify user. Please contact the administrator
     */
    apiRouter.route('/debt/list/').get(debtCtrl.list);

    /**
     * @swagger
     * /api/debt/count/:
     *   get:
     *     summary: Count debt.
     *     description: Retrieve the number of debt.
     *     tags:
     *       - Debt
     *     security:
     *       - bearerAuth: []     
     *     responses:
     *       200:
     *         description: Totalnumber of debt.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                  type: object
     *                  properties:
     *                     NB:
     *                       type: integer
     *                       description: Count debt.
     */
    apiRouter.route('/debt/count/').get(debtCtrl.count);

    /**
     * @swagger
     * /api/debt/contrat/:contrat:
     *   get:
     *     summary: Count customer.
     *     description: Retrieve the number of debt.
     *     tags:
     *       - customerInfos
     *     security:
     *       - bearerAuth: []     
     *     responses:
     *       200:
     *         description: Totalnumber of customers.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                  type: object
     *                  properties:
     *                     NB:
     *                       type: integer
     *                       description: Count Customers.
     */
    apiRouter.route('/debt/contrat/:contrat').get(debtCtrl.contrat);

    
    /**
     * @swagger
     * /api/wr/list/:
     *   get:
     *     summary: All wr information
     *     tags:
     *       - wr
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: limit
     *         description: The numbers of items to return
     *         schema:
     *           type: integer
     *       - in: query
     *         name: offset
     *         description: The number of items to skip before starting to collect the result set
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of Customer informations
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                  type: object
     *       401:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: Authentification Credential is not valid
     *       500:
     *         description: .
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: unable to verify user. Please contact the administrator
     */
    apiRouter.route('/wr/list/').get(wrCtrl.list);
    /**
     * @swagger
     * /users/me/:
     *   get:
     *     summary: get User Profile information.
     *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
     *     responses:
     *       200:
     *         description: A list of users.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: integer
     *                         description: The user ID.
     *                         example: 0
     *                       name:
     *                         type: string
     *                         description: The user's name.
     *                         example: Leanne Graham
     */
    apiRouter.route('/wr/count/').get(customersCtrl.count);
    /**
     * @swagger
     * /users/me/:
     *   get:
     *     summary: get User Profile information.
     *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
     *     responses:
     *       200:
     *         description: A list of users.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: integer
     *                         description: The user ID.
     *                         example: 0
     *                       name:
     *                         type: string
     *                         description: The user's name.
     *                         example: Leanne Graham
     */
    apiRouter.route('/wr/id/:wr_id').get(customersCtrl.recap);

    // Messages routes
    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessages);

    return apiRouter;

})();