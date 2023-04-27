import * as React from 'react';
import * as rn from 'react-native';
import { database } from '../../config/firebaseConfig';
import { doc, updateDoc,} from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons'; 
import localStorage from 'react-native-expo-localstorage';

export default function TutoriasEstudiante(
    {
        id,
        tema,
        descripcion,
        aula,
        hora,
        semana,
        inscripcion,
        validada,
        createdAt,
    }
) {    
    // Id del usuario que inicia sesion
    const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
    // Id de la asignatura que seleccionar el estudiante
    const pathCodAsigEst = localStorage.getItem(`keyCodAsigEst`, pathCodAsigEst); 
    // id de la tutoria que selecciona el estudiante
    const pathCodTutEst = localStorage.setItem("keyCodTutEst", id);

    const pathTutoria = `gestionUsuarios/${pathIdEst}/asignaturas/${pathCodAsigEst}/tutorias/${id}`;
    console.log('E Inscripcion Tutoria - pathTutoria => ',pathTutoria);

     const onInscribirse = () => {
        const docRef = doc(database, `/gestionUsuarios/${pathIdEst}/asignaturas/${pathCodAsigEst}/tutorias/${id}`);
                updateDoc(docRef, {inscripcion: 'true', });
    } 

    const [isValidateActive, setIsValidateActive] = React.useState(false);
    return(
        <rn.TouchableOpacity style={styles.productContainer} 
            onLongPress={() => setIsValidateActive(true)}
            onPress={() => setIsValidateActive(false)}
            activeOpacity={0.8}
        >
            
            <rn.Text style={styles.title}> {tema} </rn.Text>
            <rn.Text style={styles.subtitle}> {id} </rn.Text>
            <rn.Text style={styles.descrip}>
                <AntDesign name="tag" size={18} color="black" /> - {descripcion} 
            </rn.Text>
            <rn.Text style={styles.information}> 
                <AntDesign name="right" size={16} color="black" /> Aula: {aula} 
            </rn.Text>
            <rn.Text style={styles.information}> 
                <AntDesign name="right" size={16} color="black" /> Hora: {hora} 
            </rn.Text>
            <rn.Text style={styles.information}>
                <AntDesign name="right" size={16} color="black" /> {semana} </rn.Text>
            <rn.Text style={styles.information}>
                <AntDesign name="right" size={16} color="black" /> Inscrito: {inscripcion} 
            </rn.Text>
            <rn.Text style={styles.information}>
                <AntDesign name="right" size={16} color="black" /> Validada: {validada} 
            </rn.Text>

            <rn.View style={styles.btnsContiner}>
                {isValidateActive && (
                    <rn.Pressable onPress={onInscribirse} style={styles.validateButton}>
                        <AntDesign name="checksquareo" size={24} color="white" />
                    </rn.Pressable>
                )}
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
    validateButton: {
        position: "absolute",
        right: -20,
        marginTop: 0,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D4AC0D",
        borderRadius: 8,
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
        marginTop: 10,
        backgroundColor: 'transparent',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});