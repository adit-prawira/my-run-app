import React, { useContext, useCallback } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { NavigationEvents, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import { useLocation } from "../hooks";
import TrackForm from "../components/TrackForm";
// import "../_mockLocation";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "2%",
        marginBottom: "5%",
        backgroundColor: "rgb(45, 48, 65)",
    },
    button: {
        marginRight: "5%",
        marginLeft: "5%",
    },
    errorMessage: {
        color: "rgb(236, 102, 101)",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
    },
});

const TrackCreateScreen = ({ isFocused }) => {
    const {
        state: { recording },
        addLocation,
    } = useContext(LocationContext);
    const callback = useCallback(
        (location) => {
            addLocation(location, recording);
        },
        [recording]
    );

    // should record any position changes whenever user is currently in the create track screen or
    // the user already pressed the recording button
    const [error] = useLocation(isFocused || recording, callback);

    return (
        <ScrollView style={styles.container}>
            <Map />
            <NavigationEvents onWillBlur={() => console.log("leaving")} />
            {error && (
                <Text style={styles.errorMessage}>
                    Please enable location services
                </Text>
            )}
            <TrackForm />
        </ScrollView>
    );
};

export default withNavigationFocus(TrackCreateScreen);
