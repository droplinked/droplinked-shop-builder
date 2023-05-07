
export default class technicalModel {
  static checkPaymentMethod = (payments: Array<any>) => {
    const check = payments.find((el:any) => el.isActive)    
    return Boolean(check?.type)
  }
}