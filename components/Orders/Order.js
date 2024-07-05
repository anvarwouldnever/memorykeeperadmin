import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import axios from "axios";

export default function Order({ route }) {

    const { orderid, user, type, price, deadusers, name } = route.params
    const [blobs, setBlobs] = React.useState([])
    const [uri, setUris] = React.useState([])

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [3, 4],
            quality: 0.5,
            allowsMultipleSelection: true,
        });
    
        if (!result.canceled) {

            const blobsArray = [];
            const uriArray = [...uri];

            async function processAsset(asset) {
                const response = await fetch(asset.uri);
                const blob = await response.blob();
                blobsArray.push(blob);
                uriArray.push({uri: asset.uri, type: asset.type});
            }

            await Promise.all(result.assets.map(processAsset));

            setBlobs(blobsArray)
            setUris(uriArray)
        }
    };
    
    async function firebaseFilesUpload(orderid) {
        for (const blob of blobs) {
            const storageRef = ref(storage, `orders/${orderid}/${orderid}` + generateUniqueFileName());
            await uploadBytesResumable(storageRef, blob);
        }
        try {
            const files = []
            const userFolderRef = ref(storage, `orders/${orderid}/`);
            const filesList = await listAll(userFolderRef); 

            for (const fileRef of filesList.items) {
                const downloadURL = await getDownloadURL(fileRef);
                const metadata = await getMetadata(fileRef);
                const type = metadata.contentType;
                files.push({ downloadURL, type });
            }
            return files
        } catch (error) {
            console.error('Ошибка при получении списка файлов:', error);
        }
    }



    const generateUniqueFileName = () => {
        const timestamp = new Date().getTime(); 
        const randomString = Math.random().toString(36).substring(2, 8);
        return `file_${timestamp}_${randomString}`;
    };

    async function CompleteAndUpload() {
        try {
            const uris = await firebaseFilesUpload(orderid)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/completeorder', {orderid: orderid, uris: uris})
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center'}}>
            <View style={{width: 358, height: 70, marginTop: 50, justifyContent: 'space-around'}}>
                <Text style={{fontWeight: '500', fontSize: 16, color: 'white', alignSelf: 'center'}}>Заказчик:</Text>
                <Text style={{color: 'white'}}>Имя: {user.name}</Text>
                <Text style={{color: 'white'}}>Контакты: {user.email}</Text>
            </View>
            <Text style={{fontWeight: '500', fontSize: 16, color: 'white', marginTop: 25}}>Кому:</Text>
            <View style={{width: 'auto', height: 'auto'}}>
                <ScrollView horizontal={true}>
                    <View style={{alignItems: 'center', width: 'auto', height: 200, marginTop: 25, flexDirection: 'row'}}>
                        {deadusers && deadusers.map((deaduser, index) => {
                            return (
                                <View key={index} style ={{borderRadius: 12, padding: 10, marginHorizontal: 10, width: 200, height: 200, backgroundColor: '#191919'}}>
                                    <Text style={{alignSelf: 'center', color: 'white', fontSize: 14, fontWeight: '500'}}>{deaduser.name}</Text>
                                    <Text style={{color: 'white', fontSize: 10, marginTop: 10}}>Дата рождения: {deaduser.borndate}</Text>
                                    <Text style={{color: 'white', fontSize: 10, marginTop: 10}}>Дата смерти: {deaduser.deathdate}</Text>
                                    <Text style={{color: 'white', fontSize: 10, marginTop: 10}}>Место захоронения:</Text>
                                    <Text style={{marginLeft: 5, color: 'white', fontSize: 10, marginTop: 10}}>долгота: {deaduser.location[0].longitude}</Text>
                                    <Text style={{marginLeft: 5, color: 'white', fontSize: 10, marginTop: 10}}>широта: {deaduser.location[0].latitude}</Text>
                                    <Text style={{color: 'white', fontSize: 10, marginTop: 10}}>Тип заказа: {name}</Text>
                                    <Text style={{color: 'white', fontSize: 10, marginTop: 10}}>На сумму: {price.substring(0, 3) / deadusers.length} 000</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={{top: 410, width: 'auto', height: 85, position: 'absolute', left: 10, justifyContent: 'space-between'}}>
                <Text style={{ fontWeight: '500', fontSize: 20, color: 'white', width: 'auto' }}>Фото-отчет</Text>
                <TouchableOpacity onPress={() => pickImage()} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919', width: 358, height: 42, borderRadius: 200}}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: '500', }}>+ Добавить</Text>
                </TouchableOpacity>
            </View>
            <View style={{position: 'absolute', top: 500, width: 'auto', height: 'auto', flexDirection: 'row'}}>
                <ScrollView horizontal={true}>
                    <View style={{width: 'auto', height: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between'}}>
                        {uri && uri.map((item, index) => (
                            item.type === 'image' ? (
                                <Image
                                    key={index}
                                    source={{ uri: item.uri }}
                                    style={{marginHorizontal: 5, width: 120, height: 120, borderRadius: 5, marginTop: 8 }}
                                />
                                    ) : (
                                <Video
                                    key={index}
                                    source={{ uri: item.uri }}
                                    style={{ width: 120, height: 120, borderRadius: 5, marginTop: 8 }}
                                    useNativeControls
                                    focusable={false}
                                />
                            )
                        ))}
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity onPress={type === 'inprogress'? () => CompleteAndUpload() : () => console.log('выполнен')} style={{alignItems: 'center', justifyContent: 'center', width: 358, height: 44, backgroundColor: type === 'inprogress'? 'white' : '#191919', bottom: 250, borderRadius: 200}}>
                    <Text style={{color: type === 'inprogress'? 'black' : 'white', fontSize: 16, fontWeight: '500'}}>{type === 'inprogress'? 'Завершить' : 'Выполнен'}</Text>
            </TouchableOpacity>
        </View>
    )
}