import { Schema } from 'mongoose'

export const CarSchema = new Schema({

    VIN: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    brand: {
        type:Schema.Types.String,
        required: true,
    },
    model: {
        type:Schema.Types.String,
        required: true,
    },
    service: {
        type:Schema.Types.String,
        required: true,
    },
    serviceCost: {
        type: Schema.Types.Number,
        default: 0
    }
})