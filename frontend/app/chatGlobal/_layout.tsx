import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/assets/globalComponents/Header/Header'
import SideBar from '@/assets/globalComponents/sideBar/sideBar';
import { Slot } from 'expo-router';
import Footer from '@/assets/globalComponents/FooterInput/FooterInput';

export default function _layout() {
    const [menuState, setMenuState] = useState<boolean>(false);

    const handleMenuPress = () => {
        setMenuState(!menuState);
    }

  return (
    <View style={styles.chatGlobalContainer}>
        <Header onMenuPress={handleMenuPress}/>
        <View style={styles.chatGlobalContent}>
            <SideBar pressedMenuButton={menuState}/>
            <Slot/>
        </View>
        {/* <Footer reqFunction={(text: String) => {
            console.log("this is a example text: "+text)
        }}
        type="chatGlobal"
        /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    chatGlobalContainer: {
        flex: 1,
        width: "100%",
        flexDirection: 'column',
    },
    chatGlobalContent: {
        flex: 1
    }
})