import React, {Component} from 'react';
import {AppRegistry, FlatList,StyleSheet,Text,View,ImageBackground,Image, Alert, Button, TouchableOpacity, Modal,Platform,TouchableHighlight} from 'react-native';
import Header from './Header';
import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './addModal';
import EditModal from './editModal';

const image = { uri: "https://i.pinimg.com/474x/04/27/5f/04275fe3dcc15b2c7dbbd01853efbc88.jpg" };

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeRowKey: null,
            numberOfRefresh:0
            //show:false
        };
    }
    // refreshFlatListItem=()=>{
    //     this.setState((prevState) => {
    //         return{
    //             numberOfRefresh:prevState.numberOfRefresh+1
    //         };
    //     });
    // }
    render () { 
        const swipeSettings = {
            autoClose: true,
            onClose: (secId,rowId,flexDirection) =>{
                if(this.state.activeRowKey !=null){
                this.setState({activeRowKey:null});
                }
            },
            onOpen:(secId,rowId,direction) => {
                this.setState({activeRowKey: this.props.item.key});
            },
            right :[
                {
                    onPress:() =>{
                    //alert("update");
                    this.props.parentFlatList.refs.EditModal.showEditModal(flatListData[this.props.index],this);
                    },
                    text: 'EDIT',type: 'primary',backgroundColor:this.props.index % 2 == 0 ? '#0078D9' : '#0386F0', color:'yellow', fontWeight:'bold'
                },
                {
            onPress: () => {
                const deletingRow=this.state.activeRowKey;
                Alert.alert(
                    'PERHATIAN',    
                'apakah kamu yakin akan Menghapusnya???',
                [{text:'No', onPress: () => console.log('Cancel Pressed'),style: 'cancel'},
                {text:'Yes', onPress: () => {flatListData.splice(this.props.index,1);
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                }},
                ],
                {cancelable:true}
                )
                
            },
                text: 'PESAN', type: 'Delete', backgroundColor:this.props.index % 2 == 0 ? '#92072F' : '#922507', color:'yellow', fontWeight:'bold'
            }
            ],
            rowId: this.props.index,
            SelectionId: 1
            };
        return(
                <Swipeout {...swipeSettings}>
                <View style={{
                    flex:1,
                    flexDirection:'column',
                    height:150,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

           
            <View style={{
                flex:1,
                flexDirection: 'row',
                opacity: 75,
                backgroundColor:this.props.index % 2 == 0 ? '#364049' : '#626D77'
                //backgroundColor:'#C45BAE',

            }}>
                <Image
                source={{uri:this.props.item.imageUrl}}
                style={{width:120, height:120,margin: 5,borderRadius:70}}
                />
            <View style={{
                flex:1,
                flexDirection: 'column',
            }}>
            <Text style={styles.flatListItem}>{this.props.item.name}</Text> 
            <Text style={styles.flatListItemCd}>{this.props.item.description}</Text>
                   </View>
            </View>
            <View style={{
                height: 1,
                backgroundColor:'white'
            }}>

            </View>
            </View>
            </Swipeout>

        )
    }
}

const styles=StyleSheet.create({
    flatListItem:{
        color : 'yellow',
        fontWeight: 'bold',
        padding : 7,
        fontSize: 20
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    flatListItemCd:{
        color : 'white',
        fontWeight: 'bold',
        fontSize: 10
    }
});
export default class BasicFlatListData extends Component{
    constructor(props) {
        super(props);
        this.state=({
            deleteRowKey:null,
        });
        this._onPressAdd=this._onPressAdd.bind(this);
    }
    refreshFlatList=(activedKey) => {
        this.setState((prevState) =>{
            return{
                deletedRowKey:activedKey
            };
        });
        this.refs.FlatList.scrollToEnd();
    }
    _onPressAdd(){
        //alert("berhasil Ditambah")
        this.refs.AddModal.showAddModal();
    }
    render() {
        return(
        <View style={{flex:1,marginTop:Platform.OS=== 'android' ? 34 : 0}}>
            <View
            style={{
                backgroundColor:'black',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <TouchableHighlight
                style={{marginRight:10}}
                underlayColor= 'blue'
                onPress={this._onPressAdd}
                >
                    <Image
                    style={{width:35, height:35}}
                    source={require('../icons/add.png')}
                    />

                    </TouchableHighlight>
                    </View>
             <Header/>
            <FlatList
            ref={"FlatList"}
            data={flatListData}
            renderItem={({item, index}) => {
                return(
                        <FlatListItem item={item} index= {index} parentFlatList={this}>
                                
                        </FlatListItem>
                );
            }}>
            </FlatList>
            <AddModal ref={'AddModal'} parentFlatList={this}>

            </AddModal>
            <EditModal ref={'EditModal'} parentFlatList={this}>

            </EditModal>
            
        </View>
        )
    }
}