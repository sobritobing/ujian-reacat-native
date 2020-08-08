import React, {Component} from 'react';
import {AppRegistry,View,Text,StyleSheet,
FlatList,Image, Dimensions, Platform,TextInput
} from 'react-native';

import Modal from'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';


var screen = Dimensions.get('window');
export default class AddModal extends Component{
    constructor(props){
        super(props);
        this.state={
            newFoodName:'',
            newFoodDescription:''
        };
    }

    showAddModal=()=> {
        this.refs.myModal.open ();
    }
    generateKey = (numberOfCharacters) => {
        return require ('random-string')({length: numberOfCharacters});
    }
    render(){
        return(
            <Modal
            ref={"myModal"}

            style={{
                justifyContent: 'center',
                borderRadius: Platform.OS === 'android' ? 30 : 0,
                shadowRadius: 10,
                width: screen.width - 80,
                height:280
            }}
            position='Center'
            backdrop={true}
            onClosed={() =>{
                //alert("Modal Ditutup")
            }}
            >
                <Text 
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#364049',
                    textAlign: 'center',
                    marginTop: 10
                }}
                >ANGGOTA PEMERSATU BANGSA.</Text>
                <TextInput
                style={{
                    height: 40,
                    borderBottomColor:'#364049',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop:20,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.setState({newFoodName:text})}
                placeholder="Tambahkan Pemain Baru"
                value={this.state.newFoodName}
                />
                 <TextInput
                style={{
                    height: 40,
                    borderBottomColor:'#364049',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop:20,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.setState({newFoodDescription:text})}
                placeholder="Tambahkan Anggota Baru"
                value={this.state.newFoodDescription}
                />
                <Button
                style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: 'white'
                }}
                containerStyle={{
                    padding:8,
                    marginLeft: 70,
                    marginRight: 70,
                    heigt: 40,
                    borderRadius: 6,
                    backgroundColor: '#364049'
                }}
                onPress={() =>{
                    if(this.state.newFoodName.length == 0 || this.state.newFoodDescription.length ==0){
                        alert("Harap Diisi Ulang Kembali");
                        return;
                    }
                    const newKey =this.generateKey (24);
                    const newFood = {
                        key: newKey,
                        name : this.state.newFoodName,
                        imageUrl:"https://makananoleholeh.com/wp-content/uploads/2018/09/Soto-kudus--630x380.jpg",
                        description: this.state.newFoodDescription
                    };
                    flatListData.push(newFood);
                    this.props.parentFlatList.refreshFlatList(newKey);
                    this.refs.myModal.close();
                }}
                > Save</Button>
            </Modal>
        )
    }
}
