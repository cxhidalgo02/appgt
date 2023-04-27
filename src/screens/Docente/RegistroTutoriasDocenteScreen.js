import * as React from 'react';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, 
  TextInput, ScrollView, RefreshControl } from 'react-native';
import { Select, CheckIcon, NativeBaseProvider} from 'native-base';
import localStorage from 'react-native-expo-localstorage';
import { initializeApp} from "firebase/app";
import { firebaseConfig } from '../../../firebase-config';
import { ALERT_TYPE, Dialog, } from 'react-native-alert-notification';

const RegistroTutoriasDocenteScreen = () => { 

  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const [nuevaTutoria, setnuevaTutoria] = React.useState({
    codigo: '',
    tema: '', 
    descripcion: '',
    aula: '',
    hora: '',
    semana: '',
    createdAt: new Date(),
  })

  const [codigo, setCodigo] = React.useState('')
  const [tema, setTema] = React.useState('')
  const [descripcion, setDescripcion] = React.useState('')
  const [aula, setAula] = React.useState('')
  const [hora, setHora] = React.useState('')
  const [semana, setSemana] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState('')

  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id de la asignatura que seleccionar el usuario
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);
 // id del codigo que selecciona en la tutoria
 
  const pathUrlDoc  = `gestionUsuarios/${pathIdDoc}/asignaturas/${pathIdAsig}/tutorias/`;
  const onSend = async () => {
    try {
      const docu = {
        codigo: codigo,
        tema: tema, 
        descripcion: descripcion,
        aula: aula,
        hora: hora,
        semana: semana,
        createdAt: new Date()
      };
      const docRef = doc(database, pathUrlDoc, docu.codigo);
      await setDoc(docRef, (docu) );
      alertRecordTutoria();
      navigation.goBack();
    } catch (error) {
      alertErrorTutoria();
      console.log('ERROR => ',error);
    }
  }
  
  const alertRecordTutoria = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Tutoria registrada',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

  const alertErrorTutoria = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error al registrar la tutoria',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
          <ScrollView style = {styles.scrollForm}
            refreshControl={
              <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
            } 
          >
          <Text style={styles.textTitle}>
            FORMULARIO
          </Text>
            <TextInput style = {styles.textInput}
              onChangeText={(text) => setCodigo(text)}
              placeholder="Codigo"
            />
            <TextInput style = {styles.textInput}
              onChangeText={(text) => setTema(text)}
              placeholder="Tema"
            />
            <TextInput style = {styles.textInput}
            onChangeText={(text) => setDescripcion(text)}
              placeholder="Descripción"
            />
            <TextInput style = {styles.textInput}
            onChangeText={(text) => setAula(text)}
              placeholder="Aula"
            />  
            <TextInput style = {styles.textInput}
            onChangeText={(text) => setHora(text)}
              placeholder="Hora"
            /> 
            <NativeBaseProvider>
              <Select 
                  id="tipo"
                  selectedValue={semana} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setSemana(itemValue)} 
                  _selectedItem={{endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Semana 1" value="Semana 1" />
                <Select.Item label="Semana 2" value="Semana 2" />
                <Select.Item label="Semana 3" value="Semana 3" />
                <Select.Item label="Semana 4" value="Semana 4" />
                <Select.Item label="Semana 5" value="Semana 5" />
                <Select.Item label="Semana 6" value="Semana 6" />
                <Select.Item label="Semana 7" value="Semana 7" />
                <Select.Item label="Semana 8" value="Semana 8" />
                <Select.Item label="Semana 9" value="Semana 9" />
                <Select.Item label="Semana 10" value="Semana 10" />
                <Select.Item label="Semana 11" value="Semana 11" />
                <Select.Item label="Semana 12" value="Semana 12" />
                <Select.Item label="Semana 13" value="Semana 13" />
                <Select.Item label="Semana 14" value="Semana 14" />
                <Select.Item label="Semana 15" value="Semana 15" />
                <Select.Item label="Semana 16" value="Semana 16" />
              </Select>
            </NativeBaseProvider>
          
            <TouchableOpacity style={styles.button} onPress={onSend} >
              <Text style={styles.textbutton}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};
export default RegistroTutoriasDocenteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 22, 
    textAlign: 'center', 
    marginBottom: 16, 
    color: '#293774', 
  },
  scrollForm: {
    textAlign: "center",
    marginTop: 80,
  },
  textInput:{
    borderWidth: 1,
    borderColor: "#2E86C1",
    backgroundColor:"#fff",
    padding:10,
    marginTop:20,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#293774',
    padding: 10,
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
  },
});