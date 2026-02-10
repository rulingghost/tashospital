export const fetchAudioAsFile = async (audioUrl) => {
    try {
        const response = await fetch(audioUrl);
        if (!response.ok) {
            throw new Error('Ses dosyası indirilirken hata oluştu: ' + response.statusText);
        }

        const blob = await response.blob();

        // Dosya adını URL'den al veya varsayılan bir ad ver
        const fileName = audioUrl.split('/').pop() || 'audio-file.mp3';
        const file = new File([blob], fileName, { type: blob.type });

        // File nesnesinden bir URL oluştur
        const audioBlobUrl = URL.createObjectURL(file);

        console.log("Ses dosyası başarıyla indirildi:", file);
        return audioBlobUrl; // Artık bir URL döner
    } catch (error) {
        console.error("Ses dosyası indirilirken hata oluştu:", error);
        return null; // Hata durumunda null döner
    }
};