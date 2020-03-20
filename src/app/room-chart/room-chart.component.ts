import { IRoomConfig } from './model/roomConfig.model';
import { IBuildingConfig } from './model/buildingConfig.model';
import { Component, OnInit } from '@angular/core';
import { IBuilding } from './model/building.model';
import { IRoom } from './model/room.model';
import { RoomService } from './service/room.service';
import { log } from 'util';

@Component({
    selector: 'app-room-chart',
    templateUrl: './room-chart.component.html',
    styleUrls: ['./room-chart.component.css'],
})
export class RoomChartComponent implements OnInit {
    public seatConfig: any = null;
    public buildingConfig: IBuildingConfig[] = [];
    public roomConfig: IRoomConfig[] = [];
    public bConfig: IBuildingConfig[] = [];
    public rConfig: IRoomConfig[] = [];

    public seatmapConfig: any = null;
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

    title = 'seat-chart-generator';

    public buildingData: IBuilding[] = [];
    public roomData: any = [];

    // html = `<p>Seat : {{ seatobj.seatLabel }} | Price : {{
    //   seatobj.price
    // }}Rs</p><div><img src="../assets/images/download.jpg" alt="Watch" height="100%" width="100%"></div>`;

    constructor(private roomService: RoomService) {}

    ngOnInit() {
        this.roomService.getBuildingByBuildingId('C').subscribe(result => {
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
                });
            }
            final_arr.forEach(element => {
                this.buildingConfig.push({
                    building_name: this.buildingData['building_name'],
                    building_id: this.buildingData['building_id'],
                    building_floor: element.floor,
                    layout: element.layout,
                });
            });
            this.bConfig = [...this.buildingConfig];
            console.log(this.bConfig);
        });

        this.roomService.getRoomByBuildingId('B').subscribe(result => {
            this.roomData = {
                room: result,
            };
            this.roomData.room.forEach(element => {
                let array = [];
                array = element.room_image
                    .slice(1, element.room_image.length - 1)
                    .split('"', element.room_image.length);
                let final_arr = [];
                let j = 0;
                while (j < final_arr.length) {
                    // take every second element
                    final_arr.push(array[j]);
                    j += 2;
                }
                this.roomConfig.push({
                    room_no: element.room_no,
                    floor: element.floor,
                    building_id: element.building_id,
                    room_type: element.room_type,
                    room_rate: element.room_rate,
                    room_option_type: element.room_option_type,
                    room_image: final_arr[0],
                    room_status: element.room_status,
                    no_of_pax: element.no_of_pax,
                });
            });
            this.rConfig = [...this.roomConfig];
            console.log(this.rConfig);
        });

        this.seatConfig = [
            {
                building_name: 'C',
                seat_price: 250,
                seat_map: [
                    {
                        seat_label: '2nd Floor',
                        layout: 'ggggg_ggggg',
                        floor: '2',
                        path: '../../assets/Room_types/StudioLoft.jpg',
                    },
                    {
                        seat_label: '1st Floor',
                        layout: 'ggggg_ggggg',
                        floor: '1',
                        path: '../../assets/Room_types/Studio.jpg',
                    },
                    {
                        seat_label: 'Ground Floor',
                        layout: 'gggg___gggg',
                        floor: '0',
                        path: '../../assets/Room_types/BunkBed.jpg',
                    },
                ],
            },
        ];

        this.processSeatChart(this.seatConfig);

        this.processRoomChart(this.buildingConfig, this.roomConfig);
    }

    public processRoomChart(
        map_BuildingData: Array<any>,
        map_RoomData: Array<any>
    ) {
        let array = [];
        let array1 = [];

        array.push(map_RoomData);
        array1.push(map_BuildingData);
        console.log(array);
        console.log(array1);
        let mapObj;
        let layoutValArr;

        // for (let i = 0; i < map_BuildingData.length; i++) {
        //     console.log(map_BuildingData[i]);
        // }
        // for (let i = 0; i < map_RoomData.length; i++) {
        //     console.log(map_RoomData[i]);

        // mapObj = {
        //     seatRowLabel: map_RoomData[0][i].floor,
        //     seats: [],
        //     seatPricingInformation: map_RoomData[i].room_rate,
        // };
        // }
        console.log(mapObj);
        // map_RoomData.forEach(element => {
        //     console.log(element);

        //     mapObj = {
        //         seatRowLabel: element.floor,
        //         seats: [],
        //         seatPricingInformation: element.room_rate,
        //     };
        // });

        // map_BuildingData[0].forEach(element => {
        //     console.log(element);

        //     layoutValArr = element.layout.split('');
        // });
        console.log(layoutValArr);
    }
    public processSeatChart(map_data: any[]) {
        if (map_data.length > 0) {
            var seatNoCounter = 1;
            for (let __counter = 0; __counter < map_data.length; __counter++) {
                var row_label = '';
                var item_map = map_data[__counter].seat_map;

                // Get the label name and price
                row_label = 'Row ' + item_map[0].seat_label + ' - ';
                // console.log(row_label);

                if (item_map[item_map.length - 1].seat_label != ' ') {
                    row_label += item_map[item_map.length - 1].seat_label;
                } else {
                    row_label += item_map[item_map.length - 2].seat_label;
                }
                row_label += ' : Rs. ' + map_data[__counter].seat_price;
                // console.log(row_label);
                item_map.forEach(map_element => {
                    var mapObj = {
                        seatRowLabel: map_element.seat_label,
                        seats: [],
                        seatPricingInformation: row_label,
                    };
                    row_label = '';
                    var seatValArr = map_element.layout.split('');
                    console.log(seatValArr);

                    if (this.seatChartConfig.newSeatNoForRow) {
                        seatNoCounter = 1; // Reset the seat label counter for new row
                    }
                    var totalItemCounter = 1;
                    seatValArr.forEach(item => {
                        var seatObj = {
                            key:
                                map_element.seat_label + '_' + totalItemCounter,
                            price: map_data[__counter]['seat_price'],
                            path: map_element.path,
                            status: 'available',
                        };

                        if (item != '_') {
                            if (seatNoCounter < 10) {
                                seatObj['seatNo'] =
                                    map_data[__counter].building_name +
                                    map_element.floor +
                                    '0' +
                                    seatNoCounter;

                                seatObj['seatLabel'] =
                                    map_element.seat_label +
                                    ' ' +
                                    seatObj['seatNo'];
                            } else {
                                seatObj['seatNo'] =
                                    '' +
                                    map_data[__counter].building_name +
                                    map_element.floor +
                                    seatNoCounter;

                                seatObj['seatLabel'] =
                                    map_element.seat_label +
                                    ' ' +
                                    seatObj['seatNo'];
                            }

                            seatNoCounter++;
                        } else {
                            seatObj['seatLabel'] = '';
                        }
                        totalItemCounter++;
                        mapObj['seats'].push(seatObj);
                    });
                    // console.log(' \n\n\n Seat Objects ', mapObj);
                    this.seatmap.push(mapObj);
                });
            }

            // for (let __counter = 0; __counter < map_data.length; __counter++) {
            //   var row_label = "";
            //   var rowLblArr = map_data[__counter]["seat_labels"];
            //   var seatMapArr = map_data[__counter]["seat_map"];
            //   for (let rowIndex = 0; rowIndex < rowLblArr.length; rowIndex++) {
            //     var rowItem = rowLblArr[rowIndex];
            //     var mapObj = {
            //       "seatRowLabel" : rowItem,
            //       "seats" : []
            //     };
            //     var seatValArr = seatMapArr[rowIndex].split('');
            //     var seatNoCounter = 1;
            //     var totalItemCounter = 1;
            //     seatValArr.forEach(item => {
            //       var seatObj = {
            //         "key" : rowItem+"_"+totalItemCounter,
            //         "price" : map_data[__counter]["seat_price"],
            //         "status" : "available"
            //       };

            //       if( item != '_')
            //       {
            //         seatObj["seatLabel"] = rowItem+" "+seatNoCounter;
            //         if(seatNoCounter < 10)
            //         { seatObj["seatNo"] = "0"+seatNoCounter; }
            //         else { seatObj["seatNo"] = ""+seatNoCounter; }

            //         seatNoCounter++;
            //       }
            //       else
            //       {
            //         seatObj["seatLabel"] = "";
            //       }
            //       totalItemCounter++;
            //       mapObj["seats"].push(seatObj);
            //     });
            //     console.log(" \n\n\n Seat Objects " , mapObj);
            //     this.seatmap.push( mapObj );
            //     console.log(" \n\n\n Seat Map " , this.seatmap);

            //   }

            // }
        }
    }

    public selectSeat(seatObject: any) {
        console.log('Seat to block: ', seatObject);
        if (seatObject.status == 'available') {
            seatObject.status = 'booked';
            this.cart.selectedSeats.push(seatObject.seatLabel);
            this.cart.seatstoStore.push(seatObject.key);
            this.cart.totalamount += seatObject.price;
        } else if ((seatObject.status = 'booked')) {
            seatObject.status = 'available';
            var seatIndex = this.cart.selectedSeats.indexOf(
                seatObject.seatLabel
            );
            if (seatIndex > -1) {
                this.cart.selectedSeats.splice(seatIndex, 1);
                this.cart.seatstoStore.splice(seatIndex, 1);
                this.cart.totalamount -= seatObject.price;
            }
        }
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
                            seatObj['status'] = 'unavailable';
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
