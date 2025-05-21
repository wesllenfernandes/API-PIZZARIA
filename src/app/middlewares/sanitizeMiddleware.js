import sanitizeHtml from 'sanitize-html';

const sanitizeMiddleware = (req, res, next) => {
    Object.keys(req.body).forEach((key) => {
        if (typeof req.body[key] === 'string') {
            req.body[key] = sanitizeHtml(req.body[key], {
                allowedTags: [], // Remove todas as tags
                allowedAttributes: {} // Remove todos os atributos
            });
        }
    });
    next();
};
export default sanitizeMiddleware;