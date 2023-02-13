import SequenceRepo from "../Repositary/sequenceRepo.js"

export default class sequenceService{
    constructor(){
        this.sequenceRepo = new SequenceRepo()
    }
    async createSequence(params){
        try {
            const data = await this.sequenceRepo.createSequence(params)
            return data
        } catch (error) {
            
        }
    }
}