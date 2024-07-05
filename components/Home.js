import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Home() {

    const navigation = useNavigation()

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 'auto', height: 385, justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Verification')} style={{backgroundColor: '#191919', width: SCREEN_WIDTH * 0.91, height: 70, borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16, width: 'auto', height: 'auto'}}>Верификация</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={{backgroundColor: '#191919', width: SCREEN_WIDTH * 0.91, height: 70, borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16, width: 'auto', height: 'auto'}}>Заказы</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('QRinput')} style={{backgroundColor: '#191919', width: SCREEN_WIDTH * 0.91, height: 70, borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16, width: 'auto', height: 'auto'}}>Генерация QR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Rooms')} style={{backgroundColor: '#191919', width: SCREEN_WIDTH * 0.91, height: 70, borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16, width: 'auto', height: 'auto'}}>Сообщения</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{backgroundColor: '#191919', width: SCREEN_WIDTH * 0.91, height: 70, borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16, width: 'auto', height: 'auto'}}>Уведомления</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// borderColor: 'white', borderWidth: 1, borderStyle: 'solid',