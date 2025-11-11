import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    onDuty: { type: Boolean, default: false },
    avgMark: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  },
  {
    timestamps: true,
  },
);

export const Student = mongoose.model('Student', studentSchema);
