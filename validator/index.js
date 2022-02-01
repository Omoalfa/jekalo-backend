import JoiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import moment from 'moment';
import User from '../model/User';

const Joi = JoiBase.extend(joiDate);

export const validateUserCreate = async (req, res, next) => {
    const UserSchema = new Joi.object({
        username: Joi.string().required(),
        first_name: Joi.string().required(),
        date_of_birth: Joi.date().format('DD-MM-YYYY').raw().error(() => 'invalid date format').required(),
        last_name: Joi.string().optional()
    })

    const { error } = UserSchema.validate(req.body);
    if (error) return res.status(401).json({
        error: 'invalid input values',
        data: null,
        status: 401,
        success: false
    })

    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) {
            return res.status(401).json({
                error: 'Username not available',
                data: null,
                status: 401,
                success: false
            })
        }

        return next()
    } catch (error) {
        return res.status(500).json({
            error: 'somthing went wrong',
            data: null,
            success: false,
            status: 500
        })
    }
}

