// @ts-nocheck
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Audio } from 'expo-av';
import { Snackbar } from 'react-native-paper';
import soundboardData from '../../data/soundboard';
import colors from '../theme/colors';
import { getTextColor } from '../utils/contrast';

const SoundboardItem = ({ name, onPress, color = colors.light }) => {
  const backgroundColorStyle = { backgroundColor: color, borderColor: color };
  const textColorStyle = { color: getTextColor(color) };

  return (
    <TouchableOpacity
      style={[styles.item, backgroundColorStyle]}
      onPress={onPress}
    >
      <Text style={[styles.title, textColorStyle]}>{name}</Text>
    </TouchableOpacity>
  );
};

const Soundboard = () => {
  const [sound, setSound] = React.useState();
  const [error, setError] = React.useState();

  React.useEffect(() => sound ? () => sound.unloadAsync() : undefined, [sound]);

  const onDismissSnackBar = () => setError();

  const playSound = (file) => async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(file);
      setSound(sound);

      await sound.playAsync();
      setError();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {soundboardData.map(({ name, audio, color }) => (
          <SoundboardItem
            key={name}
            name={name}
            color={color}
            onPress={playSound(audio)}
          />
        ))}
      </View>
      <Snackbar visible={!!error} onDismiss={onDismissSnackBar}>
        {error}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10,
  },
  item: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 150,
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    textAlign: 'center',
  },
});

export default Soundboard;
