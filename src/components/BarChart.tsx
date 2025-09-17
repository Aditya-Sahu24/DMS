import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { api } from '../utils/Url';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(48, 75, 194, ${opacity})`, // bar fill color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
  },
};


const DepartmentWiseBarChart = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[] }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .post('DashboardEntity/GetDashboardData', {
        type: 9,
        pageID: 1,
        searchBy: '',
        fromdt: '1900-01-01',
        todt: '2025-07-24',
        print: 1,
      })
      .then((res) => {
        const departments = res.data?.data?.departmentwiseCountRest || [];
        const labels = departments.map((dept: any) =>
          dept.divisionName.length > 10
            ? dept.divisionName.slice(0, 10) + '…'
            : dept.divisionName
        );
        const data = departments.map((dept: any) => dept.totalCount);

        setChartData({
          labels,
          datasets: [{ data }],
        });
      })
      .catch((err) => {
        console.error('API error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.departmentHeader}>Department Wise Documents Count</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1976D2" />
      ) : chartData ? (
        <ScrollView horizontal>
          <BarChart
            data={chartData}
            width={Math.max(screenWidth, chartData.labels.length * 60)}
            height={300}
            fromZero
            chartConfig={chartConfig}
            showValuesOnTopOfBars
            verticalLabelRotation={40}
            yAxisLabel=""
            yAxisSuffix=""
            style={styles.chart}
          />
        </ScrollView>
      ) : (
        <Text style={styles.noData}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  departmentHeader: {
    backgroundColor: '#304bc2ff',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    paddingRight: 30,
    // paddingLeft: 16,
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
});

export default DepartmentWiseBarChart;
