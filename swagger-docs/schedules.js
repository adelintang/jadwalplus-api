/**
* @swagger
* components:
*   schemas:
*     ListSchedules:
*       type: array
*       items:
*         type: object
*         properties:
*           id:
*             type: string
*             example: bsdhbcj566363
*           schedule:
*             type: string
*             example: nobar bola
*           dateTime:
*             type: string
*             example: 2023-11-14T14:00:10.690Z
*           finished:
*             type: boolean
*             example: false
*           createdAt:
*             type: string
*             example: 2023-11-14T14:00:10.690Z
*     scheduleItem:
*       type: object
*       properties:
*         id:
*           type: string
*           example: bsdhbcj566363
*         schedule:
*           type: string
*           example: Rapat BEM
*         dateTime:
*           type: string
*           example: 2023-11-14T14:00:10.690Z
*         finished:
*           type: boolean
*           example: false
*         createdAt:
*           type: string
*           example: 2023-11-14T14:00:10.690Z
*     scheduleBody:
*       type: object
*       properties:
*         schedule:
*           type: string
*           example: main bola
*         dateTime:
*           type: string
*           example: 2023-11-14T14:00:10.690Z
*     badAuthenticationResponse:
*       type: object
*       properties:
*         status:
*           type: string
*           example: fail
*         message:
*           type: string
*           example: any message for authentication error
*     badPayloadResponse:
*       type: object
*       properties:
*         status:
*           type: string
*           example: fail
*         message:
*           type: string
*           example: any message for bad payload
*     scheduleNotFoundError:
*       type: object
*       properties:
*         status:
*           type: string
*           example: fail
*         message:
*           type: string
*           example: Schedule tidak ditemukan
*/

/**
* @swagger
* tags:
*   name: Schedules
*   description: The Schedules managing API
*/

/**
* @swagger
* /api/v1/schedules:
*   get:
*     summary: Return data schedules from user authenticate
*     tags: [Schedules]
*     responses:
*       200:
*         description: get all data schedule
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ListSchedules'
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*/

/**
* @swagger
* /api/v1/schedules:
*   post:
*     summary: Add new schedule
*     tags: [Schedules]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/scheduleBody'
*     responses:
*       201:
*         description: Success add schedule
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
*                   example: Schedule berhasil ditambahkan
*                 data:
*                   type: object
*                   properties:
*                     schedules:
*                       $ref: '#/components/schemas/scheduleItem'
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       400:
*         description: Bad body payload
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badPayloadResponse'
*/

/**
* @swagger
* /api/v1/schedules/{id}:
*   get:
*     summary: Get schedule by id
*     tags: [Schedules]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: the schedule id
*         schema:
*           type: string
*           minimum: 15
*     responses:
*       200:
*         description: Find schedule
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
*                     schedules:
*                       $ref: '#/components/schemas/scheduleItem'
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       404:
*         description: Not found error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/scheduleNotFoundError'
*/

/**
* @swagger
* /api/v1/schedules/{id}:
*   patch:
*     summary: checklist schedule finished
*     tags: [Schedules]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: the schedule id
*         schema:
*           type: string
*           minimum: 15
*     responses:
*       200:
*         description: checklist success
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
*                     id:
*                       type: string
*                       example: jhsdhj6328747fhhf
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       404:
*         description: Not found error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/scheduleNotFoundError'
*/

/**
* @swagger
* /api/v1/schedules/{id}:
*   delete:
*     summary: Delete schedule by id
*     tags: [Schedules]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: the schedule id
*         schema:
*           type: string
*           minimum: 15
*     responses:
*       200:
*         description: delete schedule success
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
*                   example: Schedule berhasil dihapus
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: string
*                       example: jhsdhj6328747fhhf
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       404:
*         description: Not found error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/scheduleNotFoundError'
*/

/**
* @swagger
* /api/v1/schedules/{id}:
*   put:
*     summary: Update schedule by id
*     tags: [Schedules]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: the schedule id
*         schema:
*           type: string
*           minimum: 15
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/scheduleBody'
*     responses:
*       200:
*         description: Update schedule success
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
*                   example: Schedule berhasil diperbarui
*                 data:
*                   type: object
*                   properties:
*                     schedules:
*                       $ref: '#/components/schemas/scheduleItem'
*       401:
*         description: Authentication error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badAuthenticationResponse'
*       404:
*         description: Not found error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/scheduleNotFoundError'
*       400:
*         description: Bad body payload
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/badPayloadResponse'
*/
