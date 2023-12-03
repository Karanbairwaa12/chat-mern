import express from "express";
import User from "../modules/userModule.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import multer from "multer";
const router = express.Router()

// const storage = multer.diskStorage({
//   destination: function(req,file,cd) {
//     cd(null,"public")
//   },
//   filename: function(req,file,cd) {
//     cd(null,file.originalname)
//   }
// })

// const fileFilter = (req,file,cd)=> {
//   const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
//   if(allowedFileTypes.includes(file.mimetype)){
//     cd(null,true)
//   }else {
//     cd(null,false)
//   }
// }

//if I want to uplode file so I will use this
// const storage = multer.memoryStorage(); // Store the file in memory

// const upload = multer({ storage });


// router.post('/register', upload.single('pic'), async (req, res) => {

//   console.log("this is req file:",req.file)
//   console.log(req.body.password)
//   try {

//     const { filename, mimetype, buffer } = req.file;

//     const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
//     // console.log(existingUser)
//     if (existingUser) {
//       // Check if the username already exists
           
//       // Check if the email already exists
//       // console.log(existingUser.email === req.body.email)
//       // console.log(req.body.email)
//       if (existingUser.email === req.body.email) {
//         // console.log({ error: 'Email already exists' })
//         return res.status(400).json({ error: 'Email already exists' });
//       }
//     }
//     console.log(req.body.password)
//     const hashPassword = await bcrypt.hash(req.body.password, 10);
//     console.log(hashPassword, req.password)
    
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashPassword,
//       // pic: req.file ? req.file.filename : "default_url_for_pic",
//       pic: {
//         data: buffer,         // Store image binary data
//         contentType: mimetype, // Store content type
//       },
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


//I using images as string in this so there is no need for using multer 
router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

    if (existingUser) {
      if (existingUser.email === req.body.email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      pic: req.body.pic || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Wrong credentials");
    }

    const check = await bcrypt.compare(req.body.password, user.password);
    if (!check) {
      return res.status(401).json("Wrong credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...other } = user._doc;

    return res.status(200).json({ other, accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});
export default router 