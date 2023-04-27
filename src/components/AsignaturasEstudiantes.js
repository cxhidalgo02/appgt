import React, {useState} from 'react';
import * as RN from 'react-native';
import "react-native-gesture-handler";
import { database } from '../../config/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { collection, query, where, getCountFromServer, doc, deleteDoc } from 'firebase/firestore';

export default function AsignaturasEstudiantes({
    id,
    codigo,
    nombre,
    tipo,
    createdAt,
}) {

    // Id del usuario que inicia sesion
    const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
    //guardo el codigo de asignatura que seleecione
    const pathCodAsigEst = localStorage.setItem("keyCodAsigEst", id);

    const onDelete = () => {
        const docRef = doc(database, `gestionUsuarios/${pathIdEst}/asignaturas/`, id);
            deleteDoc(docRef);
    }

    //Path para consultas de estudiante
    const pathAsig = `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}`
    console.log('E Asignaturas - pathAsig => ',pathAsig);

    const [numTutorias, setNumTutorias] = React.useState([]);
    async function numTutoriasData() {
        try {
            const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}/tutorias/`);
            const q = query(collectionRef);
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutorias(result);
            //console.log('# Tutorias => ', result);
        } catch (error) {
          console.log('Se produjo un error:', error);
        }
    }

    const [numTutoriasInscritas, setNumTutoriasInscritas] = React.useState([]);
    async function tutoriasInscritasData() {
        try {
            const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}/tutorias/`);
            const q = query(collectionRef, where('inscripcion', '==', 'true'));
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutoriasInscritas(result);
        } catch (error) {
          console.log('Se produjo un error:', error);
        }
    }

    const [numTutoriasValidadas, setNumTutoriasValidadas] = React.useState([]);
    async function tutoriasValidadasData() {
        try {
            const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}/tutorias/`);
            const q = query(collectionRef, where('validada', '==', 'true'));
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutoriasValidadas(result);
        } catch (error) {
          console.log('Se produjo un error:', error);
        }
    }

    React.useEffect(() => { 
        numTutoriasData();  
        tutoriasInscritasData(); 
        tutoriasValidadasData();
    },[])

    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    return(
        <RN.TouchableOpacity 
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >
             <RN.View style={styles.productContainer} >     
             <RN.Text style={styles.texttitle}>{ nombre }</RN.Text>
                <RN.Text style={styles.textsubtitle}>{ codigo}</RN.Text>
                <RN.Text style={styles.textContent}>Tipo: { tipo }</RN.Text>
                
                <RN.View style={styles.btnsContiner}>

                    <RN.Pressable title='tutoriasEstudianteScreen'
                        onPress={() => navigation.navigate('tutoriasEstudianteScreen')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="swatchbook" size={25} color="black" />
                    </RN.Pressable>

                    <RN.Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.btnContiner}>
                        <AntDesign name="appstore1" size={25} color="black" />
                    </RN.Pressable>
                </RN.View>
            </RN.View>
            {isDeleteActive && (
                <RN.Pressable onPress={onDelete} style={styles.deleteButton}>
                <AntDesign name="delete" size={24} color="white" />
                </RN.Pressable>
            )}

        <RN.View style={styles.centeredView}>
                <RN.Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <RN.View style={styles.centeredView}>
                    <RN.View style={styles.modalView}>
                        <RN.Text style={styles.modalTextTitle}>REPORTE DE TUTORIAS</RN.Text>
                            <RN.Text style={styles.modalText}>
                                Número de tutorías: { numTutorias }
                            </RN.Text>
                            <RN.Text style={styles.modalText}>
                                Tutorías inscritas: { numTutoriasInscritas } / { numTutorias }
                             </RN.Text>
                            <RN.Text style={styles.modalText}>
                                Tutorías validadas: { numTutoriasValidadas } / { numTutorias }
                            </RN.Text>

                        <RN.Pressable
                        style={styles.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <RN.Text style={styles.textButtonClose}>CERRAR</RN.Text>
                        </RN.Pressable>

                    </RN.View>
                    </RN.View>
                </RN.Modal>
            </RN.View>
        </RN.TouchableOpacity>
    )
}

const styles = RN.StyleSheet.create({
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
    texttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#293774',
        
    },
    textsubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D4AC0D',
    },
    textContent:{
        fontSize: 16,
        color: '#293774',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
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
    /* MODAL */
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
    },
    description: {
        color: "#56636F",
        fontSize: 13,
        fontWeight: "normal",
        width: "100%",
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