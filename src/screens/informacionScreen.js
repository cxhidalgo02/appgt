import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Skeleton } from 'moti/skeleton'; 
import { MotiView } from 'moti';

const image = {uri: 'https://www.utpl.edu.ec/sites/default/files/archivos/marca%20UTPL%202018-03.png'};

const Spacer =  ({height = 25}) => <MotiView style={{height}}/>

function MySkeleton() {
  return (
    <>
      <Skeleton width={'10%'} height={40} colorMode={'light'} />
      <Spacer/>
      <Skeleton width={'80%'} height={150} colorMode={'light'} />
      <Spacer/>
      <Skeleton width={'60%'} height={80} colorMode={'light'} />
    </>
  );
}

const informacionScreen = ({ route, navigation })  => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <View style={styles.subcontainer}>

          <React.Suspense fallback={<MySkeleton />}>
            <AntDesign name="appstore-o" size={35} color="#293774" style={{marginBottom: 25}} />

            <Text style={styles.textContent}>
                La aplicación esta desarrollada para el control y seguimiento 
                de tutorias a los estudiantes en la modalidad presencial.
            </Text>
          </React.Suspense>
          
        </View>
        <View style={styles.subcontainer2}>
        <ImageBackground source={image} style={styles.image}/>
        </View>
        
      </View>
    </SafeAreaView>
  );
};
export default informacionScreen;

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: '50%',
  },
  container: {
    flex: 1, 
    backgroundColor: '#FDFEFE',
  },
  subcontainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 80,
  },
  subcontainer2: {
    flex: 1, 
    alignItems: 'flex-end',
  },
  textContent: {
    fontSize: 22, 
    textAlign: 'center', 
    color: '#293774',
  },
});
