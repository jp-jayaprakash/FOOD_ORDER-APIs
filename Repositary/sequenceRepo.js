import SequenceSchema from "../Module/sequenceSchema.js"


export default class sequenceRepo {
    constructor() {
        this.sequenceSchema = SequenceSchema
    }
    async createSequence(params) {
        try {
            const data = await this.sequenceSchema.create(params)
            return data.save()
        } catch (error) {
            throw error
        }
    }
    async getSequence() {
        try {
            const result = await this.sequenceSchema.find()
            return result
        }
        catch (error) {
            throw error
        }
    }
    async updateSequence(params) {
        try {
            console.log(params);
            let response = await this.sequenceSchema.updateOne(params)
            return response
        } catch (error) {

        }
    }
}