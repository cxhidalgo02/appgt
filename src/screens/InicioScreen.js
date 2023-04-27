import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, 
          TextInput, ScrollView, LogBox, RefreshControl} from 'react-native';
import { Select, CheckIcon, } from 'native-base';
import localStorage from 'react-native-expo-localstorage';
import { ALERT_TYPE, Dialog, } from 'react-native-alert-notification';
import { NativeBaseProvider } from "native-base";

LogBox.ignoreAllLogs();

const InicioScreen = ({ navigation })=> {

  const [correo, setCorreo] = React.useState('');
  const [clave, setClave] = React.useState('');
  const [tipo, setTipo] = React.useState("");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);

  const alertErrorInicio = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error de inicio de sesión',
        textBody: 'Ingrese nuevamente su usuario y constraseña',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

 const handleSingIn = () =>{
    signInWithEmailAndPassword(auth, correo, clave)
    .then( (userCredential) => {      
      const user = userCredential.user;
      const userUid = user.uid;
      const collectionRef = collection(firestore, "gestionUsuarios");
      const q = query(collectionRef, where("id", "==", userUid));      
      const setUsuario = onSnapshot(q, querySnapshot => {
        setUsuario(querySnapshot.docs.map(doc => ({
          correo: doc.data().correo,
          clave: doc.data().clave,
          tipo: doc.data().tipo,
          createdAt: doc.data().createdAt,
          }))
        );
        switch(tipo){
          case "Docente":
            navigation.navigate('asignaturasDocenteScreen');
            localStorage.setItem("keyUserDoc", userUid);
            break;
          case "Estudiante":
            navigation.navigate('asignaturasEstudiantesScreen');
            localStorage.setItem("keyUserEst", userUid);
             break;
        }
       }
      );    
    })
    .catch( (error) => {
      console.log(" * ERROR * ",error)
      alertErrorInicio();
    });
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
            ACCEDER A SU CUENTA
          </Text>
            <TextInput style = {styles.textInput}
              id="Email"
              placeholder="Correo"
              textContentType="emailAddress"
              autoCapitalize='none'
              onChangeText={(text) => setCorreo(text)}/>
            <TextInput style = {styles.textInput}
              id="Pass"
              placeholder="Contraseña"
              textContentType="password"
              secureTextEntry
              autoCapitalize='none'
              type={shown ? 'text' : 'password'}
              onChangeText={(text) => setClave(text)}/> 

            <NativeBaseProvider>
              <Select 
                  id="tipoUsuario"
                  selectedValue={tipo} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setTipo(itemValue)} _selectedItem={{
                  endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Docente" value="Docente" />
                <Select.Item label="Estudiante" value="Estudiante" />
              </Select>
            </NativeBaseProvider>

              <TouchableOpacity style={styles.button} onPress={handleSingIn}>
                <Text style={styles.textbutton}>INICIO SESIÓN</Text>
              </TouchableOpacity>

            <TouchableOpacity style={styles.buttonTwo} onPress={() => navigation.navigate('resetClave')}>
              <Text style={styles.textbuttonTwo}>Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </ScrollView> 
      </View>
    </SafeAreaView>
  );
};
export default InicioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  scrollForm: {
    textAlign: "center",
    marginTop: 120,
  },
  textTitle: {
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 16, 
    color: '#293774',
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
  textSelect:{
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
  buttonTwo: {
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  textbuttonTwo: {
    color: '#293774',
  },
});