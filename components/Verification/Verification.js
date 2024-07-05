import axios from "axios";
import React, { useState, useCallback } from "react";
import { ScrollView, Text, TouchableHighlight, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Verification() {

    const navigation = useNavigation()
    const [deadUsersList, setDeadUsersList] = useState()

    async function getDeadUsers() {
        try {
            const response = await axios.get('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/getdeadusers')
            const data = response.data
            setDeadUsersList(data)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getDeadUsers();
        }, [])
    );

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 600, width: SCREEN_WIDTH * 0.91}}>
                <ScrollView>
                    <TouchableHighlight>
                        <View style={{width: SCREEN_WIDTH * 0.91, height: 'auto', alignItems: 'center'}}>
                            {deadUsersList && deadUsersList.sort((a, b) => a.isProven - b.isProven).map((deaduser, index) => {

                                return (
                                    <TouchableOpacity key={index} style={{alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH * 0.91, height: 76, borderRadius: 12, backgroundColor: deaduser.isProven? '#0A0A0A' : '#191919', marginBottom: 10}} onPress={() => navigation.navigate('DeadUser', {id: deaduser._id, name: deaduser.name, location: deaduser.location})}>
                                        <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>{deaduser.name}</Text>
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

// borderColor: 'white', borderWidth: 1, borderStyle: 'solid',