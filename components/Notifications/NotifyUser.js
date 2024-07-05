import axios from "axios";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from "react-native";

export default function NotifyUser({ route }) {

    const { id, expoToken, name } = route.params
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [message, setMessage] = useState()

    async function Notify() {
        try {
            const response = await axios.post('https://memory-keeper-websocket-d3c6b3f6cfe9.herokuapp.com/notify', { id: id, expoToken: expoToken, title: title, body: body })
            if (response.data.body) {
                setMessage('Отправлено')
            } else (
                setMessage('Не отправлено')
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TouchableWithoutFeedback style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}} onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, backgroundColor: 'black',alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 20, alignSelf: 'center', fontWeight: '500', position: 'absolute', top: 50}}>{name}</Text>
                <View style={{width: 'auto', height: 250, justifyContent: 'space-evenly'}}>
                    <Text style={{fontSize: 20, color: 'red', fontWeight: '500', alignSelf: 'center', marginTop: 15}}>{message}</Text>
                    <TextInput onChangeText={(text) => setTitle(text)} style={{marginTop: 20, color: 'white', width: 250, height: 50, backgroundColor: '#191919', borderRadius: 12, padding: 10}} placeholder="Заголовок" placeholderTextColor="#949494"></TextInput>
                    <TextInput onChangeText={(text) => setBody(text)} style={{width: 250, color: 'white', height: 50, backgroundColor: '#191919', borderRadius: 12, padding: 10}} placeholder="Тело уведомления" placeholderTextColor="#949494"></TextInput>
                    <Text style={{color: 'white', fontSize: 15, alignSelf: 'center', fontWeight: '500', position: 'absolute', top: 0}}>Уведомление</Text>
                    <TouchableOpacity onPress={() => Notify()} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 100, height: 30, borderRadius: 12, alignSelf: 'center'}}>
                        <Text style={{fontWeight: '500', color: 'black', fontSize: 16}}>Отправить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

// borderColor: 'white', borderWidth: 1, borderStyle: 'solid'