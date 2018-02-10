export interface IBingSearchResponse {
    totalEstimatedMatches: number;
    value: IImageResult[];
}
export interface IImageResult {
    name: string;
    thumbnailUrl: string;
    imageId: string;
    encodingFormat: string;
}