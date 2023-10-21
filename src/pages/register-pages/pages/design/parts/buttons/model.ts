import { IAdditionalLinkes } from "../../reducer"

const designPageButtonsModel = ({
    refactorLinks: (data: Array<IAdditionalLinkes>) => data.map(el => ({ caption: el.caption, link: el.link }))
})

export default designPageButtonsModel