import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import axios from "axios";
import React from "react";
import { View, ScrollView, TouchableHighlight, TouchableOpacity, Text, Dimensions } from "react-native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Rooms() {

    const [rooms, setRooms] = useState()
    const navigation = useNavigation()

    async function getRooms() {
        try {
            const response = await axios.get('https://memory-keeper-websocket-d3c6b3f6cfe9.herokuapp.com/users')
            setRooms(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getRooms();
        }, [])
    );

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 600, width: SCREEN_WIDTH * 0.91}}>
                <ScrollView>
                    <TouchableHighlight>
                        <View style={{width: SCREEN_WIDTH * 0.91, height: 'auto', alignItems: 'center'}}>
                            {rooms && rooms.map((room, index) => {

                                const hasUnseenMessages = room.messages.some(message => message.seen === 'admin-unseen')

                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('Room', {room: room.room, username: room.username})} key={index} style={{alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH * 0.91, height: 76, borderRadius: 12, backgroundColor: '#0A0A0A', marginBottom: 10}}>
                                        {hasUnseenMessages && <View style={{backgroundColor: 'red', width: 10, height: 10, borderRadius: 200, position: 'absolute', right: 0, top: 0}}></View>}
                                        <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>{room.username}</Text>
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