import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, Animated, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';

const Table = ({ loading, errorMessage, tableHeader = [], tableContentKey = [], tableData = [] , populate = (id) =>{
    return id
}
}) => {
    console.log("loading Table component", loading);

    const openDetails = (index) => {
        console.log("Row No. : ", index + 1);
    };

    // Animation for glowing effect
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (loading) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
                    Animated.timing(glowAnim, { toValue: 0, duration: 1000, useNativeDriver: false })
                ])
            ).start();
        }
    }, [loading]);

    const glowBackground = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#e0e0e0', '#f5f5f5'], // Light grey to white glow
    });

    return (
        <ScrollView style={styles.verticalScroll} contentContainerStyle={styles.scrollContent}>
            <ScrollView horizontal style={styles.horizontalScroll}>
                <View style={styles.tableWrapper}>
                    <DataTable style={styles.container}>

                        {/* Table Header */}
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title style={[styles.headerCell, { minWidth: 50 }]}>S.No.</DataTable.Title>
                            {tableHeader.map((currItem, index) => (
                                <DataTable.Title style={[styles.headerCell, { minWidth: 150 }]} key={index}>
                                    {currItem}
                                </DataTable.Title>
                            ))}
                        </DataTable.Header>

                        {/* Error Message */}
                        {errorMessage ? (
                            <View style={styles.messageContainer}>
                                <Text style={styles.errorText}>{errorMessage}</Text>
                            </View>
                        ) : loading ? (
                            /* Loading Skeleton with Animation */
                            Array(5).fill(null).map((_, index) => (
                                <Animated.View key={index} style={[styles.loadingRow, { backgroundColor: glowBackground }]}>
                                    <DataTable.Row>
                                        <DataTable.Cell style={[{ minWidth: 50 }, styles.cell]}>
                                            <View style={styles.skeleton} />
                                        </DataTable.Cell>
                                        {tableContentKey.map((_, idx) => (
                                            <DataTable.Cell key={idx} style={[{ minWidth: 150 }, styles.cell]}>
                                                <View style={styles.skeleton} />
                                            </DataTable.Cell>
                                        ))}
                                    </DataTable.Row>
                                </Animated.View>
                            ))
                        ) : tableData.length === 0 ? (
                            /* No Data Message */
                            <View style={styles.messageContainer}>
                                <Text style={styles.noDataText}>No data found</Text>
                            </View>
                        ) : (
                            /* Table Data Rows */
                            tableData.map((curr, index) => (
                                <DataTable.Row key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow} onPress={() => openDetails(index)}>
                                    <DataTable.Cell style={[{ minWidth: 50 }, styles.cell]}>{index + 1}</DataTable.Cell>

                                    {tableContentKey.map((currItem, idx) => (
                                        <DataTable.Cell key={idx} style={[{ minWidth: 150 }, styles.cell]}>

                                            {typeof currItem === "object"
                                                ? populate(curr[currItem.populdateId])
                                                : truncateText(curr[tableContentKey[idx]], 17)
                                            }
                                        </DataTable.Cell>

                                    ))}
                                </DataTable.Row>
                            ))
                        )}
                    </DataTable>
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default Table;

const styles = StyleSheet.create({
    tableWrapper: {
        borderWidth: wp(0.3),
        borderColor: theme.myColors.tableheaderColor,
        borderRadius: wp(2),
        overflow: 'hidden',
        margin: 10,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: wp(2),
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: theme.myColors.tableheaderColor,
        height: hp(7),
        alignItems: 'center',
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },
    headerCell: {
        flex: 1,
        fontWeight: theme.fonts.extraBold,
        color: 'black',
        textAlign: 'left',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        minHeight: 45,
        alignItems: 'center',
    },
    evenRow: {},
    oddRow: {},
    verticalScroll: {
        flex: 1,
    },
    horizontalScroll: {
        flexGrow: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    /* Skeleton Styles */
    loadingRow: {
        height: hp(6),
        borderRadius: 4,
        marginVertical: 4,
    },
    skeleton: {
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        flex: 1,
    },
    /* Message Styles */
    messageContainer: {
        paddingVertical: hp(5),
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
});
