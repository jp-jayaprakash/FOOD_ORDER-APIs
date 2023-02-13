import userSchema from "../Module/userSchema.js";
import errorcode from '../errorcode.js';

export default class userValidation {

    async pagination(page, limit) {
        console.log(typeof page, typeof limit);

        if (typeof (page == "string") && typeof (limit == "string")) {
            page = parseInt(page)
            limit = parseInt(limit);
            if (isNaN(page) || isNaN(limit)) {
                throw new Error(errorcode.INVALID_INPUT_FORMAT_ERROR.message);
            }
            else {
                console.log('else');
                return { page: page, limit: limit }
            }
        }
        else {
            return { page: page, limit: limit };
        }

    }
    async validId(id) {
        const valid = await userSchema.aggregate([{$match:{userId:id,isDeleted:false}}])
        console.log(valid.length);
        if (valid.length == 0) {
            throw new Error(errorcode.INVALID_ID.message)
        }
    }
}
