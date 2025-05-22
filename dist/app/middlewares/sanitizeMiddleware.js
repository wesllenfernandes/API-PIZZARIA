"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sanitizehtml = require('sanitize-html'); var _sanitizehtml2 = _interopRequireDefault(_sanitizehtml);

const sanitizeMiddleware = (req, res, next) => {
    Object.keys(req.body).forEach((key) => {
        if (typeof req.body[key] === 'string') {
            req.body[key] = _sanitizehtml2.default.call(void 0, req.body[key], {
                allowedTags: [], // Remove todas as tags
                allowedAttributes: {} // Remove todos os atributos
            });
        }
    });
    next();
};
exports. default = sanitizeMiddleware;