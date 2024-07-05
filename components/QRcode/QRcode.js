import React from "react";
import { View } from "react-native";
import QRCode from 'react-native-qrcode-svg'
import cover from '../icons/cover_black (1).png'

export default function QRcode({ route }) {

    const data = {
        id: route.params.id
    };

    const dataString = JSON.stringify(data);

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <QRCode logo={cover} logoSize={60} logoBorderRadius={12} logoMargin={5} value={dataString} onError={(error) => console.log(error)} quietZone={10} size={350} color="white" backgroundColor="black" logoBackgroundColor="black"/>
        </View>
    )
}