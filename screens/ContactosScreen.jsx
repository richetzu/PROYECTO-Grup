import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function ContactoScreen() {

const contactos = [
{
    id: "1",
    nombre: "Michael Arteaga",
    rol: "Estudiante",
    imagen: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    github: "https://github.com/richetzu/PROYECTO-Grup"
},
{
    id: "2",
    nombre: "Richard Pastaz",
    rol: "Estudiante",
    imagen: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    github: "https://github.com/richetzu/PROYECTO-Grup"
}
];

const abrirGithub = (url) => {
Linking.openURL(url);
};

return (
<View style={styles.container}>

<Text style={styles.titulo}>Equipo de Desarrollo</Text>

<FlatList
data={contactos}

renderItem={({ item }) => (

<View style={styles.card}>

<Image
source={{ uri: item.imagen }}
style={styles.imagen}
/>

<Text style={styles.nombre}>{item.nombre}</Text>
<Text style={styles.rol}>{item.rol}</Text>

<TouchableOpacity
style={styles.botonGithub}
onPress={() => abrirGithub(item.github)}
>
<Text style={styles.textoBoton}>Ver GitHub</Text>
</TouchableOpacity>

</View>

)}
/>

</View>
)
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:'#121212',
padding:20
},

titulo:{
fontSize:24,
color:'#fff',
fontWeight:'bold',
textAlign:'center',
marginBottom:20
},

card:{
backgroundColor:'#1E1E1E',
padding:20,
borderRadius:12,
marginBottom:15,
alignItems:'center'
},

imagen:{
width:90,
height:90,
borderRadius:50,
marginBottom:10
},

nombre:{
fontSize:18,
color:'#ffffff',
fontWeight:'bold'
},

rol:{
fontSize:14,
color:'#aaa',
marginBottom:10
},

botonGithub:{
backgroundColor:'#00E676',
paddingVertical:8,
paddingHorizontal:20,
borderRadius:8
},

textoBoton:{
color:'#000000',
fontWeight:'bold'
}

})