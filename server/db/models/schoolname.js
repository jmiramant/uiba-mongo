import mongoose, { Schema } from 'mongoose';

const SchoolnameSchema = new mongoose.Schema({
  name: {type: String},
});

export default mongoose.model('Schoolname', SchoolnameSchema);