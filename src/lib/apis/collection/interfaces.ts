export interface IcreateCollectionService {
    title: string
}

export interface IupdateCollectionService {
    collectionID: string
    title: string
}

export interface IdeleteCollectionService {
    collectionID: string
}