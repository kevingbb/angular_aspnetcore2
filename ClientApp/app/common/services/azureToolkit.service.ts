import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ImagePostRequest } from '../models/imagePostRequest';
import { ISavedImage } from '../models/savedImage';

@Injectable()
export class AzureToolkitService {
    private originUrl: string;

    constructor(private http: Http, @Inject('BASE_URL')originUrl: string) {
        this.originUrl = originUrl;
    }

    public saveImage(imagePostRequest: ImagePostRequest): Observable<boolean> {
        return this.http.post(`${this.originUrl}api/images`, imagePostRequest)
            .map(response => {
                return response.ok;
            }).catch(this.handleError);
    }

    public getImages(userId: string): Observable<ISavedImage[]> {
        return this.http.get(`${this.originUrl}api/images/${userId}`)
            .map(images => {
                return images.json() as ISavedImage[];
            }).catch(this.handleError);
    }

    public searchImage(userId: string, searchTerm: string): Observable<ISavedImage[]> {
        return this.http.get(`${this.originUrl}api/images/search/${userId}/${searchTerm}`)
            .map(response => {
                return response.json() as ISavedImage[];
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}