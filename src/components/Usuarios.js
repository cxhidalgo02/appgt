import * as React  from 'react';
import * as rn from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Usuarios(
    {
        id,
        cedula,
        nombres,
        apellidos,
        tipo,
        correo,
        clave,
        validado,
        createdAt,
    }
) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return( 
        <rn.View style={styles.productContainer}>
            <rn.Text> 
                <MaterialIcons name="fingerprint" size={18} color="black" /> - {cedula} 
            </rn.Text>
            <rn.Text> 
                <FontAwesome5 name="id-card" size={18} color="black" /> - {nombres} {apellidos}
            </rn.Text>
            <rn.Text> 
                <Ionicons name="bookmark" size={18} color="black" /> - {tipo} 
            </rn.Text>
            <rn.Text> 
                <MaterialIcons name="mail" size={18} color="black" /> - {correo} 
            </rn.Text>
        </rn.View>
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
    },
});