import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoom } from './../model/room.model';
import { IBuilding } from './../model/building.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
    private roomByBuildingIdApiURL =
        'http://192.168.1.159:3000/admin/get_room_byBuilding/';
    private buildingByBuildingIdApiURL =
        'http://192.168.1.159:3000/admin/get_building/';

    public headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    getBuildingByBuildingId(buildingId: string): Observable<IBuilding> {
        this.buildingByBuildingIdApiURL =
            this.buildingByBuildingIdApiURL + buildingId;
        return this.http.get<IBuilding>(this.buildingByBuildingIdApiURL, {
            headers: this.headers,
        });
    }

    getRoomByBuildingId(buildingId: string): Observable<IRoom> {
        this.roomByBuildingIdApiURL = this.roomByBuildingIdApiURL + buildingId;
        return this.http.get<IRoom>(this.roomByBuildingIdApiURL, {
            headers: this.headers,
        });
    }
}
