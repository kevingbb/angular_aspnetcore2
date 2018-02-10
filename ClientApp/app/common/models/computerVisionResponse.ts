export interface IComputerVisionRequest {
    url: string;
}
export interface IComputerVisionResponse {
    description: {
        captions: Array<{
            confidence: number;
            text: string;
        }>;
    }
    tags: Array<{
        confidence: number;
        name: string;
    }>;
}