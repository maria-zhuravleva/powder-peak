import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5},
  commenter: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const resortSchema = new Schema({
  name: String,
  location: String,
  difficultyLevel: String,
  amenities: [String],
  creator: {type: Schema.Types.ObjectId, ref: "Profile"},
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Resort = mongoose.model('Resort', resortSchema)

export {
  Resort
}
