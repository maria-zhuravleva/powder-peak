import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tacoSchema = new Schema({
  name: String,
  location: String,
  difficultyLevel: String,
  amenities: String,
  creator: {type: Schema.Types.ObjectId, ref: "Profile"},
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Taco = mongoose.model('Taco', tacoSchema)

export {
  Taco
}