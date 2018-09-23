const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  map: {
    width: '100%',
    height: 300,
    width: 400,
    alignContent: 'center',
    margin: '0 auto',
    '& .mapboxgl-canvas':{
      position: 'relative !important', 
    }
  },
  line: {
    background: 'white',
    width: 400,
    fontFamily: '13pt Georgia, "Times New Roman", Times, serif',
    whiteSpace: 'pre-line',
    fontSize: 20,
    margin: 0,
    padding: 0,
    border: 'none',
    fontWeight: 600,
    color: 'black',
    font: '13pt Georgia, "Times New Roman", Times, serif',
    lineHeight: '1.3',
  },
  billContainer: {
    width: 400,
    alignContent: 'center',
    margin: '0 auto',
    textAlign: 'center',
  }
};

export default styles;

