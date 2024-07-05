import React, { useState, useCallback } from "react";
import { Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Orders() {

    const navigation = useNavigation()
    const [orders, setOrders] = useState()

    async function getOrders() {
        try {
            const response = await axios.get('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/getordersadmin')
            const data = response.data
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getOrders();
        }, [])
    );
    
    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 600, width: SCREEN_WIDTH * 0.91}}>
                <ScrollView>
                    <TouchableHighlight>
                        <View style={{width: SCREEN_WIDTH * 0.91, height: 'auto', alignItems: 'center'}}>
                            {orders && orders.map((order, index) => {

                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('Order', {orderid: order.orderid, user: order.user, type: order.type, price: order.price, deadusers: order.deadusers, name: order.ordername})} key={index} style={{alignItems: 'center', justifyContent: 'center', width: 358, height: 76, borderRadius: 12, backgroundColor: order.type === 'completed'? '#0A0A0A' : '#191919', marginBottom: 10}}>
                                        <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>{order.ordername}</Text>
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