"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';


type Customer = {
  id: number;
  arrivalTime: number;
  serviceTime: number;
  startServiceTime: number | null;
  endServiceTime: number | null;
};

type Server = {
  id: number;
  busy: boolean;
  currentCustomer: Customer | null;
  totalServiceTime: number;
  customersServed: number;
};

type SimulationParams = {
  arrivalRate: number;  // λ (lambda)
  serviceRate: number;  // μ (mu)
  numServers: number;   // c
  maxTime: number;      // tiempo máximo de simulación
  speed: number;        // velocidad de la simulación
};

type SimulationStats = {
  avgWaitTime: number;
  avgQueueLength: number;
  serverUtilization: number[];
  totalCustomers: number;
  customersServed: number;
  customersInQueue: number;
  queueSamples: { time: number; length: number }[]
};

type DemoScenario = {
  name: string;
  description: string;
  params: SimulationParams;
};

// Componente principal
export default function ModelSimulator() {
  // Acceder a params directamente
  const urlParams = useParams();
  const modelId = urlParams.id as string;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Definir escenarios de demostración
  const getModelDemoScenarios = (): DemoScenario[] => {
    switch (modelId) {
      case 'mm1':
        return [
          {
            name: "Tráfico bajo (ρ=0.3)",
            description: "Sistema con capacidad suficiente",
            params: { arrivalRate: 1.5, serviceRate: 5, numServers: 1, maxTime: 5, speed: 0.02 }
          },
          {
            name: "Tráfico medio (ρ=0.6)",
            description: "Sistema operando normalmente",
            params: { arrivalRate: 3, serviceRate: 5, numServers: 1, maxTime: 5, speed: 0.02 }
          },
          {
            name: "Tráfico alto (ρ=0.9)",
            description: "Sistema cerca de la saturación",
            params: { arrivalRate: 4.5, serviceRate: 5, numServers: 1, maxTime: 5, speed: 0.02 }
          }
        ];
      case 'mm2':
        return [
          {
            name: "Tráfico balanceado (ρ=0.4)",
            description: "Dos servidores con carga equilibrada",
            params: { arrivalRate: 4, serviceRate: 5, numServers: 2, maxTime: 5, speed: 0.02 }
          },
          {
            name: "Tráfico alto (ρ=0.8)",
            description: "Sistema con alta demanda",
            params: { arrivalRate: 8, serviceRate: 5, numServers: 2, maxTime: 5, speed: 0.02 }
          }
        ];
      case 'mmc':
        return [
          {
            name: "Sistema de tres servidores",
            description: "Múltiples servidores con carga distribuida",
            params: { arrivalRate: 7.5, serviceRate: 3, numServers: 3, maxTime: 5, speed: 0.02 }
          },
          {
            name: "Sistema de cinco servidores",
            description: "Equipo mayor para alta demanda",
            params: { arrivalRate: 10, serviceRate: 2.5, numServers: 4, maxTime: 5, speed: 0.02 }
          }
        ];
      case 'mg1':
        return [
          {
            name: "Tiempo de servicio variable",
            description: "Servicio con distribución general",
            params: { arrivalRate: 2.5, serviceRate: 4, numServers: 1, maxTime: 5, speed: 0.02 }
          }
        ];
      case 'md1':
        return [
          {
            name: "Tiempo de servicio fijo",
            description: "Servicio determinístico",
            params: { arrivalRate: 2.5, serviceRate: 4, numServers: 1, maxTime: 5, speed: 0.02 }
          }
        ];
      default:
        return [
          {
            name: "Escenario estándar",
            description: "Demostración básica",
            params: { arrivalRate: 2.5, serviceRate: 4, numServers: 1, maxTime: 5, speed: 0.02 }
          }
        ];
    }
  };

  const demoScenarios = getModelDemoScenarios();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  const [simulationParams, setSimulationParams] = useState<SimulationParams>(demoScenarios[0].params);

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [queue, setQueue] = useState<Customer[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [stats, setStats] = useState<SimulationStats>({
    avgWaitTime: 0,
    avgQueueLength: 0,
    serverUtilization: [],
    totalCustomers: 0,
    customersServed: 0,
    customersInQueue: 0,
    queueSamples: [{ time: 0, length: 0 }]
  });

  const [animationState, setAnimationState] = useState<{
    newCustomer: boolean;
    servingCustomer: boolean[];
    completedService: boolean;
  }>({
    newCustomer: false,
    servingCustomer: [],
    completedService: false
  });

  const [explanationPhase, setExplanationPhase] = useState(0);
  const [phaseMessages, setPhaseMessages] = useState<string[]>([]);
  const [explanationMessage, setExplanationMessage] = useState("");
  const [simulationPhase, setSimulationPhase] = useState<"initial" | "running" | "conclusion">("initial");

  const getModelName = () => {
    switch (modelId) {
      case 'mm1': return 'M/M/1';
      case 'mm2': return 'M/M/2';
      case 'mmc': return 'M/M/c';
      case 'mg1': return 'M/G/1';
      case 'md1': return 'M/D/1';
      default: return 'Modelo desconocido';
    }
  };

  useEffect(() => {
    let messages: string[] = [];
    const scenario = demoScenarios[currentScenarioIndex];
    const rho = (scenario.params.arrivalRate / (scenario.params.serviceRate * scenario.params.numServers));

    switch (modelId) {
      case 'mm1':
        messages = [
          `Iniciando simulación del modelo M/M/1 con λ=${scenario.params.arrivalRate} y μ=${scenario.params.serviceRate}`,
          "Los clientes llegarán siguiendo un proceso de Poisson (tiempo entre llegadas exponencial)",
          "El tiempo de servicio también sigue una distribución exponencial",
          `Con un solo servidor, el factor de utilización ρ=${rho.toFixed(2)}`,
          rho < 0.5 ? "El sistema tiene capacidad suficiente para atender la demanda sin generar colas largas" :
            rho < 0.8 ? "El sistema opera con una carga moderada, formándose pequeñas colas ocasionalmente" :
              "El sistema está cerca de la saturación, se formarán colas significativas",
          "Observa que cuando un cliente llega, va directamente al servidor si está libre",
          "Si el servidor está ocupado, los clientes forman una cola y esperan su turno",
          "El tiempo medio entre llegadas es " + (1 / scenario.params.arrivalRate).toFixed(2) + " unidades de tiempo",
          "El tiempo medio de servicio es " + (1 / scenario.params.serviceRate).toFixed(2) + " unidades de tiempo",
          "Observa la utilización del servidor conforme avanza la simulación",
          "La simulación concluirá en breve para analizar los resultados"
        ];
        break;
      case 'mm2':
        messages = [
          `Iniciando simulación del modelo M/M/2 con λ=${scenario.params.arrivalRate} y μ=${scenario.params.serviceRate} por servidor`,
          "Los clientes llegan por un proceso de Poisson y son atendidos por dos servidores en paralelo",
          `Con dos servidores idénticos, el factor de utilización por servidor es ρ=${rho.toFixed(2)}`,
          "Observa que los clientes son asignados al primer servidor disponible",
          "La eficiencia del sistema mejora significativamente respecto a M/M/1",
          "El tiempo medio entre llegadas es " + (1 / scenario.params.arrivalRate).toFixed(2) + " unidades de tiempo",
          "El tiempo medio de servicio por servidor es " + (1 / scenario.params.serviceRate).toFixed(2) + " unidades de tiempo",
          "Compara la utilización entre ambos servidores",
          "La ventaja de M/M/2 es que un servidor puede estar ocupado mientras el otro atiende nuevos clientes",
          "La simulación concluirá en breve mostrando el rendimiento del sistema"
        ];
        break;
      case 'mmc':
        messages = [
          `Iniciando simulación del modelo M/M/c con λ=${scenario.params.arrivalRate}, μ=${scenario.params.serviceRate} y c=${scenario.params.numServers}`,
          "Este modelo generaliza M/M/1 y M/M/2 para cualquier número de servidores en paralelo",
          `Con ${scenario.params.numServers} servidores, el factor de utilización por servidor es ρ=${rho.toFixed(2)}`,
          "Los clientes son atendidos por el primer servidor disponible",
          "Observa cómo se distribuye la carga entre múltiples servidores",
          "El tiempo medio entre llegadas es " + (1 / scenario.params.arrivalRate).toFixed(2) + " unidades de tiempo",
          "El tiempo medio de servicio por servidor es " + (1 / scenario.params.serviceRate).toFixed(2) + " unidades de tiempo",
          "En sistemas reales, este modelo aplica a centros de llamadas, ventanillas de atención, etc.",
          "La probabilidad de espera disminuye considerablemente con cada servidor adicional",
          "La simulación concluirá en breve para evaluar la eficiencia del sistema"
        ];
        break;
      case 'mg1':
        messages = [
          `Iniciando simulación del modelo M/G/1 con λ=${scenario.params.arrivalRate} y tiempos de servicio no exponenciales`,
          "En M/G/1, G indica que el tiempo de servicio sigue una distribución general (no necesariamente exponencial)",
          "En esta simulación, usamos una distribución más variable para el tiempo de servicio",
          `Con un solo servidor, el factor de utilización es ρ=${rho.toFixed(2)}`,
          "Los modelos M/G/1 son más realistas para muchos casos prácticos",
          "Observa la variabilidad en los tiempos de servicio",
          "El tiempo medio entre llegadas es " + (1 / scenario.params.arrivalRate).toFixed(2) + " unidades de tiempo",
          "El tiempo medio de servicio es aproximadamente " + (1 / scenario.params.serviceRate).toFixed(2) + " unidades de tiempo",
          "Esta distribución general puede representar servicios como reparaciones, consultas médicas, etc.",
          "La simulación concluirá pronto mostrando el impacto de la variabilidad del servicio"
        ];
        break;
      case 'md1':
        messages = [
          `Iniciando simulación del modelo M/D/1 con λ=${scenario.params.arrivalRate} y tiempo de servicio constante`,
          "En M/D/1, D indica que el tiempo de servicio es determinístico (constante)",
          "Cada cliente toma exactamente el mismo tiempo para ser atendido",
          `Con un solo servidor, el factor de utilización es ρ=${rho.toFixed(2)}`,
          "Los sistemas M/D/1 son típicos en procesos automatizados o muy regulares",
          "Observa cómo el tiempo de servicio es idéntico para todos los clientes",
          "El tiempo medio entre llegadas es " + (1 / scenario.params.arrivalRate).toFixed(2) + " unidades de tiempo",
          "El tiempo de servicio fijo es exactamente " + (1 / scenario.params.serviceRate).toFixed(2) + " unidades de tiempo",
          "La regularidad del servicio reduce la variabilidad en los tiempos de espera",
          "La simulación concluirá en breve para analizar el rendimiento del sistema"
        ];
        break;
      default:
        messages = [
          "Iniciando simulación del modelo de teoría de colas",
          "Observa el comportamiento del sistema conforme avanzan los clientes",
          "El sistema irá evolucionando conforme avanza el tiempo",
          "Presta atención a los tiempos de espera y longitud de la cola",
          "La simulación concluirá pronto para mostrar los resultados"
        ];
    }

    setPhaseMessages(messages);
    setExplanationPhase(0);
    setExplanationMessage(messages[0]);
  }, [modelId, currentScenarioIndex]);

  // Avanzar la fase de explicación cada cierto tiempo
  useEffect(() => {
    if (!isRunning || phaseMessages.length === 0) return;

    const interval = setInterval(() => {
      setExplanationPhase(prev => {
        const newPhase = Math.min(prev + 1, phaseMessages.length - 1);
        setExplanationMessage(phaseMessages[newPhase]);
        return newPhase;
      });
    }, 2500); // Mostrar un nuevo mensaje cada 2.5 segundos

    return () => clearInterval(interval);
  }, [isRunning, phaseMessages]);

  const changeScenario = (index: number) => {
    if (isRunning) {
      stopSimulation();
    }
    setCurrentScenarioIndex(index);
    setSimulationParams(demoScenarios[index].params);
    initSimulation();
    setSimulationPhase("initial");

    const scenario = demoScenarios[index];
    const rho = (scenario.params.arrivalRate / (scenario.params.serviceRate * scenario.params.numServers)).toFixed(2);
    setExplanationMessage(`Demostración: ${scenario.name}. ${scenario.description}. 
    En este escenario, λ=${scenario.params.arrivalRate} clientes/ut y μ=${scenario.params.serviceRate} clientes/ut.
    El factor de utilización ρ=${rho}.
    Presiona "Iniciar demostración" para comenzar.`);
  };

  // Inicializar la simulación
  const initSimulation = () => {
    setCurrentTime(0);
    setCustomers([]);
    setQueue([]);

    // Inicializar servidores
    const initialServers: Server[] = Array(simulationParams.numServers).fill(0).map((_, i) => ({
      id: i,
      busy: false,
      currentCustomer: null,
      totalServiceTime: 0,
      customersServed: 0
    }));
    setServers(initialServers);

    setStats({
      avgWaitTime: 0,
      avgQueueLength: 0,
      serverUtilization: Array(simulationParams.numServers).fill(0),
      totalCustomers: 0,
      customersServed: 0,
      customersInQueue: 0,
      queueSamples: [{ time: 0, length: 0 }]
    });

    // Reiniciar estado de animación
    setAnimationState({
      newCustomer: false,
      servingCustomer: Array(simulationParams.numServers).fill(false),
      completedService: false
    });

    // Reiniciar fase de explicación
    setExplanationPhase(0);
    if (phaseMessages.length > 0) {
      setExplanationMessage(phaseMessages[0]);
    }
  };

  // Generar un tiempo según distribución exponencial
  const generateExponentialTime = (rate: number) => {
    return -Math.log(Math.random()) / rate;
  };

  // Generar un tiempo según el modelo seleccionado
  const generateServiceTime = () => {
    switch (modelId) {
      case 'mm1':
      case 'mm2':
      case 'mmc':
        return generateExponentialTime(simulationParams.serviceRate);
      case 'md1':
        return 1 / simulationParams.serviceRate; // Determinístico
      case 'mg1':
        // Para simular mejor una distribución general, mezcla de distribuciones
        const mean = 1 / simulationParams.serviceRate;
        const randomFactor = Math.random();
        
        if (randomFactor < 0.3) {
          return mean * 0.5; // Servicios rápidos
        } else if (randomFactor < 0.8) {
          return mean * (0.8 + 0.4 * Math.random()); // Servicios promedio
        } else {
          return mean * 1.8; // Servicios lentos
        }
      default:
        return generateExponentialTime(simulationParams.serviceRate);
    }
  };

  // Iniciar la simulación
  const startSimulation = () => {
    initSimulation();
    setIsRunning(true);
    setSimulationPhase("running");
  };

  // Detener la simulación
  const stopSimulation = () => {
    setIsRunning(false);
    if (currentTime > 5) { 
      setSimulationPhase("conclusion");
      const utilizationPercent = (simulationParams.arrivalRate / (simulationParams.serviceRate * simulationParams.numServers) * 100).toFixed(1);
      setExplanationMessage(`Conclusión: Con un factor de utilización del ${utilizationPercent}%, 
      el tiempo promedio de espera fue de ${stats.avgWaitTime.toFixed(2)} ut y 
      la longitud promedio de la cola fue de ${stats.avgQueueLength.toFixed(2)} clientes.
      ${getModelConclusion()}`);
    }
  };

  const getModelConclusion = () => {
    const rho = simulationParams.arrivalRate / (simulationParams.serviceRate * simulationParams.numServers);

    switch (modelId) {
      case 'mm1':
        return rho < 0.5
          ? "En este modelo M/M/1 con tráfico bajo, el servidor tiene capacidad suficiente y los tiempos de espera son mínimos."
          : rho < 0.8
            ? "Este modelo M/M/1 con tráfico medio muestra equilibrio entre eficiencia y tiempos de espera."
            : "El modelo M/M/1 con tráfico alto demuestra cómo un solo servidor se satura rápidamente.";
      case 'mm2':
        return rho < 0.5
          ? "El modelo M/M/2 distribuye eficientemente la carga entre dos servidores, reduciendo esperas."
          : "Con tráfico alto, el modelo M/M/2 demuestra mejor rendimiento que M/M/1 gracias al servidor adicional.";
      case 'mmc':
        return `El modelo M/M/${simulationParams.numServers} muestra cómo múltiples servidores manejan mayor volumen de clientes con esperas reducidas.`;
      case 'mg1':
        return "La variabilidad en los tiempos de servicio del modelo M/G/1 genera mayor irregularidad en los tiempos de espera.";
      case 'md1':
        return "El modelo M/D/1 con tiempo de servicio constante genera menor variabilidad y mejor predicción de esperas.";
      default:
        return "La simulación ha concluido mostrando el comportamiento característico de este modelo.";
    }
  };

  const runSimulationStep = () => {
    if (currentTime >= simulationParams.maxTime) {
      stopSimulation();
      return;
    }

    // tiempo más lento para mejor visualización
    const timeStep = 0.05 * simulationParams.speed;
    const nextTime = currentTime + timeStep;
    setCurrentTime(nextTime);

    // Generar llegadas clientes según proceso de Poisson
    const arrivalProbability = simulationParams.arrivalRate * timeStep;

    if (Math.random() < arrivalProbability) {
      const newCustomer: Customer = {
        id: customers.length + 1,
        arrivalTime: nextTime,
        serviceTime: generateServiceTime(),
        startServiceTime: null,
        endServiceTime: null
      };

      // Activar animación de nuevo cliente
      setAnimationState(prev => ({ ...prev, newCustomer: true }));
      setTimeout(() => {
        setAnimationState(prev => ({ ...prev, newCustomer: false }));
      }, 300);

      // Añadir a la cola o asignar a un servidor disponible
      let assigned = false;

      const updatedServers = [...servers];
      for (let i = 0; i < updatedServers.length; i++) {
        if (!updatedServers[i].busy) {
          updatedServers[i].busy = true;
          updatedServers[i].currentCustomer = newCustomer;
          newCustomer.startServiceTime = nextTime;

          // Activar animación de servicio para este servidor
          const newServingCustomer = [...animationState.servingCustomer];
          newServingCustomer[i] = true;
          setAnimationState(prev => ({ ...prev, servingCustomer: newServingCustomer }));

          setTimeout(() => {
            const resetServing = [...animationState.servingCustomer];
            resetServing[i] = false;
            setAnimationState(prev => ({ ...prev, servingCustomer: resetServing }));
          }, 400);

          assigned = true;
          break;
        }
      }

      if (!assigned) {
        setQueue(prev => [...prev, newCustomer]);
      }

      // Agregamos solo clientes nuevos
      setCustomers(prev => [...prev, newCustomer]);
      setServers(updatedServers);
    }

    // Actualizar estado de servidores
    const updatedServers = [...servers];
    let finishedCustomers: Customer[] = [];

    for (let i = 0; i < updatedServers.length; i++) {
      const server = updatedServers[i];
      if (server.busy && server.currentCustomer) {
        const serviceElapsed = nextTime - (server.currentCustomer.startServiceTime || 0);

        if (serviceElapsed >= server.currentCustomer.serviceTime) {
          // Servicio completado
          const finishedCustomer = { ...server.currentCustomer };
          finishedCustomer.endServiceTime = nextTime;
          finishedCustomers.push(finishedCustomer);

          // Activar animación de servicio completado
          setAnimationState(prev => ({ ...prev, completedService: true }));
          setTimeout(() => {
            setAnimationState(prev => ({ ...prev, completedService: false }));
          }, 300);

          server.customersServed++;
          server.totalServiceTime += finishedCustomer.serviceTime;

          // Actualizar el cliente en la lista de clientes
          setCustomers(prev => prev.map(c =>
            c.id === finishedCustomer.id ? finishedCustomer : c
          ));

          // Tomar el siguiente cliente de la cola
          if (queue.length > 0) {
            const nextCustomer = queue[0];
            nextCustomer.startServiceTime = nextTime;
            server.currentCustomer = nextCustomer;

            setQueue(prev => prev.slice(1));

            // Animación de nuevo cliente en servicio
            const newServingCustomer = [...animationState.servingCustomer];
            newServingCustomer[i] = true;
            setAnimationState(prev => ({ ...prev, servingCustomer: newServingCustomer }));

            setTimeout(() => {
              const resetServing = [...animationState.servingCustomer];
              resetServing[i] = false;
              setAnimationState(prev => ({ ...prev, servingCustomer: resetServing }));
            }, 400);
          } else {
            server.busy = false;
            server.currentCustomer = null;
          }
        }
      }
    }

    setServers(updatedServers);

    const totalCustomers = customers.length;

    const servedCustomers = customers.filter(c => c.endServiceTime !== null);

    const customersWithService = customers.filter(c => c.startServiceTime !== null);
    const waitTimes = customersWithService.map(c =>
      ((c.startServiceTime || 0) - c.arrivalTime) || 0
    );

    const avgWaitTime = waitTimes.length > 0
      ? waitTimes.reduce((sum, time) => sum + time, 0) / waitTimes.length
      : 0;

    const serverUtilization = servers.map(server => {
  
      let totalBusyTime = server.totalServiceTime;
      if (server.busy && server.currentCustomer && server.currentCustomer.startServiceTime) {
        totalBusyTime += (nextTime - server.currentCustomer.startServiceTime);
      }
      
      return totalBusyTime / (nextTime > 0.001 ? nextTime : 0.001);
    });

    // 5. Longitud promedio de cola - usando Little's Law para más precisión
    // Registramos el estado de la cola en cada punto de tiempo
    const queueSamples = stats.queueSamples || [];
    queueSamples.push({ time: nextTime, length: queue.length });

    if (queueSamples.length > 100) {
      queueSamples.shift();
    }

   
    let totalQueueTimeProduct = 0;
    let totalTimeInterval = 0;

    for (let i = 1; i < queueSamples.length; i++) {
      const timeInterval = queueSamples[i].time - queueSamples[i - 1].time;
      totalQueueTimeProduct += queueSamples[i - 1].length * timeInterval;
      totalTimeInterval += timeInterval;
    }

    const avgQueueLength = totalTimeInterval > 0
      ? totalQueueTimeProduct / totalTimeInterval
      : queue.length;

    const newStats = {
      avgWaitTime,
      avgQueueLength,
      serverUtilization,
      totalCustomers,
      customersServed: servedCustomers.length,
      customersInQueue: queue.length,
      queueSamples
    };

    setStats(newStats);
  };

  
  useEffect(() => {
    const initialServers: Server[] = Array(simulationParams.numServers).fill(0).map((_, i) => ({
      id: i,
      busy: false,
      currentCustomer: null,
      totalServiceTime: 0,
      customersServed: 0
    }));
    setServers(initialServers);

    setStats(prev => ({
      ...prev,
      serverUtilization: Array(simulationParams.numServers).fill(0)
    }));

    
    setAnimationState({
      newCustomer: false,
      servingCustomer: Array(simulationParams.numServers).fill(false),
      completedService: false
    });
  }, [simulationParams.numServers]);


  useEffect(() => {
    let animationId: number;

    if (isRunning) {
      const animate = () => {
        runSimulationStep();
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRunning, currentTime, customers, queue, servers]);

  
  useEffect(() => {
    changeScenario(0);
  }, [modelId]);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

   
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth - 4; 
      canvas.height = 600;
    }

    
    const colors = {
      background: '#0f172a',        
      grid: '#1e293b',              
      queue: {
        bg: 'rgba(51, 65, 85, 0.8)', 
        border: '#64748b'           
      },
      server: {
        idle: {
          bg: '#334155',            
          border: '#64748b'          
        },
        busy: {
          bg: '#7e22ce',             
          border: '#a855f7'          
        }
      },
      customer: {
        normal: '#f97316',           
        highlight: '#fb923c',        
        new: '#fbbf24',              
        completed: '#22c55e'         
      },
      text: {
        title: '#f8fafc',            
        subtitle: '#cbd5e1',         
        label: '#94a3b8',           
        data: '#cbd5e1'              
      },
      animation: {
        arrival: '#fbbf24',         
        service: '#8b5cf6',         
        completion: '#22c55e'       
      }
    };

    
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;

    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    
    const padding = 40;
    const queueWidth = 200;
    const queueHeight = 300;
    const queueX = padding;
    const queueY = padding;

    const serverWidth = 80;
    const serverHeight = 80;
    const serverSpacing = 40;
    const serverY = queueY + queueHeight / 2 - serverHeight / 2;

    
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillStyle = colors.text.title;
    ctx.textAlign = 'center';
    ctx.fillText(`Simulación Modelo ${getModelName()}`, canvas.width / 2, 25);

    
    ctx.fillStyle = colors.queue.bg;
    ctx.strokeStyle = colors.queue.border;
    ctx.lineWidth = 2;
    ctx.fillRect(queueX, queueY, queueWidth, queueHeight);
    ctx.strokeRect(queueX, queueY, queueWidth, queueHeight);

    
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = colors.text.subtitle;
    ctx.textAlign = 'center';
    ctx.fillText(`Cola de espera (${queue.length})`, queueX + queueWidth / 2, queueY - 10);

    
    const clientSize = 30;
    const clientsPerRow = Math.floor(queueWidth / (clientSize + 10));

    queue.forEach((client, index) => {
      const row = Math.floor(index / clientsPerRow);
      const col = index % clientsPerRow;

      const x = queueX + 15 + col * (clientSize + 10);
      const y = queueY + 15 + row * (clientSize + 10);

      ctx.fillStyle = colors.customer.normal;
      ctx.beginPath();
      ctx.arc(x, y, clientSize / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = colors.text.title;
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${client.id}`, x, y + 4);
    });

    
    const totalServersWidth = servers.length * serverWidth + (servers.length - 1) * serverSpacing;
    const serversStartX = queueX + queueWidth + 100;

    servers.forEach((server, index) => {
      const x = serversStartX + index * (serverWidth + serverSpacing);

      
      ctx.fillStyle = server.busy ? colors.server.busy.bg : colors.server.idle.bg;
      ctx.strokeStyle = server.busy ? colors.server.busy.border : colors.server.idle.border;
      ctx.lineWidth = 2;

      
      if (animationState.servingCustomer[index]) {
        ctx.fillStyle = colors.animation.service;
        ctx.strokeStyle = colors.text.title;
        ctx.lineWidth = 3;
      }

      ctx.fillRect(x, serverY, serverWidth, serverHeight);
      ctx.strokeRect(x, serverY, serverWidth, serverHeight);

      
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = colors.text.subtitle;
      ctx.textAlign = 'center';
      ctx.fillText(`Servidor ${index + 1}`, x + serverWidth / 2, serverY - 10);

      
      const utilization = stats.serverUtilization[index] || 0;
      ctx.fillStyle = colors.text.label;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Util: ${(utilization * 100).toFixed(1)}%`, x + serverWidth / 2, serverY + serverHeight + 20);

      
      if (server.currentCustomer) {
        const customerX = x + serverWidth / 2;
        const customerY = serverY + serverHeight / 2;

        ctx.fillStyle = colors.customer.normal;
        ctx.beginPath();
        ctx.arc(customerX, customerY, clientSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = colors.text.title;
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${server.currentCustomer.id}`, customerX, customerY + 4);
      }
    });

    
    const arrowStartX = queueX + queueWidth;
    const arrowStartY = queueY + queueHeight / 2;
    const arrowEndX = serversStartX;
    const arrowEndY = serverY + serverHeight / 2;

    ctx.strokeStyle = colors.text.subtitle;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.lineTo(arrowEndX - 10, arrowEndY);
    ctx.lineTo(arrowEndX - 10, arrowEndY - 5);
    ctx.lineTo(arrowEndX, arrowEndY);
    ctx.lineTo(arrowEndX - 10, arrowEndY + 5);
    ctx.lineTo(arrowEndX - 10, arrowEndY);
    ctx.stroke();

    
    if (animationState.newCustomer) {
      const x = queueX - 40;
      const y = queueY + queueHeight / 2;

      ctx.fillStyle = colors.customer.new;
      ctx.beginPath();
      ctx.arc(x, y, clientSize / 2, 0, Math.PI * 2);
      ctx.fill();

      
      ctx.strokeStyle = colors.animation.arrival;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 40, y);
      ctx.lineTo(x + 15, y);
      ctx.lineTo(x + 15, y - 5);
      ctx.lineTo(x + 25, y);
      ctx.lineTo(x + 15, y + 5);
      ctx.lineTo(x + 15, y);
      ctx.stroke();
    }

    
    if (animationState.completedService) {
      const x = serversStartX + totalServersWidth + 50;
      const y = serverY + serverHeight / 2;

      ctx.fillStyle = colors.customer.completed;
      ctx.beginPath();
      ctx.arc(x, y, clientSize / 2, 0, Math.PI * 2);
      ctx.fill();

      
      ctx.strokeStyle = colors.animation.completion;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(serversStartX + totalServersWidth + 10, y);
      ctx.lineTo(x + 15, y);
      ctx.lineTo(x + 15, y - 5);
      ctx.lineTo(x + 25, y);
      ctx.lineTo(x + 15, y + 5);
      ctx.lineTo(x + 15, y);
      ctx.stroke();
    }

    
    const statsX = queueX;
    const statsY = queueY + queueHeight + 40;
    const statsWidth = canvas.width - 2 * padding;
    const statsHeight = 100;

    ctx.fillStyle = colors.queue.bg;
    ctx.strokeStyle = colors.queue.border;
    ctx.lineWidth = 2;
    ctx.fillRect(statsX, statsY, statsWidth, statsHeight);
    ctx.strokeRect(statsX, statsY, statsWidth, statsHeight);

    // Título de estadísticas
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = colors.text.title;
    ctx.textAlign = 'center';
    ctx.fillText('Estadísticas de la simulación', statsX + statsWidth / 2, statsY + 25);

    // Datos de estadísticas
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = colors.text.data;
    ctx.textAlign = 'left';

    
    const col1X = statsX + 20;
    const col2X = statsX + statsWidth / 2 + 20;
    const row1Y = statsY + 50;
    const row2Y = statsY + 75;

   
    ctx.fillText(`Tiempo: ${currentTime.toFixed(2)} ut`, col1X, row1Y);
    ctx.fillText(`Clientes totales: ${stats.totalCustomers}`, col1X, row2Y);

    ctx.fillText(`Tiempo espera prom: ${stats.avgWaitTime.toFixed(2)} ut`, col2X, row1Y);
    ctx.fillText(`Long. cola prom: ${stats.avgQueueLength.toFixed(2)}`, col2X, row2Y);

    
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = colors.text.subtitle;
    ctx.textAlign = 'center';

    
    const maxLineLength = 80;
    const words = explanationMessage.split(' ');
    let lines = [''];
    let lineIndex = 0;

    words.forEach(word => {
      if ((lines[lineIndex] + ' ' + word).length <= maxLineLength) {
        lines[lineIndex] += (lines[lineIndex].length > 0 ? ' ' : '') + word;
      } else {
        lineIndex++;
        lines[lineIndex] = word;
      }
    });

    const messageY = statsY + statsHeight + 30;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, messageY + index * 22);
    });

  }, [currentTime, customers, queue, servers, stats, animationState, explanationMessage]);

  
  const modelInfo = {
    mm1: { name: 'M/M/1', description: 'Sistema de 1 servidor con llegadas y servicios exponenciales' },
    mm2: { name: 'M/M/2', description: 'Sistema de 2 servidores con llegadas y servicios exponenciales' },
    mmc: { name: 'M/M/c', description: 'Sistema de múltiples servidores con llegadas y servicios exponenciales' },
    mg1: { name: 'M/G/1', description: 'Sistema de 1 servidor con llegadas exponenciales y servicios con distribución general' },
    md1: { name: 'M/D/1', description: 'Sistema de 1 servidor con llegadas exponenciales y servicios determinísticos' }
  };

  const currentModel = modelInfo[modelId as keyof typeof modelInfo] || { name: 'Desconocido', description: 'Modelo no reconocido' };

  
  const formatUtilization = () => {
    const rho = (simulationParams.arrivalRate / (simulationParams.serviceRate * simulationParams.numServers));
    return `${(rho * 100).toFixed(1)}%`;
  };

  return (

    <div className="flex flex-col min-h-screen bg-gray-950">
   
    <Navbar />

    
    <div className="flex flex-1 pt-16"> 
      
      <Sidebar />
      <div className="mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Simulador de Modelo {currentModel.name}</h1>
          <p className="text-gray-300 mb-4">{currentModel.description}</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/simulator/mm1" className={`py-2 px-4 rounded-lg transition-colors duration-200 ${modelId === 'mm1' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-blue-300'}`}>
              Modelo M/M/1
            </Link>
            <Link href="/simulator/mm2" className={`py-2 px-4 rounded-lg transition-colors duration-200 ${modelId === 'mm2' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-blue-300'}`}>
              Modelo M/M/2
            </Link>
            <Link href="/simulator/mmc" className={`py-2 px-4 rounded-lg transition-colors duration-200 ${modelId === 'mmc' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-blue-300'}`}>
              Modelo M/M/c
            </Link>
            <Link href="/simulator/mg1" className={`py-2 px-4 rounded-lg transition-colors duration-200 ${modelId === 'mg1' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-blue-300'}`}>
              Modelo M/G/1
            </Link>
            <Link href="/simulator/md1" className={`py-2 px-4 rounded-lg transition-colors duration-200 ${modelId === 'md1' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-blue-300'}`}>
              Modelo M/D/1
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Visualización de la simulación</h2>

              <div className="border-2 border-gray-700 rounded-lg mb-8">
                <canvas ref={canvasRef} className="w-full" style={{ height: '500px' }}></canvas>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                {!isRunning ? (
                  <button
                    className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={startSimulation}
                  >
                    Iniciar demostración
                  </button>
                ) : (
                  <button
                    className="py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    onClick={stopSimulation}
                  >
                    Detener simulación
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-900 shadow-lg rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Parámetros del modelo</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 mb-1">Tasa de llegadas (λ):</p>
                  <p className="font-semibold text-blue-300">{simulationParams.arrivalRate} clientes/ut</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-1">Tasa de servicio (μ):</p>
                  <p className="font-semibold text-blue-300">{simulationParams.serviceRate} clientes/ut</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-1">Número de servidores:</p>
                  <p className="font-semibold text-blue-300">{simulationParams.numServers}</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-1">Factor de utilización (ρ):</p>
                  <p className="font-semibold text-blue-300">{formatUtilization()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Demostraciones disponibles</h2>

              <div className="space-y-3">
                {demoScenarios.map((scenario, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors duration-200 hover:bg-gray-800 ${currentScenarioIndex === index ? 'border-blue-500' : 'border-gray-700'}`}
                    onClick={() => !isRunning && changeScenario(index)}
                  >
                    <h3 className="font-semibold text-blue-300">{scenario.name}</h3>
                    <p className="text-gray-300 text-sm">{scenario.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      λ={scenario.params.arrivalRate}, μ={scenario.params.serviceRate},
                      ρ={(scenario.params.arrivalRate / (scenario.params.serviceRate * scenario.params.numServers)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
}