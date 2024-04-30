interface Iupdate {
  payments: any
  key: string
  value: string
  type: string
}

const technicalModel = ({
  checkPaymentMethod: (payments: Array<any>) => {
    // const check = payments.find((el: any) => el.isActive)
    // return Boolean(check?.type)
  },

  refactorPayment: ({ key, payments, value, type }: Iupdate) => {
    const result = payments.map((el: any) => {
      return el.type === type ? {
        ...el,
        [key]: value
      } : el
    })
    return result
  }
})

export default technicalModel