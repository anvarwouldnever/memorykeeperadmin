import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Image, KeyboardAvoidingView, ScrollView, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import io from 'socket.io-client'
import { useNavigation } from "@react-navigation/native";
import VectorBack from '../icons/angle-left.png'
import Vector from '../icons/arrow-up.png';

const socket = io.connect("https://memory-keeper-websocket-d3c6b3f6cfe9.herokuapp.com")

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Room({ route }) {

    const { room, username } = route.params
    
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        const joinRoom = (room) => {
            socket.emit("join_room", {room: room, username: username, isAdmin: true})
        }
        joinRoom(room)  
    }, [])

    const sendMessage = () => {
        Keyboard.dismiss()
        socket.emit("send_message", { author: 'admin', message: inputText, room: room, seen: 'user-unseen'})
        setInputText('')
        setMessages(prevMessages => [...prevMessages, { author: 'admin', text: inputText}]);
    };

    useEffect(() => {
        socket.on('fetch_messages', (data) => {
            const transformedData = data.map(item => ({
                author: item.author,
                text: item.text
            }));
            setMessages(prevMessages => [...prevMessages, ...transformedData])
        })
    }, [socket])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages(prevMessages => [...prevMessages, { author: 'user', text: data.message}]);
        })
    }, [socket])

    return ( 
    <View style={{flex: 1, backgroundColor: 'black', flexDirection: 'column', alignItems: 'center'}}>
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 200, width: 42, height: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}}>
                    <Image source={VectorBack} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <Text style={{width: 274, height: 28, color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center', lineHeight: 28, fontSize: 18, fontWeight: 400}}>{username}</Text>
            </View>
    <View style={{position: 'absolute', top: 148, left: 16, width: 358, height: 590}}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <TouchableHighlight>
                <View style={{width: SCREEN_WIDTH * 0.91, height: 'auto', marginBottom: 300}}>
                    {
                    messages && messages.map((message, index) => (
                            <View key={index} style={{alignSelf: message.author === 'admin'? 'flex-end' : 'flex-start', height: 'auto', width: 'auto', backgroundColor: message.author === 'admin'? 'white' : '#191919', justifyContent: 'flex-end', flexDirection: 'row', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderBottomLeftRadius: message.author === 'user'? 0 : 20, borderBottomRightRadius: message.author === 'user'? 20 : 0, paddingVertical: 20, paddingHorizontal: 22, marginVertical: 7}}>
                                <Text style={{color: message.author === 'admin' ? 'black' : 'white', width: 'auto', height: 'auto', fontWeight: '400', fontSize: 16, textAlign: 'left'}}>{message.text}</Text>
                            </View>
                        ))
                    }
                </View>
            </TouchableHighlight>
        </ScrollView>
    </View>
    <KeyboardAvoidingView style={{ position: 'absolute', top: 742, left: 10, width: SCREEN_WIDTH * 0.91, height: 56 }} behavior='position' keyboardVerticalOffset={10}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 295, height: 56, borderRadius: 200, borderColor: '#191919', borderWidth: 1, borderStyle: 'solid', padding: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#0A0A0A'}}>
                <TextInput value={inputText} onChangeText={(text) => setInputText(text)} style={{width: 239, height: 22, color: 'white', flexGrow: 1}} placeholder='Введите текст' placeholderTextColor={'#949494'}/>
            </View>
            <TouchableOpacity onPress={inputText === ''? () => console.log('пусто') : () => sendMessage()} style={{width: 56, height: 56, borderRadius: 200, backgroundColor: inputText === ''? '#191919' : 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={Vector} style={{width: 16, height: 16}}/>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>    
   </View>   
);

}

const styles = StyleSheet.create({
    header: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        top: 40,
        left: 16,
        position: 'absolute',
        width: 358,
        height: 80,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },

})