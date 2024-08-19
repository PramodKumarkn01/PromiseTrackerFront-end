import React, { useState, useEffect } from 'react';
import { View, Text, ProgressBarAndroid, StyleSheet } from 'react-native';

const Statusbar = () => {
  const [progress, setProgress] = useState(0);

  // Simulate progress update
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress;
        return newProgress > 1 ? 0 : newProgress;
      });
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
     
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress}
        color="#EA791D"
        width="80%" 
        height={30}
        
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
  
});

export default Statusbar;
