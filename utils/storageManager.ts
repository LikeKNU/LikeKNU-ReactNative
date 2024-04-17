import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // TODO error handling
  }
};

export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // TODO error handling
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // TODO error handling
  }
}
