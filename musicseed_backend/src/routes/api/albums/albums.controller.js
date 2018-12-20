const { Album, validate } = require("../../../models/album");
const { Comment } = require("../../../models/comment");
const { Music } = require("../../../models/music");
const { User } = require("../../../models/user");

/* CRUD Operation */
/* Read */
exports.getAll = async (req, res) => {
  // Find
  const albums = await Album.find();

  // Response
  res.send(albums);
};

exports.getById = async (req, res) => {
  // Find
  const album = await Album.findOne({ _id: req.params.id })
    .populate('musics')
    .populate('user_id')
    .populate('comment');

  if (!album)
    return res
      .status(404)
      .send(`The album with given ID(${req.params.id}) was not found.`);

  // Response
  res.send(album);
};

/* 
  Create 
  JSON으로 album과 music의 배열로 받는다.
  album을 먼저 만들고 해당 album_is로 music을 만든다.
  music을 저장하고 album을 저장한다.
*/

exports.post = async (req, res) => {

  // Validation test for Album
  const { a_error } = validate(req.body.album);
  if (a_error) return res.status(400).send(error.message);

  // Validation test for Musics
  req.body.musics.forEach(music => {
    const { m_error } = validate(music);
    if (m_error) return res.status(400).send(error.message);
  });

  console.log(req.body);

  // Find User
  let user = await User.findById(req.body.album.user_id);
  if (!user)
    return res.status(404).send(`The user with given ID(${req.body.album.user_id}) was not found.`);

  // Make Album
  let album = new Album(req.body.album);


  // Make and Save Musics
  req.body.musics.forEach( async (_music, index) => {
    _music.album_id = album._id;
    let music = new Music(_music);
    music = await music.save();
    album.musics.push(music._id);
    if(index+1 === req.body.musics.length) album = await album.save();
  });

  // Update album info. to user
  user.albums.push(album._id);
  await user.save();

  // Response
  res.send(album);
};

/* Update */
exports.patch = async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Find User
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(404).send(`The user with given ID(${req.body.user_id}) was not found.`);

  // Find
  const album = await Album.findById(req.params.id);

  const keys = Object.keys(req.body);

  keys.forEach(async (key, index) => {
    if(req.body[key]) {
      console.log(`Key: ${key}, Value: ${req.body[key]}`);
      album[key] = req.body[key];
    }
    if((index+1) === keys.length) await album.save();
  });

  // Response
  res.send(album);
};

/* Delete */
exports.delete = async (req, res) => {
  // Find Album
  let album = await Album.findByIdAndDelete(req.params.id);

  // Delete album from user
  let user = await User.findById(album.user_id);
  user.albums.splice(user.albums.indexOf(album._id), 1);

  // Find and delete comments on the album
  album.comment.forEach( async comment_id => {
    await Comment.findByIdAndDelete(comment_id);
  });

  // Find and delete musics in the album
  album.musics.forEach( async music_id => {
    const music = await Music.findByIdAndDelete(music_id);
    music.comment.forEach( async comment_id => {
      await Comment.findByIdAndDelete(comment_id);
    })
  });

  // Save user
  user = await user.save();

  // Response
  res.send([ user.albums, album ]);
};