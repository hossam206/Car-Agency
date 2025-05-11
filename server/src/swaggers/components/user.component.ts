/**
 * @swagger
 * components:
 *   schemas:
 *     UserGetDto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6640a50bf37b96f3bb7d2c3b"
 *         email:
 *           type: string
 *           example: "amr@gmail.com"
 *         role:
 *           type: string
 *           example: "admin"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AddUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         email:
 *           type: string
 *           example: "amr@gmail.com"
 *         username:
 *           type: string
 *           example: "amr gamal"
 *         password:
 *           type: string
 *           example: "Amr123456789@"
 *         confirmPassword:
 *           type: string
 *           example: "Amr123456789@"
 *
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           example: "Amr123456789@"
 *         confirmPassword:
 *           type: string
 *           example: "Amr123456789@"
 *
 *
 *     LoginUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "amr@gmail.com"
 *         password:
 *           type: string
 *           example: "Amr123456789@"
 */
