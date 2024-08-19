import React, { useState, useEffect } from 'react';
import { View, Text, ProgressBarAndroid, StyleSheet } from 'react-native';

const HorizontalProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress  // Increment progress by 0.1
        return newProgress > 1 ? 1 : newProgress; // Ensure progress doesn't exceed 1
      });
    }, 50);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress}
        color="#4CAF50" // Set your desired progress bar color
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  progressBar: {
    height:10, // Set your desired height
    width: '80%', // Set your desired width
    borderRadius: 10, // Set your desired border radius
    
  },
});

export default HorizontalProgressBar;
