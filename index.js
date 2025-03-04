import {initServer, addAdmin} from './configs/app.js'
import {config} from 'dotenv'
import {connect} from './configs/mongo.js'


config()
connect()
initServer()
addAdmin()