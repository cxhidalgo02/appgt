import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Asignaturas from '../../components/Asignaturas';
import { StyleSheet, View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { Skeleton } from 'moti/skeleton'; 
import { MotiView } from 'moti';

const AsignaturasDocenteScreen = () => {
  const [asignatura, setNuevaAsignatura] = React.useState([]);
  const navigation = useNavigation();

  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);

  const consultaAsig = () =>{
    
    const collectionRef = collection(database, `/gestionUsuarios/${pathIdDoc}/asignaturas/`);
    const q = query(collectionRef, orderBy('nombre', 'desc'));
    const setDocAsignaturas = onSnapshot(q, querySnapshot => {
        setNuevaAsignatura(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              codigo: doc.data().codigo,
              nombre: doc.data().nombre,
              tipo: doc.data().tipo,
              createdAt: doc.data().createdAt,  
            }))   
          );
        }
        ); 
    return setDocAsignaturas;
  }   

  const alertWelcome = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Bienvenido',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

  React.useEffect(() => { 
    alertWelcome();  
    consultaAsig(); 
  },[])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
      <Pressable title='registroAsignaturasDocenteScreen'
          onPress={() => navigation.navigate('registroAsignaturasDocenteScreen')}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
          <AntDesign name="pluscircleo" size={28} color="#293774" style={{ marginRight: 10 }}/>
        </Pressable>
  })
  },[navigation])

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const Spacer =  ({height = 25}) => <MotiView style={{height}}/>
  function MySkeleton() {
    return (
      <>
        <Skeleton width={'60%'} height={40} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={135} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={135} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={135} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={135} colorMode={'light'} />
      </>
    );
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container} >
          <React.Suspense fallback={<MySkeleton />}>
            <Text style={styles.textTitle}>
              MIS ASIGNATURAS
            </Text>
          
            <ScrollView style={styles.scrollAsig}   
              refreshControl={
                <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
              } 
            >
              {asignatura.map(asignatura => <Asignaturas key={asignatura.id} {...asignatura}/>)}
            </ScrollView> 
          </React.Suspense>
        </View>
      </SafeAreaView>    
  );
};
export default AsignaturasDocenteScreen;

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
    padding: 20,
    color: '#293774',
  },
  scrollAsig: {
    width: '90%',
  },
});