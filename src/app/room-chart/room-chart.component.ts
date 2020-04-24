import { IRoomConfig } from './model/roomConfig.model';
import { IBuildingConfig } from './model/buildingConfig.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IBuilding } from './model/building.model';
import { RoomService } from './service/room.service';

@Component({
    selector: 'app-room-chart',
    templateUrl: './room-chart.component.html',
    styleUrls: ['./room-chart.component.css'],
})
export class RoomChartComponent implements OnInit {
    public seatConfig: any = null;
    public buildingConfig: IBuildingConfig[] = [];
    public roomConfig: IRoomConfig[] = [];
    public seatmap = [];

    public seatChartConfig = {
        showRowsLabel: true,
        showRowWisePricing: false,
        newSeatNoForRow: true,
    };

    public cart = {
        selectedSeats: [],
        seatstoStore: [],
        totalamount: 0,
        cartId: '',
        eventId: 0,
    };

    // title = 'seat-chart-generator';

    public buildingData: IBuilding[] = [];
    public roomData: any = [];

    @Output() evEmit = new EventEmitter();

    constructor(private roomService: RoomService) {}

    ngOnInit() {
        this.roomService.getBuildingByBuildingId('B').subscribe((result) => {
            this.buildingData = result[0];
            let array = [];
            array = this.buildingData['building_layout']
                .slice(2, this.buildingData['building_layout'].length - 2)
                .split('"', this.buildingData['building_layout'].length);
            const arr = [];
            const final_arr = [];
            for (let i = 1; i < array.length; i += 2) {
                // take every second element
                arr.push(array[i]);
            }
            for (let i = 0; i < arr.length; i += 2) {
                final_arr.push({
                    floor: arr[i],
                    layout: arr[i + 1],
                    no:
                        arr[i] == '1st Floor'
                            ? 1
                            : arr[i] == '2nd Floor'
                            ? 2
                            : arr[i] == 'Ground Floor'
                            ? 0
                            : null,
                });
            }

            final_arr.forEach((element) => {
                this.buildingConfig.push({
                    building_name: this.buildingData['building_name'],
                    building_id: this.buildingData['building_id'],
                    building_floor: element.floor,
                    floor_no: element.no,
                    layout: element.layout,
                });
            });
        });

        this.roomService.getRoomByBuildingId('B').subscribe((result) => {
            this.roomData = {
                room: result,
            };
            this.roomData.room.forEach((element) => {
                let array = [];
                array = element.room_image
                    .slice(1, element.room_image.length - 1)
                    .split('"', element.room_image.length);
                let final_arr = [];
                let j = 1;

                while (j < array.length) {
                    // take every second element
                    final_arr.push(array[j]);
                    j += 2;
                }

                this.roomConfig.push({
                    room_no: element.room_no,
                    floor: element.floor,
                    building_id: element.building_id,
                    room_type: element.room_type,
                    swimming_pool_view: element.swimming_pool_view,
                    room_rate: element.room_rate,
                    room_option_type: element.room_option_type,
                    room_image: final_arr,
                    room_status: element.room_status,
                    no_of_pax: element.no_of_pax,
                });
            });
        });

        this.CallFunction(this.buildingConfig, this.roomConfig);
    }

    CallFunction(buildingConfig, roomConfig) {
        setTimeout(() => {
            buildingConfig.forEach((element) => {
                var seatValArr = element.layout.split('');

                element['seat_map'] = roomConfig.filter(
                    (el) => el.floor == element.building_floor
                );

                for (let i = 0; i < seatValArr.length; i++) {
                    if (seatValArr[i] != '_') {
                        element['seat_map'][i]['room_layout'] = seatValArr[i];
                    } else {
                        element['seat_map'].splice(i, 0, {
                            room_no: '',
                            floor: '',
                            building_id: '',
                            room_type: '',
                            room_rate: null,
                            room_option_type: '',
                            room_image: [],
                            room_status: '',
                            no_of_pax: null,
                            room_layout: seatValArr[i],
                        });
                    }
                }
            });
            buildingConfig.sort((left, right) => {
                if (left.floor_no > right.floor_no) return -1;
                if (left.floor_no < right.floor_no) return 1;
                return 0;
            });

            this.processRoomChart(buildingConfig);
        }, 2200);
    }

