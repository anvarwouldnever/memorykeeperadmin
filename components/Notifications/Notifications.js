import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { View, ScrollView, TouchableHighlight, TouchableOpacity, Text, Dimensions } from "react-native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Notifications() {

    const [notifications, setNotifications] = React.useState()
    const navigation = useNavigation()

    async function getNotifications() {
        try {
            const response = await axios.get('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/getnotifiableusers')
            setNotifications(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getNotifications();
        }, [])
    );

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 600, width: SCREEN_WIDTH * 0.91}}>
                <ScrollView>
                    <TouchableHighlight>
                        <View style={{width: SCREEN_WIDTH * 0.91, height: 'auto', alignItems: 'center'}}>
                            {notifications && notifications.map((user, index) => {

                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('Notify', {id: user.id, expoToken: user.expoToken, name: user.name})} key={index} style={{alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH * 0.91, height: 76, borderRadius: 12, backgroundColor: '#0A0A0A', marginBottom: 10}}>
                                        <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>{user.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        </View>
    )
}