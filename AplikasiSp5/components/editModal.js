import React, {Component} from 'react';
import {AppRegistry,View,Text,StyleSheet,
FlatList,Image, Dimensions, Platform,TextInput
} from 'react-native';

import Modal from'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';


var screen = Dimensions.get('window');
export default class EditModal extends Component{
    constructor(props){
        super(props);
        this.state={
            FoodName:'',
            FoodDescription:''
        };
    }
    showEditModal=(editingFood,FlatListItem)=> {
        console.log ('editingFood = ${JSON.stringify(editingFood)}');
        this.setState({
            key:editingFood.key,
            FoodName:editingFood.name,
            FoodDescription:editingFood.description,
            FlatListItem:FlatListItem
        });
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
                >Tambah Daftar Menu Makanan Baru.</Text>
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
                onChangeText={(text) => this.setState({FoodName:text})}
                placeholder="Tambahkan Menu Baru"
                value={this.state.FoodName}
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
                onChangeText={(text) => this.setState({FoodDescription:text})}
                placeholder="Tambahkan Deskripsi Menu"
                value={this.state.FoodDescription}
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
                    if(this.state.FoodName.length == 0 || this.state.FoodDescription.length ==0){
                        alert("Harap Diisi Ulang Kembali");
                        return;
                    }
                    var foundIndex = flatListData.findIndex (item => this.state.key == item.key);
                    if (foundIndex < 0) {
                        return;
                    }
                    flatListData[foundIndex].name=this.state.FoodName;
                    flatListData[foundIndex].description=this.state.FoodDescription;
                    //this.state.flatListItem.refreshFlatListem();
                    this.refs.myModal.close();
                }}
                > Save</Button>
            </Modal>
        )
    }
}
