const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const UserModell = require('./models/user');
const PlaceModel = require('./models/place');
const bcrypt = require('bcrypt');
const CookieParser = require('cookie-parser');
const ImageDownloader = require('image-downloader');
const multer = require('multer')
const fs = require('fs')



const pathh = require('path')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

app.use('/uploads', express.static(pathh.join(__dirname, 'uploads')));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

const jwt = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdasdasdasd';

// ------------------------------------------ DB
const dbConnect = async () => {
  try {
    await mongoose.connect('putyoursbro');
    app.listen(4000, () => console.log("Server is running!"));
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

// ------------------------------------------ EndPoints

app.post('/register', async (req, res) => {
  const { firstname, middlename, lastname, phone, email, username, password } = req.body;

  try {

    const userDoc = await UserModell.create({
      firstname,
      middlename,
      lastname,
      phone,
      email,
      username,
      password: bcrypt.hashSync(password, bcryptSalt),
      comments
    });
    console.log("Done!");

    res.json(userDoc);
  } catch (error) {
    console.log(error);
  }
});


app.post('/register/check',async(req,res)=>{
  const {username}= req.body;
  try {
    console.log("active");
    const existingUser = await UserModell.findOne({ username });

    if (existingUser) {
      res.json({ message: 'yes' });

    }   else{
      res.json({done:"yes"})
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});
  
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userName = await UserModell.findOne({ username });
  if (userName) {
    console.log("Found");

    const passOk = bcrypt.compareSync(password, userName.password);
    if (passOk) {
      console.log('passOKTOO');
      jwt.sign(
        {

          username: userName.username,
          id: userName._id, },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.cookie('token', token).json(userName);
          }
        }
      );
    } else {
      res.status(422).json("Incorrect password");
    }
  } else {
    res.json('yes')
    console.log("Not Found!");
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, usertoken) => {
      if (err) throw err;
      const { firstname, email, _id,username,password,lastname} = await UserModell.findById(usertoken.id);

      res.json({ firstname, email, _id,username,password,lastname });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  const newName = 'photo' + Date.now() + '.jpg';

  try {
    await ImageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });
    console.log("Workign till now");
    res.json(newName);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to download and save the image.' });
  }
});


const photosMiddleware = multer({ dest: 'uploads' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  console.log(req.files);
  for (let i = 0; i < req.files.length; i++) {
    let { path, originalname } = req.files[i];

    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const cleanPath = newPath.replace(/\\/g, '').replace('uploads', ''); 

    uploadedFiles.push(cleanPath);

  }
  res.json(uploadedFiles);
});


app.post('/places',(req,res)=>{
  const {token} = req.cookies;
  const {address,photos:addedPhotos,description,extraInfo,
    positiveThings,negativeThings,city,state,postalCode,location,country:country,comments} = req.body;
    console.log(req.body);

   
  jwt.verify(token, jwtSecret, {}, async (err, usertoken) => {
    if (err) throw err;
  
  const placeDoc =  await PlaceModel.create({
      postedBy: usertoken.id,
      address,photos:addedPhotos,description,extraInfo:extraInfo,
    positiveThings,negativeThings,country:country,city,state,postalCode,location,comments
    })
  
   res.json(placeDoc)
  });
 
})



app.get('/places/:id',async(req,res)=>{
  const {id}= req.params;
res.json(await PlaceModel.findById(id))
});



app.put('/places/:id', async (req, res) => {
  console.log(req.body);
  const { token } = req.cookies;

  const {
   id,
   address,photos:addedPhotos,description,extraInfo:extraInfo,
   positiveThings,negativeThings,country,city,state,postalCode,location,comments
  } = req.body;
console.log(req.body);

  jwt.verify(token, jwtSecret, {}, async (err, usertoken) => {
    if (err) {
      // Pass the error to the next middleware
      return next(err);
    }

    const placeData = await PlaceModel.findById(id);

    if (usertoken.id === placeData.postedBy.toString()) {
      placeData.set({
        address,
        photos: addedPhotos,
        description,
        extraInfo: extraInfo,
        positiveThings,
        negativeThings,
        country,
        city,state,postalCode,location,comments
      });

      await placeData.save();
      res.json('ok');
    }
  });
});




app.get('/user-places',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, usertoken) => {
const {id} = usertoken; 
console.log(usertoken.firstname);
res.json(await PlaceModel.find({ postedBy: id }));
  });
})

//getting all places
app.get('/places',async(req,res)=>{

res.json(await PlaceModel.find({}))
})


