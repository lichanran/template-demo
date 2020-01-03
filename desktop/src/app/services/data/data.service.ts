import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { config } from '../../../config'

const base = config.hosts.base

@Injectable({
    providedIn: 'root'
})
export class DataService {
    userId: string;
    constructor (
        private http: HttpClient,
    ) {
    }

}

