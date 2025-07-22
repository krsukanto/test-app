// app/(tabs)/cash-flow.tsx

import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const periods = ['Daily', 'Weekly', 'Monthly'];

export default function CashFlowScreen() {
    const [selectedPeriod, setSelectedPeriod] = React.useState('Monthly');

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ data: [90, 60, 60, 70, 60, 40] }],
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Period selection */}
            <View className="segmentContainer">
                {periods.map((period) => (
                    <Pressable
                        key={period}
                        style={[
                            styles.segmentButton,
                            selectedPeriod === period && styles.segmentButtonActive,
                        ]}
                        onPress={() => setSelectedPeriod(period)}
                    >
                        <Text style={[
                            styles.segmentText,
                            selectedPeriod === period && styles.segmentTextActive,
                        ]}>
                            {period}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Cash Flow Card */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Cash Flow</Text>
                <Text style={styles.value}>$1,200</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={styles.cardLabel}>Last 30 Days</Text>
                    <Text style={styles.cardGreen}>+15%</Text>
                </View>
                <BarChart
                    data={chartData}
                    width={Dimensions.get('window').width - 48}
                    height={170}
                    fromZero
                    showValuesOnTopOfBars={false}
                    chartConfig={{
                        backgroundColor: '#f6f6f6',
                        backgroundGradientFrom: '#f6f6f6',
                        backgroundGradientTo: '#f6f6f6',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
                        labelColor: () => "#B0B0B0",
                        propsForLabels: { fontFamily: "quicksand-medium" },
                        barPercentage: 0.6,
                        propsForBackgroundLines: {
                            strokeDasharray: "", stroke: "#EBEBEB"
                        },
                    }}
                    style={{
                        marginVertical: 0,
                        borderRadius: 16,
                        backgroundColor: "#f6f6f6",
                    }}
                    withInnerLines
                />
            </View>

            {/* Summary Title */}
            <Text style={styles.summaryTitle}>Summary</Text>

            {/* Summary Card */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Deposits</Text>
                    <Text style={styles.summaryValue}>$5,500</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Expenditures</Text>
                    <Text style={styles.summaryValue}>$4,300</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    segmentContainer: {
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        marginHorizontal: 12,
        marginTop: 20,
        marginBottom: 16,
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
    },
    segmentButton: {
        flex: 1,
        alignItems: 'center',
        height: 36,
        marginHorizontal: 2,
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    segmentButtonActive: {
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    segmentText: {
        color: '#B0B0B0',
        fontSize: 16,
        fontFamily: 'quicksand-medium',
    },
    segmentTextActive: {
        color: '#141414',
        fontFamily: 'quicksand-bold',
    },

    card: {
        backgroundColor: '#F6F6F6',
        marginHorizontal: 12,
        borderRadius: 16,
        padding: 18,
        marginBottom: 28,
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: 15,
        color: "#141414",
        fontFamily: 'quicksand-medium',
        marginBottom: 4,
    },
    value: {
        fontSize: 32,
        fontFamily: 'quicksand-bold',
        color: "#141414",
        marginBottom: 1,
    },
    cardLabel: {
        fontFamily: "quicksand",
        fontSize: 14,
        color: "#B0B0B0",
        marginRight: 8,
    },
    cardGreen: {
        fontFamily: "quicksand-medium",
        fontSize: 14,
        color: "#44c185",
    },

    summaryTitle: {
        fontFamily: "quicksand-bold",
        fontSize: 17,
        color: "#141414",
        marginBottom: 8,
        marginHorizontal: 16,
    },
    summaryCard: {
        backgroundColor: "#F6F6F6",
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginHorizontal: 12,
        marginBottom: 32,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
    },
    summaryLabel: {
        fontFamily: "quicksand",
        fontSize: 15,
        color: "#B0B0B0",
    },
    summaryValue: {
        fontFamily: "quicksand-medium",
        fontSize: 15,
        color: "#141414",
    },
});
