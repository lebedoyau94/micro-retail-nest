"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceMessage = createServiceMessage;
exports.createSuccessResponse = createSuccessResponse;
exports.createErrorResponse = createErrorResponse;
const crypto_1 = require("crypto");
/**
 * Crea un mensaje de servicio con correlationId único.
 */
function createServiceMessage(payload) {
    return {
        correlationId: (0, crypto_1.randomUUID)(),
        payload,
        timestamp: Date.now(),
    };
}
/**
 * Crea una respuesta de éxito estándar.
 */
function createSuccessResponse(correlationId, data) {
    return {
        correlationId,
        data,
        success: true,
    };
}
/**
 * Crea una respuesta de error estándar.
 */
function createErrorResponse(correlationId, error) {
    return {
        correlationId,
        data: null,
        success: false,
        error,
    };
}
