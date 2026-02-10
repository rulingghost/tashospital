import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import "./HrHierarchy.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { OrgChart } from './OrgChart';

const HrHierarchy = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const [data, setData] = useState(sampleData);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      const zoomFactor = delta > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(0.5, scale * zoomFactor), 2);
      setScale(newScale);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scale]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAddEmployee = (parentId) => {
    const newEmployee = {
      id: Date.now(),
      name: "Yeni Çalışan",
      title: "Pozisyon",
      email: "yeni@sirket.com",
      phone: "+90 555 000 0000"
    };

    const addEmployeeToParent = (employee) => {
      if (employee.id === parentId) {
        employee.children = employee.children || [];
        employee.children.push(newEmployee);
        return true;
      }
      if (employee.children) {
        for (let child of employee.children) {
          if (addEmployeeToParent(child)) {
            return true;
          }
        }
      }
      return false;
    };

    const newData = { ...data };
    addEmployeeToParent(newData);
    setData(newData);
  };

  const moveEmployee = (draggedId, targetId) => {
    if (draggedId === -1 && targetId === -1) {
      setIsDragging(false);
      return;
    }

    const newData = { ...data };
    let draggedEmployee = null;
    let draggedParent = null;

    const findEmployee = (employee, parent = null) => {
      if (employee.id === draggedId) {
        draggedEmployee = employee;
        draggedParent = parent;
        return true;
      }
      if (employee.children) {
        for (let i = 0; i < employee.children.length; i++) {
          if (findEmployee(employee.children[i], employee)) {
            return true;
          }
        }
      }
      return false;
    };

    findEmployee(newData);

    if (!draggedEmployee) return;

    if (draggedParent) {
      draggedParent.children = draggedParent.children?.filter(
        child => child.id !== draggedId
      );
    }

    const addToTarget = (employee) => {
      if (employee.id === targetId) {
        employee.children = employee.children || [];
        employee.children.push(draggedEmployee);
        return true;
      }
      if (employee.children) {
        for (let child of employee.children) {
          if (addToTarget(child)) {
            return true;
          }
        }
      }
      return false;
    };

    addToTarget(newData);
    setData(newData);
    setIsDragging(false);
  };

  return (
    <div className="app-container">
      <div
        ref={containerRef}
        className="chart-wrapper"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="chart-container" 
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <OrgChart data={data} onDrop={moveEmployee} onAddEmployee={handleAddEmployee} />
        </div>
      </div>
    </div>
  );
};

const sampleData = {
  id: 1,
  name: "Ahmet Yılmaz",
  title: "CEO",
  email: "ahmet.yilmaz@sirket.com",
  phone: "+90 555 111 0001",
  children: [
    {
      id: 2,
      name: "Mehmet Demir",
      title: "CTO",
      email: "mehmet.demir@sirket.com",
      phone: "+90 555 111 0002",
      children: [
        {
          id: 4,
          name: "Ali Kaya",
          title: "Yazılım Mühendisi",
          email: "ali.kaya@sirket.com",
          phone: "+90 555 111 0004",
          children: [
            {
              id: 8,
              name: "Deniz Yıldız",
              title: "Frontend Geliştirici",
              email: "deniz.yildiz@sirket.com",
              phone: "+90 555 111 0008"
            },
            {
              id: 9,
              name: "Burak Şahin",
              title: "Backend Geliştirici",
              email: "burak.sahin@sirket.com",
              phone: "+90 555 111 0009"
            }
          ]
        },
        {
          id: 5,
          name: "Ayşe Yıldız",
          title: "UX Tasarımcısı",
          email: "ayse.yildiz@sirket.com",
          phone: "+90 555 111 0005",
          children: [
            {
              id: 10,
              name: "Zeynep Kara",
              title: "UI Tasarımcısı",
              email: "zeynep.kara@sirket.com",
              phone: "+90 555 111 0010"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Fatma Öztürk",
      title: "CFO",
      email: "fatma.ozturk@sirket.com",
      phone: "+90 555 111 0003",
      children: [
        {
          id: 6,
          name: "Can Şahin",
          title: "Finans Analisti",
          email: "can.sahin@sirket.com",
          phone: "+90 555 111 0006",
          children: [
            {
              id: 11,
              name: "Ece Demir",
              title: "Muhasebeci",
              email: "ece.demir@sirket.com",
              phone: "+90 555 111 0011"
            },
            {
              id: 12,
              name: "Mert Yılmaz",
              title: "Finans Uzmanı",
              email: "mert.yilmaz@sirket.com",
              phone: "+90 555 111 0012"
            }
          ]
        },
        {
          id: 7,
          name: "Elif Arslan",
          title: "İK Müdürü",
          email: "elif.arslan@sirket.com",
          phone: "+90 555 111 0007",
          children: [
            {
              id: 13,
              name: "Selin Ak",
              title: "İK Uzmanı",
              email: "selin.ak@sirket.com",
              phone: "+90 555 111 0013"
            }
          ]
        }
      ]
    }
  ]
};

export default HrHierarchy;
