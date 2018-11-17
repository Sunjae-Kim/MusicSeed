const { Album } = require("../models/album");
const { Music } = require("../models/music");
const { User } = require("../models/user");

const dumpdata = {
  random_num: -1,
  generate_random_num(){
    this.random_num = Math.floor(Math.random() * 9000) + 1000;
  },
  async insert_random_user(){
    this.generate_random_num();
    console.log(`PUT DUMP DATA : user${this.random_num} inserted`);
    return await new User({
      email: `user${this.random_num}@example.com`,
      name: `user${this.random_num}`,
      pw: 1234
    }).save();
  },
  async insert_music(album_id=null, user_id, index){
    console.log(`PUT DUMP DATA : track${this.random_num}_${index} inserted`);
    return await new Music({
      title: `track${this.random_num}_${index}`,
      music_path: "path",
      main_artist_id: user_id,
      album_id: album_id
    }).save();
  },
  async insert_dump_data() {
    const user = await this.insert_random_user();
    const music1 = await this.insert_music(user._id, 1);
    const music2 = await this.insert_music(user._id, 2);
    console.log(`PUT DUMP DATA : album${this.random_num} inserted`);
    const album = await new Album({
      title: `album${this.random_num}`,
      description: "description",
      user_id: user._id,
      musics: [music1._id, music2._id]
    }).save();
    music1.album_id = album._id; await music1.save();
    music2.album_id = album._id; await music2.save();
    user.albums.push(album._id);
    await user.save();
    console.log('PUT DUMP DATA : FINISHED!!!!!!');
    return album;
  }
};

module.exports = dumpdata;