export const fetchFileDetails = async (url) => {
    try {
      // URL'den dosya adını al
      const fileName = url.split('/').pop();
  
      // Fetch ile dosyayı indir
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file from ${url}: ${response.statusText}`);
      }
  
      // Dosya boyutunu al (byte cinsinden)
      const fileSize = response.headers.get('content-length');
      //const sizeInKB = fileSize ? `${(fileSize / 1024).toFixed(2)} KB` : 'Unknown size';
      const sizeFormatted = fileSize
    ? fileSize >= 1024 * 1024
        ? `${(fileSize / (1024 * 1024)).toFixed(2)} MB`
        : `${(fileSize / 1024).toFixed(2)} KB`
    : 'Unknown size';
  
      // Blob nesnesini oluştur
      //const blob = await response.blob();
  
      // Sonuçları döndür
      return {
        //blob,
        fileName,
        url,
        size: sizeFormatted,
      };
    } catch (error) {
      console.error('Error fetching file details:', error);
      throw error;
    }
  };
  