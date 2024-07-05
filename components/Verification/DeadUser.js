import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, ActivityIndicator, Dimensions } from "react-native";
import { storage } from "../../FirebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function DeadUser({ route }) {

    const {id, name, location } = route.params
    const [passportsUris, setPassportsUris] = useState()
    const [city, setCity] = useState('')
    const [borndate, setBorndate] = useState('')
    const [deathdate, setDeathdate] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        getPassports()
    }, [])

    async function getPassports() {
        try {
            const listRef = ref(storage, `${id}/passports/`);
            const result = await listAll(listRef);
            const uris = await Promise.all(result.items.map(item => getDownloadURL(item)));
            setPassportsUris(uris)
        } catch (error) {
            console.log(error)
        }
    }

    async function Approve() {
        try {
            setLoading(true)
            await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/proverelative', {id: id, deathdate: deathdate, borndate: borndate, city: city})
            navigation.goBack()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{alignItems: 'center', justifyContent: 'center', width: 42, height: 42, backgroundColor: '#191919', borderRadius: 200, position: 'absolute', top: 60, left: 10}}>
                <Text style={{color: 'white'}}>{'<'}</Text>
            </TouchableOpacity>
           <View style={{position: 'absolute', top: 120, left: 10, width: 'auto'}}>
                <Text style={{fontWeight: '500', color: 'white', fontSize: 16}}>Имя: {name}</Text>
                <Text style={{fontWeight: '500', color: 'white', fontSize: 16}}>Место захоронения:</Text>
                <Text style={{fontWeight: '500', color: 'white', fontSize: 16}}>широта-{location[0].latitude}</Text>
                <Text style={{fontWeight: '500', color: 'white', fontSize: 16}}>долгота-{location[0].longitude}</Text>
           </View>
           <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 250, left: 10, width: 'auto', height: 40}}>
                <TextInput onChangeText={(text) => setCity(text)} style={{backgroundColor: '#191919', width: 100, height: 40, borderRadius: 12, color: 'white', padding: 10}} placeholder="город" placeholderTextColor='white'></TextInput>
                <TextInput onChangeText={(text) => setBorndate(text)} style={{backgroundColor: '#191919', width: 100, height: 40, borderRadius: 12, color: 'white', padding: 10, marginHorizontal: 10}} placeholder="дата рождения" placeholderTextColor='white'></TextInput>
                <TextInput onChangeText={(text) => setDeathdate(text)} style={{backgroundColor: '#191919', width: 100, height: 40, borderRadius: 12, color: 'white', padding: 10}} placeholder="дата смерти" placeholderTextColor='white'></TextInput>
           </View>
           <View style={{position: 'absolute', top: 320}}>
            <ScrollView horizontal={true}>
                <TouchableHighlight>
                    <View style={{width: 'auto', height: SCREEN_HEIGHT * 0.415876, flexDirection: 'row'}}>
                            {passportsUris && passportsUris.map((uri, index) => (
                                    <Image key={index} source={{ uri }} style={{borderRadius: 12, marginHorizontal: 10, borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.91, height: 'auto'}} resizeMode="contain"/>
                            ))}
                    </View>
                </TouchableHighlight>
            </ScrollView>
           </View>
           <View style={{alignItems: 'center', position: 'absolute', top: SCREEN_HEIGHT * 0.888625, width: SCREEN_WIDTH * 0.91, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => Approve()} style={{width: SCREEN_WIDTH * 0.441025, height: 56, backgroundColor: 'white', borderRadius: 200, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: 'black'}}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: SCREEN_WIDTH * 0.441025, height: 56, backgroundColor: '#191919', borderRadius: 200, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#949494'}}>Disapprove</Text>
                </TouchableOpacity>
           </View>
           {loading && <ActivityIndicator size='large' color='white' style={{position: 'absolute', top: 400}}/>}
        </View>
    )
}