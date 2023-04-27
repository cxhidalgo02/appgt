import React, {useState} from 'react';
import * as rn from 'react-native';
import { database } from '../../config/firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { doc, deleteDoc} from 'firebase/firestore';

export default function Tutorias(
    {
        id,
        tema,
        descripcion,
        aula,
        hora,
        semana,
    }
) {

    // Id del usuario que inicia sesion
    const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
    // Id de la asignatura que seleccionar el usuario
    const pathIdAsigDoc = localStorage.getItem(`keyCodAsigDoc`, pathIdAsigDoc);
    // id de la tutoria que selecciona el usuario
    const pathIdTutDoc = localStorage.setItem("keyCodTutDoc", id);
    //path de tutorias
    const pathTutoria = `gestionUsuarios/${pathIdDoc}/asignaturas/${pathIdAsigDoc}/tutorias/${id}`
    console.log('D tutorias docente - pathTutoria => ', pathTutoria);

    const onDelete = () => {
        const docRef = doc(database, `gestionUsuarios/${pathIdDoc}/asignaturas/${pathIdAsigDoc}/tutorias/${id}`);
        deleteDoc(docRef);
    }

    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    return(
        <rn.TouchableOpacity 
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >
            <rn.View style={styles.productContainer}>
                <rn.Text style={styles.title}> {tema} </rn.Text>
                <rn.Text style={styles.subtitle}> {id} </rn.Text>
                <rn.Text style={styles.descrip}>
                    <MaterialCommunityIcons name="watermark" size={18} color="black" /> - {descripcion} </rn.Text>
                <rn.Text style={styles.information}> 
                    <Entypo name="chevron-right" size={18} color="black" /> Aula: {aula} 
                 </rn.Text>
                <rn.Text style={styles.information}> 
                    <Entypo name="chevron-right" size={18} color="black" /> Hora: {hora} 
                </rn.Text>
                <rn.Text style={styles.information}>
                    <Entypo name="chevron-right" size={18} color="black" /> {semana} 
                </rn.Text>

                    <rn.View style={styles.btnsContiner}>
                    <rn.Pressable 
                        onPress={() => navigation.navigate('validarAsistenciaScreen')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="user-check" size={25} color="black" />
                    </rn.Pressable>

                    <rn.Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.btnContiner}>
                        <AntDesign name="appstore1" size={25} color="black" />
                    </rn.Pressable>
                </rn.View>
            </rn.View>
            {isDeleteActive && (
                <rn.Pressable onPress={onDelete} style={styles.deleteButton}>
                <AntDesign name="delete" size={24} color="white" />
                </rn.Pressable>
            )}

            <rn.View style={styles.centeredView}>
                <rn.Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <rn.View style={styles.centeredView}>
                    <rn.View style={styles.modalView}>
                        <rn.Text style={styles.modalTextTitle}>INFORMACIÓN!</rn.Text>
                        <rn.Text style={styles.modalText}>Estudiantes inscritos:</rn.Text>
                        <rn.Text style={styles.modalText}>Tutorias validadas:</rn.Text>

                        <rn.Pressable
                        style={styles.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <rn.Text style={styles.textButtonClose}>CERRAR</rn.Text>
                        </rn.Pressable>

                    </rn.View>
                    </rn.View>
                </rn.Modal>
            </rn.View>

        </rn.TouchableOpacity>
    )
}

const styles = rn.StyleSheet.create({
    productContainer: {
        width: "85%",
        padding: 10,
        margin: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2E86C1",
        backgroundColor:"#fff",
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#293774',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#D4AC0D',
    },
    descrip: {
        fontSize: 16,
    },
    information: {
        color: 'black',
        fontSize: 16,
    },
    btnsContiner:{
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: "row",
    },
    btnContiner:{
        width: '50%',  
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    deleteButton: {
        position: "absolute",
        right: 8,
        top: 0,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#293774",
        borderRadius: 8,
      },
//VENTANA MODAL
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '80%',
      },
      modalView: {
        margin: 20,
        backgroundColor: '#FDFEFE',
        borderRadius: 10,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonClose: {
        marginTop: 20,
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        backgroundColor: '#D4AC0D',
      },
      textButtonClose: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalTextTitle: {
        marginBottom: 15,
        color: '#293774',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        fontSize: 16,
        color: '#293774',
        textAlign: 'center',
        padding: 8,
      },
});