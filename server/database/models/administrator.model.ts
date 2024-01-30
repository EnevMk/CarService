import { model } from 'mongoose'
import { AdministratorSchema } from '../schemas/administrator.schema'

export const AdministratorModel = model('Administrator', AdministratorSchema)