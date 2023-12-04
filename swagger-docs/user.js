/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - email
*         - username
*         - password
*       properties:
*         id:
*           type: string
*           description: The auto-generated id of the user
*         email:
*           type: string
*           description: The user email
*         username:
*           type: string
*           description: The user username
*         password:
*           type: string
*           description: The user password
*       example:
*         id: 7483742gbfbfhbvbvbf
*         email: example@gmail.com
*         username: exampleuser
*         password: securePassword
*     userSignup:
*       type: object
*       properties:
*         email:
*           type: string
*           example: example@gmail.com
*         username:
*           type: string
*           example: exampleuser
*         password:
*           type: string
*           example: securePassword
*     userSignin:
*       type: object
*       properties:
*         email:
*           type: string
*           example: example@gmail.com
*         password:
*           type: string
*           example: securePassword
*     badPayloadResponse:
*       type: object
*       properties:
*         status:
*           type: string
*           example: fail
*         message:
*           type: string
*           example: any message for bad payload
*     badAuthenticationResponse:
*       type: object
*       properties:
*         status:
*           type: string
*           example: fail
*         message:
*           type: string
*           example: any message for authentication error
*     userNotFoundError:
*       type: object
*       properties:
*         status:
*           type: string
*           example: fail
*         message:
*           type: string
*           example: User not found
*/

/**
* @swagger
* tags:
*   name: User
*   description: The user managing API
*/

/**
* @swagger
* /api/v1/signup:
*   post:
*     summary: Return the message registration user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/userSignup'
*     responses:
*       201:
*         description: The new user registred
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 message:
*                   type: string
*                   example: Berhasil mendaftar
*       409:
*         description: The email or user alredy used
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: fail
*                 message:
*                   type: string
*                   example: Email atau Username sudah digunakan
*       400:
*         description: The bad body payload
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badPayloadResponse'
*/

/**
* @swagger
* /api/v1/signin:
*   post:
*     summary: Return the message and authentication user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/userSignin'
*     responses:
*       200:
*         description: The user authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 message:
*                   type: string
*                   example: 'Berhasil masuk'
*                 data:
*                   type: object
*                   properties:
*                     accessToken:
*                       type: string
*                       example: hbAUIHSHjd23244.858HDNJhdscd.jsdnfn464
*       401:
*         description: The email or password wrong
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: fail
*                 message:
*                   type: string
*                   example: Gagal masuk. Email atau Password salah
*       400:
*         description: The bad body payload
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badPayloadResponse'
*/

/**
* @swagger
* /api/v1/user:
*   get:
*     summary: Return user data authenticate
*     tags: [User]
*     responses:
*       200:
*         description: User data authenticate
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 data:
*                   type: object
*                   properties:
*                     user:
*                       type: object
*                       properties:
*                         email:
*                           type: string
*                           example: example@gmail.com
*                         username:
*                           type: string
*                           example: exampleuser
*       401:
*         description: Auhtentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       404:
*         description: User not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/userNotFoundError'
*/

/**
* @swagger
* /api/v1/user:
*   delete:
*     summary: Delete user account
*     tags: [User]
*     responses:
*       200:
*         description: Delete account
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 message:
*                   type: string
*                   example: User berhasil dihapus
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       404:
*         description: User not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/userNotFoundError'
*/

/**
* @swagger
* /api/v1/user:
*   patch:
*     summary: Update User Password
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               oldPassword:
*                 type: string
*                 example: example123
*               newPassword:
*                 type: string
*                 example: example345
*     responses:
*       200:
*         description: Update success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 message:
*                   type: string
*                   example: Password berhasil dihapus
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       404:
*         description: User not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/userNotFoundError'
*       400:
*         description: Bad body payload
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badPayloadResponse'
*/
