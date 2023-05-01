import { Isku } from "lib/apis/product/interfaces"

interface IRefactorSkues {
    skues: Array<Isku>
    id: string
}

export default class RecordModalModule {
    static refactorSkues = ({ id, skues }: IRefactorSkues): Array<Isku> => {
        return skues.map<Isku>(el => ({
            ...el,
            record: el._id === id ? true : el.record
        }))
    }
}