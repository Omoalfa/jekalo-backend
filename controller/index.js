import moment from "moment";
import User from "../model/User";


export const createUser = async (req, res) => {
    const { username, first_name, last_name, date_of_birth } = req.body;

    try {
        const user = new User({
            username, first_name, last_name, date_of_birth: moment(date_of_birth, 'DD-MM-YYYY')
        });

        await user.save();

        return res.status(201).json({
            message: 'account created succcessfully',
            data: user,
            status: 201,
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: 'something went wrong',
            data: null,
            status: 500,
            success: false
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        const data = users.map(user => {
            const date_of_birth = moment(user.date_of_birth).format('DD-MM-YYYY');

            return { ...user._doc, date_of_birth };
        })

        return res.status(200).json({
            message: 'users fetched successfully',
            data,
            status: 200,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            error: 'something went wrong',
            data: null,
            success: false,
            status: 500
        })
    }
}

export const deleteUser = async (req, res) => {
    const { username } = req.params;

    try {
        await User.findOneAndDelete({ username });

        return res.status(200).json({
            message: 'You delete the user successfully',
            data: null,
            status: 200,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            error: 'something went wrong',
            data: null,
            success: false,
            status: 500
        })
    }
}
