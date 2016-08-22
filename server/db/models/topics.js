/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  id: String,
  text: String,
  count: { type: Number, min: 0 },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Topic', TopicSchema);

