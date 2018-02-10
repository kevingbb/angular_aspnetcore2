import { Component, OnInit } from '@angular/core';
import { CognitiveService } from '../../common/services/cognitive.service';
import { IImageResult } from '../../common/models/bingSearchResponse';
import { IComputerVisionRequest, IComputerVisionResponse } from '../../common/models/computerVisionResponse';
import { AzureToolkitService } from '../../common/services/azureToolkit.service';
import { ImagePostRequest } from '../../common/models/imagePostRequest';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';

 @Component({
     selector: 'search',
     templateUrl: './search.component.html',
     styleUrls: ['./search.component.css']
 })
 export class SearchComponent implements OnInit {
    searchResults: IImageResult[] | null;
    isSearching = false;
    currentAnalytics: IComputerVisionResponse | null;
    currentItem: IImageResult | null;
    isAnalyzing = false;
    currentItemSaved: boolean;
    user: User;

    constructor(private cognitiveService: CognitiveService, private azureToolkitService: AzureToolkitService, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => this.user = user);
    }

    search(searchTerm: string) {
        this.searchResults = null;
        this.currentAnalytics = null;
        this.isSearching = true;
        this.cognitiveService.searchImages(searchTerm).subscribe(result => {
            this.searchResults = result.value;
            this.isSearching = false;
        });
    }

    analyze(result: IImageResult) {
        this.currentItem = result;
        this.currentItemSaved = false;
        this.currentAnalytics = null;
        this.isAnalyzing = true;
        this.cognitiveService.analyzeImage({ url: result.thumbnailUrl } as IComputerVisionRequest).subscribe(result => {
            this.currentAnalytics = result;
            this.isAnalyzing = false;
        });
        window.scroll(0, 0);
    }

    saveImage() {
        let transferObject: ImagePostRequest = {
            userId: this.user.userId,
            url: (this.currentItem) ? this.currentItem.thumbnailUrl : 'http://nullthumbnailurl',
            encodingFormat: (this.currentItem) ? this.currentItem.encodingFormat : 'nullencodingFormat',
            id: (this.currentItem) ? this.currentItem.imageId : 'nullimageId',
            description: (this.currentAnalytics) ? this.currentAnalytics.description.captions[0].text : 'nulldescription',
            tags: (this.currentAnalytics) ? this.currentAnalytics.tags.map(tag => tag.name) : new Array<string> ('nulltags1', 'nulltags2')

        }
        this.azureToolkitService.saveImage(transferObject).subscribe(saveSuccessful => {
            this.currentItemSaved = saveSuccessful;
        });
    }
 }