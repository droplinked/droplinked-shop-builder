const { putUpdateShop } = require("apis/shopApiService");
const { toast } = require("react-toastify");

export default class technicalModel {
    static validate = (Technical) => {
        const data = {
            imsType: Boolean(Technical.imsType.length)
          }
          return {
            data,
            status: Object.keys(data).filter((el) => data[el] == false).length
          }
    }
}