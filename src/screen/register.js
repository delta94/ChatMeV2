
import React, { Fragment, Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, AsyncStorage } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Content } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import firebase from '../config/firebase';
// import console = require('console');
import user from './User';

class App extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        name: '',
        img: ''

    }

    // when user press register button
    _handleRegister = () =>
    {

        if(this.state.name === '')
        {
            alert('name is empty');
        }
        else if(this.state.password == '')
        {
            alert('password is empty');
        }
        else if(this.state.email === '')
        {
            alert('email is empty')
        }
        else
        {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(({ user }) => 
                this._successHandler(user.uid)
            ).catch(error => this.setState({ errorMessage: error.message }))
        }

    }

    // when user is successfully registered
    _successHandler = (uid) =>
    {
        // console.log(this.state)

        // let getID = this.state.email;

        this._saveData(uid);

        alert('User Registered Successfully');
        console.log(JSON.stringify(this.state));

        
        // adding full information
        // await AsyncStorage.setItem('number')
        
        
        user.phone = uid;
        
        // POST to the database
        firebase.database().ref("users/" + uid).set({ name: this.state.name, img: this.state.img, email: this.state.email});
        
        // mavigate to another screen
        
        this.setState({
            email: '',
            img: '',
            password: '',
            name: '',
            phone: ''
        })

        if(user.phone != null || user.phone != undifined || user.phone != '')
        {

            // alert(user.phone);
            this.props.navigation.navigate('Home');
        }
        else
        {
            alert('empty global objects');
        }

    }

    _saveData = async (item) =>
    {


        await AsyncStorage.setItem('userPhone', item);

        alert("saved in asyncstorage");
    }

    render() {
        return (
            <Fragment >

                <Content >
                    <View style={styles.container}>

                    <Text style={{ fontSize: 50, color: "#d4d6d9", marginTop: 45 }}>Register</Text>
                        <Form >

                            <Image
                                source={require("../images/004-add.png")}
                                style={{ width: 150, height: 150, marginVertical: 50, marginHorizontal: 65 }}
                            />

                        <Item floatingLabel style={{ width: "75%" }}>
                            <Label>Images URL</Label>
                            <Input onChangeText={(img) => this.setState({ img })} />
                        </Item>
                        <Item floatingLabel style={{ width: "75%", marginTop: 35 }}>
                            <Label>Name</Label>
                            <Input onChangeText={(name) => this.setState({ name })} />
                        </Item>
                        <Item floatingLabel style={{ width: "75%", marginTop: 35 }}>
                            <Label>E-mail</Label>
                            <Input onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel style={{ width: "75%", marginTop: 35 }}>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                        </Item>
                        
                    </Form>
                    <Button style={{ marginTop: 35, marginBottom: 45, width: 100, marginLeft: "50%", borderRadius: 15, backgroundColor: "#86A8E7" }} onPress={() => this._handleRegister()} ><Text style={{ marginLeft: "25%", color: "#fff" }}> Register </Text></Button>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Auth")}>
                            <Text style={{ color: "#b0b0b0", marginBottom: 250 }}>
                            Already Have account ?
                        </Text>
                    </TouchableOpacity>
                    </View>
                </Content>
            </Fragment>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    contents: {
        alignSelf: "center",
        margin: "auto",
    },
    text: {
        width: "200"
    }
});

export default App;
