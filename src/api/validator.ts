
export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            params: req.params
        });
        return next();
    } catch (err: any) {
        return res.status(500).json({ type: err.name, message: err.message });
    }
};