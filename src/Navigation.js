import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { firebaseConfig } from '../firebase-config';
import { initializeApp} from "firebase/app"; 
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'; 

import InicioScreen from "./screens/InicioScreen";
import RegistroUsuariosScreen from "./screens/RegistroUsuariosScreen";
import InformacionScreen from "./screens/informacionScreen";
import ResetClave from "./screens/ResetClaveScreen";
// SCREENS DE DOCENTES
import AsignaturasDocenteScreen from "./screens/Docente/AsignaturasDocenteScreen";
import RegistroAsignaturasDocenteScreen from "./screens/Docente/RegistroAsignaturasDocenteScreen";
import TutoriasDocenteScreen from "./screens/Docente//TutoriasDocenteScreen";
import RegistroTutoriasDocenteScreen from "./screens/Docente/RegistroTutoriasDocenteScreen";
import DarAltaEstudiantesScreen from "./screens/Docente/DarAltaEstudiantesScreen";
import ValidarAsistenciaScreen from "./screens/Docente/ValidarAsistenciaScreen";
// SCREEN DE ESTUDIANTES
import AsignaturasEstudiantesScreen from "./screens/Estudiante/AsignaturasEstudiantesScreen";
import RegistroAsignaturasEstudianteScreen from "./screens/Estudiante/RegistroAsignaturasEstudianteScreen";
import TutoriasEstudianteScreen from "./screens/Estudiante/TutoriasEstudianteScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function MyStack( ) {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#D4AC0D' },
        headerTintColor: '#293774',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen name="bottomTabNavigator"  component={BottomTabNavigator} options={{ headerShown: false}}/>   
      <Stack.Screen name="informacionScreen" component={InformacionScreen} options={{title:'Gestión de Tutorías',}} />
      <Stack.Screen name="resetClave" component={ResetClave} options={{title:'Restaurar mi clave',}} />
      
      <Stack.Screen name="asignaturasDocenteScreen" component={AsignaturasDocenteScreen} options={{title:'Lista asignaturas',}} />
      <Stack.Screen name="registroAsignaturasDocenteScreen" component={RegistroAsignaturasDocenteScreen} options={{title:'Agregar asignatura',}} />
      <Stack.Screen name="tutoriasDocenteScreen" component={TutoriasDocenteScreen} options={{title:'Lista tutorias',}} />
      <Stack.Screen name="registroTutoriasDocenteScreen" component={RegistroTutoriasDocenteScreen} options={{title:'Agregar tutoria',}} />
      <Stack.Screen name="darAltaEstudiantesScreen" component={DarAltaEstudiantesScreen} options={{title:'Lista estudiantes',}} />
      <Stack.Screen name="validarAsistenciaScreen" component={ValidarAsistenciaScreen} options={{title:'Lista estudiantes',}} />

      <Stack.Screen name="asignaturasEstudiantesScreen" component={AsignaturasEstudiantesScreen} options={{title:'Lista asignaturas',}} />
      <Stack.Screen name="registroAsignaturasEstudianteScreen" component={RegistroAsignaturasEstudianteScreen} options={{title:'Agregar asignatura',}} />
      <Stack.Screen name="tutoriasEstudianteScreen" component={TutoriasEstudianteScreen} options={{title:'Lista tutorias',}} />
    </Stack.Navigator>       
  )
}

function BottomTabNavigator({ navigation })  {

    //inicio notificaciones
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();  
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
    
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
  
    }, []);
  
    async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('No se pudo obtener el token de inserción para la notificación de inserción!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Debe usar un dispositivo físico para las notificaciones automáticas');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    }
  
    const sendMesaage = (token) => {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          title: 'Gestión Tutorias',
          body: 'Se ha permitido recibir notificaciones',
          data: { data: 'goes here' },
          _displayInForeground: true,
        }),
      });
    }
    //fin notificaciones

    return (
        <Tab.Navigator initialRouteName="Feed"
          screenOptions={{
            headerStyle: { backgroundColor: '#D4AC0D' },
            headerTintColor: '#293774',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
            <Tab.Screen
                name="INICIO"
                component={InicioScreen}
                options={{
                tabBarLabel: 'INICIO',
                tabBarActiveTintColor: '#D4AC0D', tabBarInactiveTintColor:'#293774',
                tabBarIcon: ({ color, size }) => (<AntDesign name="home" size={25} color="#293774" />),
                headerRight: () => (
                    <Pressable
                      onPress={() => navigation.navigate('informacionScreen')}
                      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
                      <AntDesign name="infocirlceo" size={25} color="#293774" style={{ marginRight: 16 }}/>
                    </Pressable>
                )
              }}
            />
            <Tab.Screen
                name="REGISTRO"
                component={RegistroUsuariosScreen}
                options={{
                tabBarLabel: 'REGISTRO', 
                tabBarActiveTintColor: '#D4AC0D', tabBarInactiveTintColor:'#293774',
                tabBarIcon: ({ color, size }) => (<AntDesign name="user" size={25} color="#293774" />),
                headerRight: () => (
                  <Pressable
                    onPress={() => sendMesaage(expoPushToken)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
                   <Ionicons name="notifications-outline" size={28} color="#293774" style={{ marginRight: 16 }}/>
                  </Pressable>
              )
              }}
            />
        </Tab.Navigator>
      );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

/*  
mostaza - #D4AC0D / azul - #293774 / blanco - #FDFEFE / verde - #0E6655 / gris - #B2BABB
*/