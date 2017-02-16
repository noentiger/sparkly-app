import { StyleSheet } from 'react-native';

export const colors = {
  actionColor: '#3c7fea',
  lighterGray: '#f2f2f2',
  lightGray: '#eeeeee',
  gray: '#333333',
  white: '#ffffff',
  destroy: '#f04d53',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 65,
  },
  action: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  emptyText: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
