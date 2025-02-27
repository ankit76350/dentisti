import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import data from '../assets/json/allbills.json';
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
const Table = () => {
    return (
        <ScrollView style={styles.verticalScroll} contentContainerStyle={styles.scrollContent}>
            <ScrollView horizontal style={styles.horizontalScroll}>
                <View style={styles.tableWrapper}>
                    <DataTable style={styles.container}>
                        {/* Table Header */}
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title style={[styles.headerCell, { minWidth: 50 }]}>S.No.</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Patient Name</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Consulting Doctor</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Hospital</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Date of Admission</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Billing Date</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Amount</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Status</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Payment Method</DataTable.Title>
                            <DataTable.Title style={[styles.headerCell, {minWidth:130}]}>Service Details</DataTable.Title>
                        </DataTable.Header>

                        {/* Table Rows */}
                        {data.map((curr, index) => (
                            <DataTable.Row key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                <DataTable.Cell style={[{ minWidth: 50 },styles.cell]}>{index + 1}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Patient Name"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Consulting Doctor"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Hospital"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Date of Admission"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Billing Date"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Amount"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Status"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Payment Method"]}</DataTable.Cell>
                                <DataTable.Cell style={[{minWidth: 130},styles.cell]}>{curr["Service Details"]}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default Table;

const styles = StyleSheet.create({
    tableWrapper: {
        borderWidth: wp(0.3),
        borderColor: theme.myColors.tableheaderColor,
        borderRadius: wp(2),  // Curved corners for the whole table
        overflow: 'hidden', // Prevents unwanted background leaks
        margin: 10,  // Adds spacing around table
    },
    container: {
        backgroundColor: 'white',
        borderRadius: wp(2), // Curves all corners
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: theme.myColors.tableheaderColor,
        height: hp(7),
        alignItems: 'center',
        borderTopLeftRadius: wp(2),  // Curve top-left
        borderTopRightRadius: wp(2), // Curve top-right
    },
    headerCell: {
        flex: 1,
        fontWeight: theme.fonts.extraBold,
        color: 'black',
        textAlign: 'left', // Align header text to match body text
        // paddingHorizontal: 10,

    },
    cell: {

        flex: 1,
        textAlign: 'left',
        // paddingHorizontal: 10,
        minHeight: 45,
        alignItems: 'center',

    },
    row: {
        paddingVertical: hp(0.5),
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
    },
    evenRow: {
        // backgroundColor: '#FFFFFF',
    },
    oddRow: {
        //backgroundColor: '#F2F2F2',
    },
    verticalScroll: {
        flex: 1,
    },
    horizontalScroll: {
        flexGrow: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },

});
