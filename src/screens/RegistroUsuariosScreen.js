import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, 
  SafeAreaView, TextInput, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { Select, CheckIcon,  NativeBaseProvider} from 'native-base';
import { initializeApp} from "firebase/app";
import { firebaseConfig } from '../../firebase-config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { ALERT_TYPE, Dialog} from 'react-native-alert-notification';

const RegistroUsuariosScreen = () => {

  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  const [cedula, setCedula] = React.useState('')
  const [nombres, setNombres] = React.useState('')
  const [apellidos, setApellidos] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [clave, setClave] = React.useState('')
  const [tipo, setTipo] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState(new Date())

    const onSend = async () => {
      const infoUsuario = createUserWithEmailAndPassword(auth, correo, clave
        ).then((userCredential) => {
          const user = userCredential.user;
          const docRef = doc(firestore, `gestionUsuarios/${user.uid}`);
          setDoc(docRef, {
            cedula: cedula, 
            nombres: nombres, 
            apellidos: apellidos, 
            correo: correo,
            clave: clave,
            tipo: tipo,
            createdAt: createdAt
          });
          return userCredential;
        });
        alertRecordUsuario();
        navigation.goBack();
    }

    const alertRecordUsuario = () => {
      try {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Usuario Registrado Correctamente',
        })
      } catch (error) {
        console.log("No pudo mostrar el Error:  ", error);
      }
    }

    const alertErrorUsuario = () => {
      try {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error al Registrar el Usuario',
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
            <TextInput
              style = {styles.textInput}
              placeholder="Cedula"
              keyboardType="numeric"
              onChangeText={(text) => setCedula(text)}
            />
            <TextInput
              style = {styles.textInput}
              placeholder="Nombres"
              onChangeText={(text) => setNombres(text)}
            />
            <TextInput
              placeholder="Apellidos"
              style = {styles.textInput}
              onChangeText={(text) => setApellidos(text)}
            />
            <TextInput 
              style = {styles.textInput}
              placeholder="Correo"
              onChangeText={(text) => setCorreo(text)}
            />
            <TextInput 
              style = {styles.textInput}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={(text) => setClave(text)}
            />
            <NativeBaseProvider>
              <Select 
                  selectedValue={tipo} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setTipo(itemValue)}
                  _selectedItem={{endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Docente" value="Docente" />
                <Select.Item label="Estudiante" value="Estudiante" />
              </Select>
            </NativeBaseProvider>
            <TouchableOpacity
              style={styles.button}
              onPress={onSend}>
              <Text style={styles.textbutton}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
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
    marginTop: 50,
  },
  textInput:{
    borderWidth: 1,
    borderColor: "#2E86C1",
    backgroundColor:"#fff",
    padding:10,
    paddingStart: 20,
    marginTop:20,
    borderRadius: 10,
  },
  selectOptions:{
    borderWidth: 1,
    borderColor: "#2E86C1",
    backgroundColor:"#fff",
    padding:10,
    paddingStart: 20,
    width: "80%",
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
export default RegistroUsuariosScreen;