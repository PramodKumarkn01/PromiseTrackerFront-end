import React from 'react';
import { StyleSheet, View, Animated, Easing, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { G, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CProgress({
  completedTasksCount = 0,
  totalTasks = 0,
  radius = 40,
  strokeWidth = 10, // Adjusted strokeWidth for better visibility
  duration = 500,
  color = "#EA791D",
  textColor = "white",
  backgroundColor = "#e6e6e6",
}) {
  const percentage = totalTasks === 0 ? 0 : (completedTasksCount / totalTasks) * 100;

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const viewBoxSize = radius * 2 + strokeWidth; // Add stroke width to ensure padding
  const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [percentage, duration]);

  const navigation = useNavigation();
  const Viewtask = () => {
    navigation.navigate('Calenderone');
  };

  const getHeading = () => {
    if (percentage === 100) return "All tasks done! Great job!";
    if (percentage >= 76) return "Almost there! Just a few more tasks.";
    if (percentage >= 51) return "Over halfway! Keep going!";
    if (percentage >= 26) return "Good progress! Keep it up.";
    if (percentage >= 11) return "Nice start! You're getting there.";
    return "Let's get started!";
  };

  const heading = getHeading();

  return (
    <View style={styles.banner}>
      <View style={styles.bin}>
        <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', paddingBottom: 10, }}>
          {heading}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: '#EA791D', width: 100, borderRadius: 5 }}
          onPress={Viewtask}>
          <Text style={{ color: 'white', textAlign: 'center', margin: 10, fontSize: 14, fontWeight: 'bold' }}>
            View task
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: viewBoxSize, height: viewBoxSize, alignItems: 'center', justifyContent: 'center' }}>
        <Svg height={viewBoxSize} width={viewBoxSize} viewBox={viewBox}>
          <G rotation="-90" origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}>
            <Circle
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
              r={radius}
              fill="transparent"
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <AnimatedCircle
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </G>
        </Svg>
        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontSize: radius / 2.5, color: textColor }}>{`${Math.round(percentage)}%`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
  banner: {
    backgroundColor: '#0A91d0',
    height: 135,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 50,
  },
  bin: {
    width: '50%',
    flexDirection: 'column',
  },
});
