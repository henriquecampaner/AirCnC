import React, {useState, useEffect} from 'react';
import {SafeAreaView,AsyncStorage,Text,Alert,Image,StyleSheet, ScrollView} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

import socketio from 'socket.io-client';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.101:3333',{
                query: {user_id}
            })

            socket.on('booking_response', booking =>{
                Alert.alert(`Your booking in ${booking.spot.company} in ${booking.date} was ${booking.approved ? 'Approved' : 'Reject'}`)
            })
        })
    },[])

    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storageTechs =>{
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        });
    },[]);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    }
});