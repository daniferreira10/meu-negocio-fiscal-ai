
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CircuitBoard, Shield, Zap, ChevronRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(6, 122, 219, 0.3)"
    },
    tap: { 
      scale: 0.98 
    }
  };

  // Dados para a animação de números
  const stats = [
    { value: 85, label: "Redução de Tempo", unit: "%" },
    { value: 99.8, label: "Precisão", unit: "%" },
    { value: 1000, label: "Empresas", unit: "+" }
  ];

  return (
    <section className="bg-gradient-to-br from-brand-dark-blue to-brand-dark py-16 md:py-24 text-white relative overflow-hidden">
      {/* Partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-brand-cyan rounded-full opacity-10"
            style={{
              width: 2 + Math.random() * 8,
              height: 2 + Math.random() * 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Elementos de circuito */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M0,100 L200,100 C230,100 230,150 260,150 L500,150" 
          stroke="#0ADBDF" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path 
          d="M100,0 L100,200 C100,230 150,230 150,260 L150,500" 
          stroke="#0ADBDF" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.div variants={itemVariants} className="flex items-center mb-4">
              <CircuitBoard className="h-8 w-8 mr-2 text-brand-cyan" />
              <motion.span 
                className="bg-gradient-brand px-4 py-1 rounded-full text-xs font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Plataforma Inteligente
              </motion.span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl mb-6 leading-tight md:text-4xl font-semibold"
            >
              Contabilidade automatizada com <span className="bg-gradient-brand bg-clip-text text-transparent">Inteligência Artificial</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-xl text-gray-300 mb-8"
            >
              Faça sua própria contabilidade sem complicações. Nossa IA cuida das obrigações fiscais, 
              relatórios e impostos para o seu negócio no Brasil.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/register">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button className="w-full sm:w-auto bg-gradient-brand hover:opacity-90 text-white px-8 py-6 text-lg border-0 group">
                    Comece Gratuitamente
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/pricing">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"  
                >
                  <Button variant="outline" className="w-full sm:w-auto border-white px-8 py-6 text-cyan-600 bg-slate-50 text-base hover:bg-white transition-colors">
                    Ver Planos
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            >
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-5 w-5 mr-2 text-brand-cyan" />
                <span className="text-sm">Dados Seguros</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}  
              >
                <Zap className="h-5 w-5 mr-2 text-brand-cyan" />
                <span className="text-sm">Contabilidade Simplificada</span>
              </motion.div>
            </motion.div>

            {/* Stats Counter */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 grid grid-cols-3 gap-4 px-4 py-3 bg-brand-dark-blue/50 rounded-lg border border-brand-dark-blue/80 backdrop-blur-sm"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div 
                    className="text-xl md:text-2xl font-bold text-brand-cyan"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 1 + (index * 0.2),
                      type: "spring"
                    }}
                  >
                    {stat.value}{stat.unit}
                  </motion.div>
                  <motion.div 
                    className="text-xs text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 1.2 + (index * 0.2)
                    }}
                  >
                    {stat.label}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-brand blur-2xl opacity-20 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Dashboard de contabilidade automatizada" 
                className="rounded-lg shadow-xl w-full max-w-md object-cover relative z-10" 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              />
              
              {/* Elemento decorativo flutuante */}
              <motion.div
                className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg z-20"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">IA Contábil</p>
                    <p className="text-xs text-gray-600">Processamento em tempo real</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Elemento decorativo código */}
              <motion.div
                className="absolute -top-5 -left-5 bg-brand-dark p-3 rounded-lg shadow-lg z-20 hidden md:block"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-brand-light-blue flex items-center justify-center">
                    <CircuitBoard className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-300">Algoritmo</p>
                    <p className="text-xs text-gray-400">Aprendizado contínuo</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