    processRoomChart(map_BuildingData: any[] | any) {
        if (map_BuildingData.length > 0) {
            var seatNoCounter = 1;
            map_BuildingData.forEach((element) => {
                var row_label = '';
                var item_map = element.seat_map;
                // Get the label name and price
                row_label = 'Row ' + element.building_floor + ' - ';

                if (this.seatChartConfig.newSeatNoForRow) {
                    seatNoCounter = 1; // Reset the seat label counter for new row
                }
                var totalItemCounter = 1;

                var mapObj = {
                    seatRowLabel: element.building_floor,
                    seats: [],
                    seatPricingInformation: row_label,
                };
                row_label = '';

                item_map.forEach((item) => {
                    console.log(item);

                    var seatObj = {
                        key: element.building_floor + '_' + totalItemCounter,
                        type: item.room_type,
                        pool_view: item.swimming_pool_view,
                        option_type: item.room_option_type,
                        price: item.room_rate,
                        path: item.room_image,
                        status: item.room_status,
                        no_of_pax: item.no_of_pax,
                    };

                    if (item.room_layout != '_') {
                        seatObj['seatNo'] = item.room_no;

                        seatObj['seatLabel'] =
                            item.floor + ' ' + seatObj['seatNo'];

                        seatNoCounter++;
                    } else {
                        seatObj['seatLabel'] = '';
                    }
                    totalItemCounter++;
                    mapObj['seats'].push(seatObj);
                });
                this.seatmap.push(mapObj);
            });
        }
    }

    public selectSeat(seatObject: any) {
        if (seatObject.status == 'Available') {
            seatObject.status = 'Reserved';
            this.cart.selectedSeats.push(seatObject);
            this.cart.seatstoStore.push(seatObject.key);
            this.cart.totalamount += seatObject.price;
        } else if ((seatObject.status = 'Reserved')) {
            seatObject.status = 'Available';
            var seatIndex = this.cart.selectedSeats.indexOf(seatObject);
            if (seatIndex > -1) {
                this.cart.selectedSeats.splice(seatIndex, 1);
                this.cart.seatstoStore.splice(seatIndex, 1);
                this.cart.totalamount -= seatObject.price;
            }
        }
        this.evEmit.emit(this.cart);
    }

    public blockSeats(seatsToBlock: string) {
        if (seatsToBlock != '') {
            var seatsToBlockArr = seatsToBlock.split(',');
            for (let index = 0; index < seatsToBlockArr.length; index++) {
                var seat = seatsToBlockArr[index] + '';
                var seatSplitArr = seat.split('_');
                console.log('Split seat: ', seatSplitArr);
                for (let index2 = 0; index2 < this.seatmap.length; index2++) {
                    const element = this.seatmap[index2];
                    if (element.seatRowLabel == seatSplitArr[0]) {
                        var seatObj =
                            element.seats[parseInt(seatSplitArr[1]) - 1];
                        if (seatObj) {
                            console.log('\n\n\nFount Seat to block: ', seatObj);
                            seatObj['status'] = 'Blocked'; // 'Maintenance'
                            this.seatmap[index2]['seats'][
                                parseInt(seatSplitArr[1]) - 1
                            ] = seatObj;
                            console.log('\n\n\nSeat Obj', seatObj);
                            console.log(
                                this.seatmap[index2]['seats'][
                                    parseInt(seatSplitArr[1]) - 1
                                ]
                            );
                            break;
                        }
                    }
                }
            }
        }
    }

    public processBooking() {}
}
