import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    padding: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  card: {
    marginBottom: 24,
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
  },
  centerText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
});