var validator = require('joi');

let logger = require("../services/logger");
exports.validateCoupon = async (req, res, next) => {
    logger.info("web | middleware | validateCoupon | validating request params");
    let schema = validator.object().keys({
        CouponCode: validator.string().required(),
        discountAmount: validator.number().min(0).required(),
        type: validator.required(),
        startDate: validator.date().required(),
        endDate: validator.date().greater(validator.ref('startDate')),
        minAmount: validator.number().min(0).required(),
        maxDiscount: validator.number().min(0)
    });


    try {
        let { result, error } = await schema.validate(req.body);
        console.log(result);
        if (error) {
            throw error
        }
        next();
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

