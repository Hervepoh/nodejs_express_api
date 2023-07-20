npm init
npm install express --save
npm install -g nodemon
npm i sequelize --save
npm install --save-dev sequilize-cli
npx sequelize --help
npx sequelize init
npm i bcrypt
npm i async
npm i swagger-ui-express swagger-jsdoc
npm install nodemon swagger-parser swagger-routes-express swagger-ui-express
npm i swagger-autogen

npx sequelize model:create --attributes "email:string username:string password:string isAdmin:boolean" --name User
npx sequelize model:create --attributes "users_id:integer title:string content:string attachment:string likes:integer" --name Message


GENERER LA DOC SUR 
INSTALLER NODE SUR LE SERVEUR
INSTALLER NODEMON & LES DEPENDANCE  DU PROJET
INSTALLER NGINX


 /**
         * @swagger
         * /api/users/register/:
         *   post:
         *     summary: Create a user account
         *     description: Creation of a new user with 'email,username,password' ,  user account is an identity created for a person.
         *     requestBody:
         *       required: true
         *       content:
         *         application/x-www-form-urlencoded:
         *           schema:      
         *                  type: object
         *                  properties:
         *                 email:
         *                   type: string
         *                 username:
         *                   type: string
         *                   description: username of the user connecting to an eneopay account created in the system. This user includes admins, resellers, third parties
         *                 password:
         *                   type: string
         *                 password_confirm:
         *                   type: string
         *              example:   # Sample object
         *                 email: uat.user@test.com
         *                 username: uat.user
         *                 password: uat.user123
         *                 password_confirm: uat.user123
         *     responses:
         *       201:
         *         description: user indenty number.
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
         *                       userId:
         *                         type: integer
         *                         description: The user ID.
         *                         example: 1
         *                       username:
         *                         type: string
         *                         description: The user's name.
         *                         example: Leanne.Graham    
        */