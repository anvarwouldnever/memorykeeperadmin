import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function QRinput() {

    const [id, setId] = React.useState('')
    const navigation = useNavigation()

    return (
        <View style={{backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput onChangeText={(text) => setId(text)} style={{width: 358, height: 40, backgroundColor: 'white', borderRadius: 12, padding: 10}} placeholder="Вставьте id"/>
            <TouchableOpacity onPress={() => navigation.navigate('QRcode', {id: id})} style={{width: 110, height: 40, backgroundColor: 'white', marginTop: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 14}}>Сгенерировать</Text>
            </TouchableOpacity>
        </View>
    )
}