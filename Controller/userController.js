import BaseController from '../baseController.js'
import UserService from '../Service/userService.js'
import UserValidation from '../Validation/userValidations.js'
import { v4 as uuidv4 } from 'uuid';
import errorcode from '../errorcode.js';
// import pagination from '../Validation/userValidations.js'
// import validId from '../Validation/userValidations.js'




export default class userController extends BaseController {
    constructor() {
        super();
        this.userService = new UserService();
        this.userValidation = new UserValidation();
    }

    async createUser(req, res) {
        try {
            req.body.userId = uuidv4();
            const response = await this.userService.createUser(req.body)
            res.status(201).json({
                response
            })

        } catch (error) {
            throw error
        }
    }
    async getAlluser(req, res) {
        try {
            let page = req.query.page || 1
            let limit = req.query.limit || 13
            const query = await this.userValidation.pagination(page, limit)
            const result = await this.userService.getAlluser(query)
            res.status(200).json({
                result
            })

        } catch (error) {
            if (error.message == errorcode.INVALID_INPUT_FORMAT_ERROR.message) {
                console.log(error.message == errorcode.INVALID_INPUT_FORMAT_ERROR.message);
                res
                    .status(errorcode.INVALID_INPUT_FORMAT_ERROR.status)
                    .send(errorcode.INVALID_INPUT_FORMAT_ERROR)
            }
        }
    }
    async isDeletedUser(req, res){
        try {
            let param = req.params.id;
            const result = await this.userValidation.validId(param)
            console.log('exe');
            const data = await this.userService.isDeletedUser(result)
            res.status(200).json({
                data
            })
    
        } catch (error) {
            if(error.message === errorcode.INVALID_ID.message){
                res
                .status(errorcode.INVALID_ID.status)
                .send(errorcode.INVALID_ID)
            }
        }
    }
}


