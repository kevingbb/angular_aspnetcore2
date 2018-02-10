export interface ISavedImage {
    SavedImageId: number;
    UserId: string;
    Description: string;
    Tags: Array<ISavedImageTag>;
    StorageUrl: string;
}

export interface ISavedImageTag {
    savedImageTagId: number;
    savedImageId: number;
    tag: string;
}