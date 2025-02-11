import React from 'react';

interface GenerateQRProps {
  base64QR?: string; // Recibe el QR en base64
}

const GenerateQR: React.FC<GenerateQRProps> = ({ base64QR }) => {
  // Función para compartir el QR
  const shareQR = async () => {
    if (!base64QR) return;

    try {
      const link = document.createElement('a');
      link.href = base64QR;
      link.download = 'qr.png';
      link.click();
    } catch (error) {
      console.log('Error compartiendo:', error);
    }
  };

  // Función para imprimir el QR
  const printQR = async () => {
    if (!base64QR) return;
    const imageUri = `${base64QR}`;
    try {
      const newWindow = window.open('', '', 'width=800, height=600');
      newWindow?.document.write(`
        <html>
          <head><title>Imprimir QR</title></head>
          <body style="text-align:center;">
            <img src="${imageUri}" style="width:100%;"/>
          </body>
        </html>
      `);
      newWindow?.document.close();
      newWindow?.print();
    } catch (error) {
      console.log('Error imprimiendo:', error);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>Generar QR</h2>

      {/* Mostrar QR recibido en Base64 */}
      {base64QR ? (
        <div style={styles.qrContainer}>
          <img src={base64QR} alt="QR" style={styles.qrImage} />
        </div>
      ) : (
        <p style={styles.qrText}>No hay QR disponible</p>
      )}

      {/* Botones */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={shareQR} disabled={!base64QR}>
          Compartir QR
        </button>

        <button style={styles.button} onClick={printQR} disabled={!base64QR}>
          Imprimir QR
        </button>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginButton: 20
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: '20px',
    textAlign: 'center',
  },
  qrContainer: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  },
  qrImage: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
  },
  qrText: {
    fontSize: '18px',
    textAlign: 'center',
    color: '#0066cc',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'row' as 'row',
  },
  button: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};

export default GenerateQR;
