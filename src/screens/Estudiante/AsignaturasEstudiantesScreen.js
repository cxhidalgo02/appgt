import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import AsignaturasEstudiantes from '../../components/AsignaturasEstudiantes';
import { StyleSheet, View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';
import { ALERT_TYPE, Dialog, } from 'react-native-alert-notification';
import { Skeleton } from 'moti/skeleton'; 
import { MotiView } from 'moti';

const AsignaturasEstudiantesScreen = () => {
  
  const [asignaturasEstudiante, setNuevaListaAE] = React.useState([]);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
      <Pressable title='registroAsignaturasEstudianteScreen'
          onPress={() => navigation.navigate('registroAsignaturasEstudianteScreen')}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
          <AntDesign name="pluscircleo" size={28} color="#293774" style={{ marginRight: 10 }}/>
        </Pressable>
  })
  },[navigation])

  const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
  const consultaAsig = () =>{
    const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/`);
    const q = query(collectionRef, where('validada', '==','true'));
    const setDocAsignaturas = onSnapshot(q, querySnapshot => {
        setNuevaListaAE(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              codigo: doc.data().codigo,
              nombre: doc.data().nombre,
              tipo: doc.data().tipo,
              validada: doc.data().validada,
              createdAt: doc.data().createdAt,
            }))
          );
        } 
        );
    return setDocAsignaturas;
  }

  const alertWelcome = () => {
    Dialog.show({
       type: ALERT_TYPE.SUCCESS,
       title: 'Bienvenido',
     })
   }

  React.useEffect(() => {
    consultaAsig();
    alertWelcome(); 
  },[])

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
            {asignaturasEstudiante.map(asignaturasEstudiante => <AsignaturasEstudiantes key={asignaturasEstudiante.id} {...asignaturasEstudiante}/>)}
          </ScrollView>
        </React.Suspense>
      </View>
    </SafeAreaView>
  );
};
export default AsignaturasEstudiantesScreen;

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
  textInput:{
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
    backgroundColor: '#2E86C1',
    padding: 10,
    width: "80%",
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
  },
  btnContiner:{
    width: '35%',  
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  btnsContiner:{
    width: '75%',
    backgroundColor: 'transparent',
    flexDirection: "row",
  },
  productContainer: {
    width: "80%",
    padding: 10,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
},
  title: {
      fontSize: 18,
  },
});