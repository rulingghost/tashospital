import { FC, useState, DragEvent } from 'react';
import './OrgChart.css';

interface Employee {
  id: number;
  name: string;
  title: string;
  email?: string;
  phone?: string;
  children?: Employee[];
}

interface OrgChartProps {
  data: Employee;
  onDrop?: (draggedId: number, targetId: number) => void;
  onAddEmployee?: (parentId: number) => void;
}

export const OrgChart: FC<OrgChartProps> = ({ data, onDrop, onAddEmployee }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const hasChildren = data.children && data.children.length > 0;

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    setIsDragging(true);
    
    // Sürüklenen kartın görüntüsünü oluştur
    const dragImage = e.currentTarget.cloneNode(true) as HTMLDivElement;
    dragImage.style.transform = 'scale(0.8)';
    dragImage.style.opacity = '0.8';
    dragImage.style.position = 'fixed';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    // Kartın boyutlarını al
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 2;
    
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
    e.dataTransfer.setData('text/plain', id.toString());
    e.dataTransfer.effectAllowed = 'move';

    // Temizlik için timeout kullan
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedId !== targetId && onDrop) {
      onDrop(draggedId, targetId);
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (onDrop) {
      onDrop(-1, -1);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="node-container">
      <div 
        className={`node ${isDragging ? 'dragging' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, data.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, data.id)}
        onDragEnd={handleDragEnd}
      >
        <div className="node-header">
          <div className="avatar">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&color=fff`} alt={data.name} />
          </div>
          <div className="node-content">
            <h3>{data.name}</h3>
            <p>{data.title}</p>
          </div>
        </div>
        <div className="node-actions">
          <button className="action-button" onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${data.email}`; }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="action-label">Mail</span>
          </button>
          <button className="action-button" onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${data.phone}`; }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5342 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.271 2.12 4.18001C2.09501 3.90347 2.12788 3.62477 2.21649 3.36163C2.30511 3.09849 2.44756 2.85669 2.63476 2.65163C2.82196 2.44656 3.0498 2.28271 3.30379 2.17053C3.55777 2.05834 3.83233 2.00027 4.11 2.00001H7.11C7.59531 1.99523 8.06579 2.16708 8.43376 2.48354C8.80173 2.79999 9.04208 3.23945 9.11 3.72001C9.23662 4.68007 9.47145 5.62273 9.81 6.53001C9.94455 6.88793 9.97366 7.27692 9.89391 7.65089C9.81415 8.02485 9.62886 8.36812 9.36 8.64001L8.09 9.91001C9.51356 12.4136 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1859 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="action-label">Phone</span>
          </button>
          <button className="add-button" onClick={(e) => { e.stopPropagation(); onAddEmployee?.(data.id); }}>           
            <span className="">+</span>
          </button>
        </div>
        {hasChildren && (
          <button className="toggle-button" onClick={toggleExpand}>
            {isExpanded ? '-' : '+'}
          </button>
        )}
      </div>
      {hasChildren && (
        <div className={`children-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {data.children?.map((child) => (
            <OrgChart key={child.id} data={child} onDrop={onDrop} onAddEmployee={onAddEmployee} />
          ))}
        </div>
      )}
    </div>
  );
}; 