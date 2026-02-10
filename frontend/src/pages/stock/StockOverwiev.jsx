import React from 'react'
import StatCard from '../../UI/StatCard';
import { motion } from 'framer-motion'
import { useGetAllStocksQuery } from '../../store/patient2';
import Loading from '../../components/tools/Loading';
const StockOverwiev = () => {

    const containerMotion = {        
        visible:{
            transition: {
                //delayChildren: 0.1,
                staggerChildren: 0.05
            }
        }
    }
    const itemMotion = {
        hidden: {
            opacity: 0,
            translateY: 20
        },
        visible:{
            opacity: 1,
            translateY: 0
        }
    }
    const { data, error, isLoading } = useGetAllStocksQuery({ page: 1, type: "total", filters: "" })
    //console.log(data);

    if(isLoading) return <Loading />
    if(error || !data) return <p>Hata Oluştu...</p>

  return (
    <motion.div 
        variants={containerMotion}
        initial={"hidden"}   
        animate={"visible"}
        className="grid grid-cols-1 max-h-full md:grid-cols-2 lg:grid-cols-4 overflow-y-scroll gap-4">      
      {!isLoading && data.results && data.results.map((item, index) => (
        <motion.div
            key={index}
            className='h-full'
            variants={itemMotion}
        >
            <StatCard
            key={index}
            percentage={((item.total_haved / item.total_buyed) * 100).toFixed(1)}
            title={item.stock_name}
            />
        </motion.div>
      ))}
      
    </motion.div>
  )
}

export default StockOverwiev