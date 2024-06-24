export interface IcreateCollectionService {
    title: string
    description: string
    image: string
}

export interface IupdateCollectionService {
    collectionID: string
    title: string
    image: string
    description: string
}

export interface IdeleteCollectionService {
    collectionID: string
}