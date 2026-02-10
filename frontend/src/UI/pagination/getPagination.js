const getPagination = (currentPage, totalPageCount) => {
    const pagination = [];
    const visiblePages = 5;
  
    if (totalPageCount <= visiblePages) {
      // Sayfa sayısı 5 veya daha az ise hepsini göster
      for (let i = 1; i <= totalPageCount; i++) {
        pagination.push(i);
      }
    } else {
      // İlk sayfalar için 1, 2, 3, 4, 5 ... son
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pagination.push(i);
        }
        pagination.push("...");
        pagination.push(totalPageCount);
      }
      // Son sayfalara yakınken: 1 ... totalPageCount - 3, totalPageCount - 2, ..., totalPageCount
      else if (currentPage >= totalPageCount - 2) {
        pagination.push(1);
        pagination.push("...");
        for (let i = totalPageCount - 3; i <= totalPageCount; i++) {
          pagination.push(i);
        }
      }
      // Orta sayfalar için: 1 ... currentPage - 1, currentPage, currentPage + 1, ... totalPageCount
      else {
        pagination.push(1);
        pagination.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pagination.push(i);
        }
        pagination.push("...");
        pagination.push(totalPageCount);
      }
    }
  
    return pagination;
  };

  export default getPagination