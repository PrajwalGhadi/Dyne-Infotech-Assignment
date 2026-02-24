// This is what you use to WRAP your controllers
module.exports = (fn) => {
    return (req, res, next) => {
        // It executes your controller and .catches any error
        // Then it passes that error to next(), which hits your Global Handler
        fn(req, res, next).catch(next);
    };
};