import { useCallback } from "react"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

const Style = () => {

    // FONTS
    const [fontsLoaded, fontError] = useFonts({
        PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
        RubikIso: require('./assets/fonts/RubikIso-Regular.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) await SplashScreen.hideAsync()
    }, [fontsLoaded, fontError])

    if (!fontsLoaded && !fontError) return null

    return (

        <SafeAreaView style={styles.container}>
            <StackComponent onLayout={onLayoutRootView} />
        </SafeAreaView>
    )
}