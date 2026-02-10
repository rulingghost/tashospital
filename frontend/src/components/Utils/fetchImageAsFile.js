const fetchImageAsFile = async (imageUrl) => {
    try {      
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Resmi indirmede hata oluştu: ' + response.statusText);
        }
        const blob = await response.blob();

        // Dosya adını URL’den al veya varsayılan bir ad ver
        const fileName = imageUrl.split('/').pop() || 'patient-image.jpg';
        const file = new File([blob], fileName, { type: blob.type });
        return file;
    } catch (error) {
        console.error('Hata:', error);
        return null; // Hata durumunda açıkça null döndür
    }
};
export default fetchImageAsFile;