// Styles
const styles = {
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      backgroundColor: '#dfe2eb',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: '92%',
      borderRadius: 15,
      marginBottom: 15,
      alignItems: 'center',
    },
    textButton: {
      backgroundColor: '#dfe2eb',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 15,
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
    },
    micButton: {
      backgroundColor: '#dfe2eb',
      paddingVertical: 5,
      paddingHorizontal: 5,
      paddingRight: 10,
      borderRadius: 15,
    },
    bar: {
      backgroundColor: '#6d6f7a',
      height: 6,
      width: 70,
      alignItems: 'center',
      alignSelf: 'center',
      margin: 20,
      borderRadius: 18,
    },
    buttonText: {
      color: '#696969',
      fontSize: 18,
      paddingLeft: 10,
    },
    zoomButton: {
      position: 'absolute',
      top: '83%',
      left: '20%',
      transform: [{ translateX: -75 }, { translateY: -75 }],
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    menu: {
      position: 'absolute',
      top: '12%',
      left: '23%',
      transform: [{ translateX: -75 }, { translateY: -75 }],
      padding: 15,
      backgroundColor: 'white',
      elevation: 5,
      borderRadius: 5
    },
    errorModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    errorModalContent: {
      backgroundColor: 'white',
      padding: 30,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    errorModalTitle: {
      fontSize: 21,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    errorModalMessage: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    errorModalButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 20,
      width: '100%',
  
    },
    errorModalButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
};

export default styles;