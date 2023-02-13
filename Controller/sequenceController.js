import BaseController from "../baseController.js";
import SequenceService from "../Service/sequenceService.js"
import { v4 as uuidv4 } from 'uuid';


export default class sequenceController extends BaseController{
    constructor(){
        super();
        this.sequenceService = new SequenceService();
    }

    async  createSequence(req, res){
        try {
            req.body.seqId =uuidv4();
            const response = await this.sequenceService.createSequence(req.body) 
            res.status(201).json({
                response
            })
        } catch (error) {
            throw error
        }
    }
}