const User = require('../models/user.model');


exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}

exports.updateProfile = async (req, res) => {
    try {

        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password');
        console.log("User updated successfully")
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};