app.post('/places/:id/like', async (req, res) => {
  
  const { id } = req.params;
  const {userId} = req.body
 console.log(userId);
 
  try {
    // Find the place by ID and increment the likes count


    if(!userId){
      console.log('not logged in');
      res.json({message:'unauthorized!'})
      return;
    }

    const place = await PlaceModel.findById(id)

    const index = place.likes.findIndex((id)=> id ===String(userId))

    if(index === -1){
      // like the post
      place.likes.push(userId)
      
 // If the user has already liked the post, remove it from likes
 const dislikeIndex = place.dislikes.findIndex((id) => id === String(userId));
 if (dislikeIndex !== -1) {
   place.dislikes.splice(dislikeIndex, 1);
 }
    }else{
      // dislike
      place.likes = place.likes.filter((id)=> id!== String(userId))
    }
    const placeUpdate = await PlaceModel.findByIdAndUpdate(
      id,
     place, // Increment the likes field by 1
      { new: true } // Return the updated place
    );
    res.json(placeUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to like the place.' });
  }
});
// app.js (or wherever your Express app is defined)

app.post('/places/:id/dislike', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    // Check if the user is logged in
    if (!userId) {
      console.log('Not logged in');
      res.json({ message: 'Unauthorized!' });
      return;
    }

    const place = await PlaceModel.findById(id);

    // Check if the user has already disliked the post
    const index = place.dislikes.findIndex((id) => id === String(userId));

    if (index === -1) {
      // Dislike the post
      place.dislikes.push(userId);

      // If the user has already liked the post, remove it from likes
      const likeIndex = place.likes.findIndex((id) => id === String(userId));
      if (likeIndex !== -1) {
        place.likes.splice(likeIndex, 1);
      }
    } else {
      // Remove the dislike
      place.dislikes = place.dislikes.filter((id) => id !== String(userId));
    }

    const placeUpdate = await PlaceModel.findByIdAndUpdate(
      id,
      place, // Update the dislikes field
      { new: true } // Return the updated place
    );

    res.json({ message: 'Dislike updated successfully', dislikes: placeUpdate.dislikes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to dislike the place.' });
  }
});



app.post('/search',async(req,res)=>{

  const {query} = req.body
  console.log(query);


  const keyword = query;

  PlaceModel.find({
    $or: [
      { country: { $regex: keyword, $options: "i" } }, // Case-insensitive search for 'country'
      { city: { $regex: keyword, $options: "i" } }, // Case-insensitive search for 'city'
      { address: { $regex: keyword, $options: "i" } },
      { location: { $regex: keyword, $options: "i" } }

      // Add more fields if needed
    ],
  })
    .then((results) => {
      // Handle the search results
    res.json(results)
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });

 
})


app.post('/newPassword',(req,res)=>{

  const{currentpassword,newpassword,confirmpassword} = req.body;

  

  console.log(currentpassword,newpassword,confirmpassword);
})





app.post('/:id/comments',async(req,res)=>{
 
  

  const {placeId,user,content} = req.body;
  console.log(req.body);


try {

  const placeCheck = await PlaceModel.findById(placeId)

  if(placeCheck){

    placeCheck.comments.push({
      post: placeId,
     author : user._id,
      content: content,
      commenter:user.username
    });


    const commentUpdate = await PlaceModel.findByIdAndUpdate(
      placeId,
     placeCheck, 
      { new: true } // Return the updated place
    );


    res.json(commentUpdate);
    await commentUpdate.save(); 





console.log("Done");
    return
    
  }
} catch (error) {
  console.log(error);
}
 
//   const { id } = req.params;
//   const {userId} = req.body
//  console.log(userId);
 
//   try {
//     // Find the place by ID and increment the likes count


//     if(!userId){
//       console.log('not logged in');
//       res.json({message:'unauthorized!'})
//       return;
//     }

//     const place = await PlaceModel.findById(id)
//   }catch{

//   }
})





app.get('/:id/comments',async(req,res)=>{
 
  
  const { id } = req.params;

  try {
    const placeCheck = await PlaceModel.findById(id);
    
    if (!placeCheck) {
      // Handle the case when no place is found with the provided id
      return res.status(404).json({ error: "Place not found" });
    }
  
    const allComments = placeCheck.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(allComments);
    console.log("Comments sent");
  } catch (error) {
    console.log("Error fetching comments:");
    res.status(500).json({ error: "Internal server error" });
  }
})






app.delete('/place/comments/:id/delete', async (req, res) => {

  const { id, author, postId } = req.body;

  try {
    const place = await PlaceModel.findById(postId);

    const foundComment = place.comments.find((comment) => comment._id.toString() === id);

    if (foundComment && foundComment.author.toString() === author) {
      const filteredComments = place.comments.filter((comment) => comment._id.toString() !== id);
      place.comments = filteredComments;
      console.log("Yes");

      await place.save();
      res.status(200).json({ message: 'Comment deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Comment not found or not authorized to delete.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment.', error });
  }
});


module.exports = app;

