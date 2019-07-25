/**
 * Licensed Materials - Property of IBM
 * 5900-A0N
 * (c) Copyright IBM Corporation 2018, 2019
 */

'use strict';

const initShipments = [
    { Shipment_id: 'SHIPMENT0',   Asset_id: 'ASSET-0',   Asset_descr: 'IoT Shipping Container/Trailer/pallet Monitoring Device',   Transport_id: '039651',   Transport_descr: '039651 : at local warehouse',   Company_name: 'A P Moller Maersk',   Address: '008, Warwick Retreat',   Biz_phone: '(731) 893-5055',   Biz_descr: 'A P Moller Maersk: Shipping Corporation',   Po_num: '680',   Pro_num: 'pro569',   Bill_lading: 'BL802428',   Device_id: 'device_2536',   Device_details: 'IoT device 2536',   Device_class: 'XT 4760 ',   Device_code: '119781',   Event_code: 'EPCIS-7440',   Event_descr: 'IoT Device Event : clearance in progress',   Event_timezone: 'MNT',   Latitude: 27.52,   Longitude: -44.29,   Temperature: -2.2,   Temperature_unit: 'Fahrenheit',   Humidity: 16.34,   accel_x: 150.39,   accel_y: -119.45,   accel_z: 34.1,   altitude: 11.18,   pressure: 720.58,   device_condition: 'bad' }, 
    { Shipment_id: 'SHIPMENT1',   Asset_id: 'ASSET-1',   Asset_descr: 'IoT Shipping Container/Trailer/pallet Monitoring Device',   Transport_id: '451020',   Transport_descr: '451020 : at local warehouse',   Company_name: 'LandStar',   Address: '772, Benhill Road',   Biz_phone: '(744) 484-9724',   Biz_descr: 'LandStar: Shipping Corporation',   Po_num: '823',   Pro_num: 'pro284',   Bill_lading: 'BL970489',   Device_id: 'device_7658',   Device_details: 'IoT device 7658',   Device_class: 'IDP-800',   Device_code: '891945',   Event_code: 'GTIN-5341',   Event_descr: 'IoT Device Event : in transit',   Event_timezone: 'CST',   Latitude: -77.73,   Longitude: -168.97,   Temperature: -4.8,   Temperature_unit: 'Fahrenheit',   Humidity: 14.29,   accel_x: 21.77,   accel_y: -143.71,   accel_z: -194.01,   altitude: 116.337,   pressure: 568.93,   device_condition: 'fair' }
]

async function Shipment (shipmentRecord) {
    let { Shipment_id, Asset_id, Asset_descr, Transport_id, Transport_descr,
        Company_name, Address, Biz_phone, Biz_descr, Po_num, Pro_num, Bill_lading,
        Device_id,Device_details, Device_class, Device_code,
        Event_code, Event_descr, Event_timezone,
        Latitude, Longitude, Temperature, Temperature_unit, Humidity,
        accel_x, accel_y, accel_z, altitude, pressure, device_condition} = shipmentRecord;
    let shipmentId = Shipment_id;
    let asset = { Asset_id, Asset_descr};
    let transport = { Transport_id, Transport_descr};
    let business = { Company_name, Address, Biz_phone, Biz_descr, Po_num, Pro_num, Bill_lading};
    let device = { Device_id, Device_details, Device_class, Device_code};
    let event = { Event_code, Event_descr, Event_timezone };
    let geolocation = { Latitude, Longitude};
    let environment = { Temperature, Temperature_unit, Humidity,
        accel_x, accel_y, accel_z, altitude, pressure, device_condition};
    let sShipment = {
        shipmentId,
        asset,
        transport,
        business,
        device,
        event,
        geolocation,
        environment
    };
    return sShipment;
}

exports.initShipments = initShipments;
exports.Shipment = Shipment;
