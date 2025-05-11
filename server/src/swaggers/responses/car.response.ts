/**
 * @swagger
 * components:
 *   schemas:
 *    BaseResponse:
 *      description: Successful operation
 *      type: object
 *      properties:
 *        statusText:
 *          type: string
 *          enum: [ "Ok", "Created", "BadRequest", "NotFound", "Conflict", "Unauthorized", "InternalServerError" ]
 *        status:
 *          type: number
 *          enum: [200, 201, 400, 404, 409, 401, 500]
 *        success:
 *          type: boolean
 *          enum: [true, false]
 *        message:
 *          type: string
 *        data:
 *          type: object
 *
 *
 *    CarResponse:
 *       description: Job Interview Response
 *       responses:
 *         200:
 *           description: Successful interview response
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                   - $ref: '#/components/schemas/BaseResponse'
 *                   - type: object
 *                     properties:
 *                       data:
 *                         $ref: '#/components/schemas/VehicleCertificateGetDto'
 * 
 *    CarCertificateResponse:
 *       description: Vehicle certificate as PDF
 *       content:
 *         application/pdf:
 *           schema:
 *             type: string
 *             format: binary
 */

