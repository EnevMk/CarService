import { model } from 'mongoose'
import { CarSchema } from '../schemas/car.schema'

export const CarModel = model('Car', CarSchema);