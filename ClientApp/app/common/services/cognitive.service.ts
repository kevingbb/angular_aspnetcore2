import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from './azureHttpClient';
import { IBingSearchResponse } from '../models/bingSearchResponse';
import { IComputerVisionRequest, IComputerVisionResponse } from '../models/computerVisionResponse';
@Injectable()
export class CognitiveService {
    bingSearchAPIKey = '<COGNITIVE_SERVICES_KEY_GOES_HERE>';
    computerVisionAPIKey = '<COGNITIVE_SERVICES_KEY_GOES_HERE>';
    constructor(private http: AzureHttpClient) { }

    searchImages(searchTerm: string): Observable<IBingSearchResponse> {
        return this.http.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${searchTerm}`, this.bingSearchAPIKey)
            .map(response => response.json() as IBingSearchResponse)
            .catch(this.handleError);
    }

    analyzeImage(request: IComputerVisionRequest): Observable<IComputerVisionResponse> {
        return this.http.post('https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags', this.computerVisionAPIKey, request)
            .map(response => response.json() as IComputerVisionResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}