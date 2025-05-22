import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { ArrowRight, Bot, Upload, ChartBar, Building, FileText, CheckCircle, Database, PieChart } from 'lucide-react';
import AnimatedElement from '@/components/animations/AnimatedElement';
import { fadeInUp, fadeIn, scaleIn, staggerContainer, floatingAnimation } from '@/utils/animationUtils';
import GraphAnimation from '@/components/animations/GraphAnimation';
import CircuitBackground from '@/components/animations/CircuitBackground';
import AIFlowAnimation from '@/components/animations/AIFlowAnimation';
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* About Us Section - Moved to the top */}
      <section className="py-16 relative overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <AnimatedElement variants={fadeInUp} className="md:w-1/2">
              <div className="bg-brand-light-blue p-1 w-fit rounded mb-4">
                <Building className="h-6 w-6 text-brand-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Sobre Nós
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">A PrimeDask é uma empresa de tecnologia contábil fundada em São Francisco, Califórnia, com o objetivo de automatizar rotinas fiscais por meio da inteligência artificial. Nosso sistema, amplamente utilizado por empresas nos Estados Unidos, chega ao Brasil com a missão de tornar a contabilidade mais eficiente, acessível e inteligente.</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Utilizamos IA para gerar relatórios, simular impostos e organizar finanças 
                de forma automatizada, com total conformidade à legislação brasileira. 
                Contabilidade do futuro, agora ao seu alcance.
              </p>
            </AnimatedElement>
            <AnimatedElement variants={scaleIn} className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-brand blur-xl opacity-20 rounded-xl"></div>
                <motion.div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg relative z-10" whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }} transition={{
                type: "spring",
                stiffness: 300
              }}>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div className="bg-brand-light-blue p-5 rounded-lg" variants={floatingAnimation} initial="hidden" animate="visible">
                      <h3 className="font-bold text-brand-dark mb-1">Fundação</h3>
                      <p className="text-gray-700">São Francisco, Califórnia</p>
                    </motion.div>
                    <motion.div className="bg-brand-light-cyan p-5 rounded-lg" variants={floatingAnimation} initial="hidden" animate="visible" transition={{
                    delay: 0.1
                  }}>
                      <h3 className="font-bold text-brand-dark mb-1">Tecnologia</h3>
                      <p className="text-gray-700">Inteligência Artificial</p>
                    </motion.div>
                    <motion.div className="bg-brand-light-cyan p-5 rounded-lg" variants={floatingAnimation} initial="hidden" animate="visible" transition={{
                    delay: 0.2
                  }}>
                      <h3 className="font-bold text-brand-dark mb-1">Foco</h3>
                      <p className="text-gray-700">Automatização Contábil</p>
                    </motion.div>
                    <motion.div className="bg-brand-light-blue p-5 rounded-lg" variants={floatingAnimation} initial="hidden" animate="visible" transition={{
                    delay: 0.3
                  }}>
                      <h3 className="font-bold text-brand-dark mb-1">Conformidade</h3>
                      <p className="text-gray-700">Legislação Brasileira</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      
      <Hero />
      
      <AnimatedElement variants={fadeIn} className="w-full">
        <Features />
      </AnimatedElement>
      
      {/* AI Technology Section */}
      <section className="py-16 bg-gradient-to-b from-white to-brand-light-blue relative overflow-hidden">
        <CircuitBackground />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement variants={fadeInUp} className="text-center mb-12">
            <div className="bg-brand-light-blue p-2 w-fit mx-auto rounded-full mb-4">
              <Database className="h-6 w-6 text-brand-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Tecnologia de Ponta
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma utiliza algoritmos avançados para transformar dados em insights contábeis.
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement variants={scaleIn} className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-brand blur-xl opacity-20 rounded-xl"></div>
                <div className="relative z-10">
                  <AIFlowAnimation />
                </div>
              </div>
            </AnimatedElement>
            
            <motion.div className="order-1 lg:order-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{
            once: true
          }}>
              {[{
              icon: <FileText className="h-6 w-6 text-brand-blue" />,
              title: "Processamento Inteligente de Documentos",
              description: "Nossa IA extrai dados de notas fiscais e recibos automaticamente"
            }, {
              icon: <CheckCircle className="h-6 w-6 text-brand-green" />,
              title: "Validação em Tempo Real",
              description: "Cruzamento de informações com bancos de dados oficiais"
            }, {
              icon: <PieChart className="h-6 w-6 text-brand-blue" />,
              title: "Análise Preditiva",
              description: "Previsão de impostos e alertas de obrigações fiscais"
            }].map((item, index) => <AnimatedElement key={index} variants={fadeInUp} delay={index * 0.2} className="flex items-start mb-8 hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-white rounded-full p-3 mr-4 shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-brand-dark">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </AnimatedElement>)}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme sua contabilidade em apenas alguns passos simples.
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            icon: <Upload className="w-8 h-8 text-brand-blue" />,
            title: "1. Insira seus dados",
            description: "Registre suas receitas, despesas ou importe documentos. Você pode fazer upload de extratos bancários ou notas fiscais."
          }, {
            icon: <Bot className="w-8 h-8 text-brand-green" />,
            title: "2. Nossa IA faz a análise",
            description: "A inteligência artificial classifica automaticamente suas transações, calcula impostos e prepara relatórios contábeis."
          }, {
            icon: <ChartBar className="w-8 h-8 text-brand-blue" />,
            title: "3. Visualize seus resultados",
            description: "Acesse relatórios detalhados, guias de pagamento e insights personalizados para seu negócio."
          }].map((item, index) => <AnimatedElement key={index} variants={fadeInUp} delay={index * 0.2} className="flex flex-col items-center text-center">
                <motion.div className="bg-white rounded-lg p-6 shadow-md w-full h-full flex flex-col items-center" whileHover={{
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
            }} transition={{
              type: "spring",
              stiffness: 300
            }}>
                  <motion.div className={`${index === 1 ? 'bg-brand-light-green' : 'bg-brand-light-blue'} w-16 h-16 rounded-full flex items-center justify-center mb-4`} whileHover={{
                scale: 1.1,
                rotate: 5
              }} transition={{
                type: "spring",
                stiffness: 300
              }}>
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-brand-dark">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatedElement>)}
          </div>

          <AnimatedElement variants={fadeInUp} delay={0.6} className="text-center mt-12">
            <Link to="/register">
              <motion.button className="btn-primary inline-flex items-center" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <span>Começar agora</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* Growth Chart Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement variants={fadeInUp} className="text-center mb-16">
            <div className="bg-brand-light-blue p-2 w-fit mx-auto rounded-full mb-4">
              <ChartBar className="h-6 w-6 text-brand-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Cresça com Inteligência
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como nossa plataforma pode impulsionar seu negócio.
            </p>
          </AnimatedElement>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedElement variants={scaleIn} className="md:w-1/2 flex justify-center">
              <GraphAnimation />
            </AnimatedElement>
            
            <AnimatedElement variants={fadeInUp} className="md:w-1/2">
              {[{
              title: "Economia de tempo",
              description: "Reduza em até 80% o tempo gasto com tarefas contábeis manuais."
            }, {
              title: "Precisão superior",
              description: "Minimização de erros e retrabalho com classificação automática."
            }, {
              title: "Planejamento tributário",
              description: "Previsão de impostos e simulações para tomada de decisões."
            }].map((item, index) => <motion.div key={index} className="mb-6 last:mb-0" initial={{
              x: 50,
              opacity: 0
            }} whileInView={{
              x: 0,
              opacity: 1
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} viewport={{
              once: true
            }}>
                  <div className="flex items-start">
                    <div className="mr-4 p-1 bg-brand-light-blue rounded-full">
                      <motion.div initial={{
                    scale: 0.8
                  }} whileInView={{
                    scale: 1
                  }} transition={{
                    duration: 0.3,
                    delay: index * 0.2
                  }}>
                        <CheckCircle className="h-6 w-6 text-brand-blue" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>)}
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empresários brasileiros que economizam tempo e dinheiro com nossa plataforma.
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            initials: "MR",
            name: "Marcelo Ribeiro",
            role: "Microempreendedor Individual",
            testimonial: "Não precisava mais de contador para meu MEI. Com esta plataforma, faço tudo sozinho e economizo muito por mês!"
          }, {
            initials: "CS",
            name: "Carolina Santos",
            role: "E-commerce Simples Nacional",
            testimonial: "A IA classifica minhas vendas automaticamente e me ajuda a entender quais impostos devo pagar. Muito prático!"
          }, {
            initials: "RA",
            name: "Rafael Almeida",
            role: "Agência de Marketing",
            testimonial: "Finalmente entendo meus relatórios contábeis! O chatbot responde minhas perguntas em linguagem simples, sem termos técnicos."
          }].map((testimonial, index) => <AnimatedElement key={index} variants={fadeInUp} delay={index * 0.2} className="flex-1">
                <motion.div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 h-full" whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              borderColor: "rgba(10, 219, 223, 0.3)"
            }} transition={{
              type: "spring",
              stiffness: 300
            }}>
                  <div className="flex items-center mb-4">
                    <motion.div className={`w-12 h-12 rounded-full ${index % 2 === 0 ? 'bg-brand-light-blue' : 'bg-brand-light-green'} flex items-center justify-center ${index % 2 === 0 ? 'text-brand-blue' : 'text-brand-green'} font-bold`} whileHover={{
                  scale: 1.1,
                  rotate: 5
                }}>
                      {testimonial.initials}
                    </motion.div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-brand-dark">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "{testimonial.testimonial}"
                  </p>
                </motion.div>
              </AnimatedElement>)}
          </div>
        </div>
      </section>

      <AnimatedElement variants={fadeIn}>
        <Pricing />
      </AnimatedElement>
      <Footer />
    </div>;
};
export default Index;