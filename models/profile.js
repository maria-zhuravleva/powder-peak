import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  admin: {type: Boolean, default: false},
  favoriteResorts: [{type: Schema.Types.ObjectId, ref: 'Resort'}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
