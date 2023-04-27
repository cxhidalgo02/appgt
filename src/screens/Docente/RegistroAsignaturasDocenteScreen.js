import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, 
  TextInput, ScrollView, RefreshControl } from 'react-native';
import { Select, CheckIcon, NativeBaseProvider,} from 'native-base';
import { doc, setDoc, getFirestore, Firestore, } from 'firebase/firestore';
import { database } from '../../../config/firebaseConfig';
import localStorage from 'react-native-expo-localstorage';
import { initializeApp} from "firebase/app";
import { firebaseConfig } from '../../../firebase-config';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const RegistroAsignaturasDocenteScreen = () => { 
  
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const [nombre, setNombreAsignatura] = React.useState('')
  const [codigo, setCodigoAsignatura] = React.useState('')
  const [tipo, setTipo] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState(new Date())

  //  Id del usuario que inicia sesion - nnLosuPGVMRnFcthuMH9p40mkr43
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);

  const pathUrl = `gestionUsuarios/${pathIdDoc}/asignaturas/`;
  const navigations = useNavigation();
  const onSend = async () => {
    try {
      const docu = {
        id: codigo,
        nombre: nombre,
        codigo: codigo,
        tipo: tipo,
        createdAt: createdAt
      };
      const docRef = doc(database, pathUrl, docu.codigo);
      await setDoc(docRef, (docu) );
      alertRecordAsignatura();
      navigation.goBack();
      
    } catch (error) {
      alertErrorAsignatura();
      console.log('ERROR =>', error);
    }

  }

  const alertRecordAsignatura = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Asignatura registrada',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

  const alertErrorAsignatura = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error al registrar la asignatura',
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
              onChangeText={(text) => setNombreAsignatura(text)}
              placeholder="Nombre de la asignatura"
            />
            <TextInput style = {styles.textInput}
              onChangeText={(text) => setCodigoAsignatura(text)}
              placeholder="Codigo de la asignatura"
            />
            <NativeBaseProvider>
              <Select 
                  id="tipo"
                  selectedValue={tipo} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setTipo(itemValue)} _selectedItem={{
                  endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Troncal" value="Troncal"/>
                <Select.Item label="Genérica" value="Genérica"/>
                <Select.Item label="Complementaria" value="Complementaria"/>
                <Select.Item label="Libre configuración" value="Libre configuración"/>
                <Select.Item label="Formación Básica" value="Formación Básica"/>
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
export default RegistroAsignaturasDocenteScreen;

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
    marginTop: 100,
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