const users = require("../model/userSchema");

exports.register = async (req, res) => {
  console.log(req.body);
  //get other user input from req body
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, status, location } = req.body;
  if (!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
    res.status(403).json("All inputs are required!");
  }
  try {
    //checking if email is already registered
    const preuser = await users.findOne({ email });
    if (preuser) {
      return res.status(406).json("Email already registered!");
    } else {
      const newuser = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        profile: file,
        location,
      });
      await newuser.save();
      res.status(200).json(newuser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//get users
exports.getusers = async (req, res) => {
  // get search query from request
  const search = req.query.search;
  const query = {
    fname: { $regex: search, $options: "i" },
  };
  try {
    const allusers = await users.find(query);
    res.status(200).json(allusers);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.viewuser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await users.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json("Profile not found");
  }
};

exports.removeuser = async (req, res) => {
  const { id } = req.params;
  try {
    const removeuser = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(removeuser);
  } catch (error) {
    res.status(401).json(error);
  }
};
